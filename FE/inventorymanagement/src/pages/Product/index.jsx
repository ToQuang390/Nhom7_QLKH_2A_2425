import React, { useEffect, useRef, useState } from "react";
import Modal from 'react-bootstrap/Modal';
import { Link, Navigate, useNavigate } from "react-router-dom";
import { Form, Button, Table, Pagination, Toast, CardBody, Card, Col, Row } from "react-bootstrap";
import "../../assets/css/product.css"; // CSS tùy chỉnh nếu có
import { deleteCategory, getListCategory, updateCategory } from "../../service/categoryService";
import { deleteProduct, getListPageProduct, getListProduct, updateProduct } from "../../service/productService";
import { getListUnit } from "../../service/unitService";
import { showConfirm, showError, showSuccess } from "../../utils/alert";

function Product() {
  const navigate = useNavigate();
  const [product, setProduct] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [selectedcategory, setSelectedcategory] = useState({});
  const [isEditMode, setIsEditMode] = useState(null);

  const [search, setSearch] = useState("");
  const searchInputRef = useRef(null);
  const [page, setPage] = useState(1); // bắt đầu từ 1 vì backend đã sửa
  const [totalPages, setTotalPages] = useState(0);

  const [category, setCategory] = useState([]);
  const [unit, setUnit] = useState([]);

  const fetchApiUnit = async () => {
    const response = await getListUnit();
    setUnit(response);
  }
  useEffect(() => {
    fetchApiUnit();
  }, []);


  const fetchApiCategory = async () => {
    const response = await getListCategory();
    setCategory(response);
  }
  useEffect(() => {
    fetchApiCategory();
  }, []);

  const fetchApi = async (currentPage) => {
    const result = await getListPageProduct(currentPage, 10, search);
    setProduct(result.content);
    setPage(result.pageNumber); // backend đã trả về từ 1
    setTotalPages(result.totalPages);
  }

  useEffect(() => {
    fetchApi(page);
  }, [page, search]);
  //Update Product
  const handleSave = async () => {
    const payload = {
      id: selectedcategory.id,
      name: selectedcategory.name,
      description: selectedcategory.description,
      productCode: selectedcategory.productCode,
      categoryId: parseInt(selectedcategory.categoryId || selectedcategory.categoryReponse?.id),
      unitId: parseInt(selectedcategory.unitId || selectedcategory.unitReponse?.id)
    }

    const isCheck= await showConfirm("Bạn có chắc muốn cập nhật  ! ");
    if(isCheck.isConfirmed){
      try {
        const response = await updateProduct(payload); 
        if (response != null) {
          setShowModal(false);
          showSuccess("Chỉnh sửa thông tin thành công !")
          fetchApi(1);
        }
        else {
          showError("Chỉnh sửa thất bại !");
        }
      } catch (error) {
        console.error("Lỗi khi cập nhật:", error);
      }
    }
      return;
  };

  //xóa product
  const handleDel = async (item) => {
    const isConfirm=await  showConfirm("Bạn có chắc muốn xóa ? Dữ liệu sẽ không thể khôi phục được ! ");
    if( isConfirm.isConfirmed){
      try {
        const response = await deleteProduct(item.id);
        if (response) {
          showSuccess("Xóa thành công !");
          setProduct((prevProduct) =>
            prevProduct.filter((p) => p.id !== item.id)
          );
        } else {
          showError("Xóa thất bại!");
        }
      } catch (error) {
        showError("Có lỗi xảy ra !");
      }
    }
    return;
  };


  const hanldeSearch = async () => {
    const searchValue = searchInputRef.current.value;
    setSearch(searchValue); // cập nhật state search
    const result = await getListPageProduct(1, 10, searchValue); // luôn tìm từ trang 1
    setProduct(result.content);
    setPage(result.pageNumber);
    setTotalPages(result.totalPages);
  };


  //xem thông tin 
  const handleView = (item) => {
    setSelectedcategory(item);
    setIsEditMode(false);
    setShowModal(true);
  };

  //Chỉnh sửa
  const hanldeEdit = (item) => {
    setSelectedcategory(item);
    setIsEditMode(true);
    setShowModal(true);
  };

  // phân trang
  const
    handlePageChange = (newPage) => {
      setPage(newPage);
    };

  const createPaginationItems = () => {
    const items = [];

    // Hiển thị toàn bộ nếu ít trang
    if (totalPages <= 6) {
      for (let i = 1; i <= totalPages; i++) {
        items.push(
          <Pagination.Item key={i} active={i === page} onClick={() => handlePageChange(i)}>
            {i}
          </Pagination.Item>
        );
      }
      return items;
    }

    // Trang đầu tiên
    items.push(
      <Pagination.Item key={1} active={page === 1} onClick={() => handlePageChange(1)}>
        1
      </Pagination.Item>
    );

    // Dấu ...
    if (page > 3) items.push(<Pagination.Ellipsis key="ellipsis-start" disabled />);

    // Các trang gần trang hiện tại
    const pageNumbers = [page - 1, page, page + 1].filter(
      (p) => p > 1 && p < totalPages
    );

    pageNumbers.forEach((p) => {
      items.push(
        <Pagination.Item key={p} active={p === page} onClick={() => handlePageChange(p)}>
          {p}
        </Pagination.Item>
      );
    });

    // Dấu ...
    if (page < totalPages - 2) items.push(<Pagination.Ellipsis key="ellipsis-end" disabled />);

    // Trang cuối cùng
    items.push(
      <Pagination.Item
        key={totalPages}
        active={page === totalPages}
        onClick={() => handlePageChange(totalPages)}
      >
        {totalPages}
      </Pagination.Item>
    );

    return items;
  };

  return (
    <>
      <div className="category">
        <div className="container-fluid">
          <div className="row">
            <div className="col-12">
              <div className="page-title-box">
                <h5 className="page-title">Sản phẩm </h5>
              </div>
            </div>

          </div>



          <div className="row">
            <div className="col-12">
              <Card className=" shadow-sm bg-white rounded">
                <CardBody>
                  <div className="row mb-2">
                    <div className="col-xl-8">
                      <form className="row gy-2 gx-2 align-items-center justify-content-xl-start justify-content-between">
                        <div className="col-auto">
                          <label htmlFor="inputPassword2" className="visually-hidden">Search</label>
                          <input type="search" className="form-control" id="inputPassword2" ref={searchInputRef} placeholder="Tìm kiếm mã hoặc tên ..." />
                        </div>
                        <div className="col-auto">
                          <div className="d-flex align-items-center">
                            <Button onClick={hanldeSearch}> <i class="bi bi-search"></i>Tìm kiếm</Button>
                          </div>
                        </div>
                      </form>
                    </div>
                    <div className="col-xl-4">
                      <div className="text-xl-end mt-xl-0 mt-2">
                        <Link to="/products/add" className="btn btn-danger mb-2 me-2"><i className="mdi mdi-basket me-1"></i> Thêm </Link>
                      </div>
                    </div>
                  </div>
                  <Table >
                    <thead>
                      <tr>
                        <th>STT</th>
                        <th>Code </th>
                        <th>Tên  </th>
                        <th>ĐVT  </th>
                        <th>Mô tả</th>
                        <th>Ngày tạo</th>
                        <th>Ngày cập nhật</th>
                        <th>Loại danh mục</th>
                        <th>Hành động</th>
                      </tr>

                    </thead>

                    <tbody>
                      {product && product.map((item, index) => (
                        <tr key={item.id}>
                          <td>{index + 1}</td>
                          <td>{item.productCode || ""}</td>
                          <td>{item.name || ""}</td>
                          <td>{item.unitReponse?.name ?? ""}</td>
                          <td>{item.description || ""}</td>
                          <td>{item.createdAt || ""}</td>
                          <td>{item.updateAt || ""}</td>
                          <td>{item.categoryReponse?.name ?? ""}</td>
                          <td>
                            <button className="btn btn-link p-0 me-2">
                              <i className="bi bi-eye-fill text-primary" onClick={() => handleView(item)}></i>
                            </button>
                            <button className="btn btn-link p-0 me-2">
                              <i className="bi bi-pencil-square text-warning" onClick={() => hanldeEdit(item)}></i>
                            </button>
                            <button className="btn btn-link p-0">
                              <i className="bi bi-trash text-danger" onClick={() => handleDel(item)}></i>
                            </button>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </Table>
                </CardBody>
              </Card>
              <Pagination className="justify-content-end mt-2">
                <Pagination.Prev
                  onClick={() => handlePageChange(page - 1)}
                  disabled={page === 1}
                />
                {createPaginationItems()}
                <Pagination.Next
                  onClick={() => handlePageChange(page + 1)}
                  disabled={page === totalPages}
                />
              </Pagination>
            </div>
          </div>
        </div>
      </div>


      {/* Modal hiển thị chi tiết */}
      <Modal show={showModal} onHide={() => setShowModal(false)} centered>
        <Modal.Header closeButton>
          <Modal.Title>{isEditMode ? "Sửa thông tin danh mục " : "Chi tiết danh mục"}</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <div className="form-group mb-2">
            <label>Mã code</label>
            {isEditMode ? (
              <input
                className="form-control"
                value={selectedcategory.productCode}
                onChange={(e) =>
                  setSelectedcategory({ ...selectedcategory, productCode: e.target.value })
                }
              />
            ) : (
              <div>{selectedcategory.productCode || "Trống"}</div>
            )}
          </div>

          <div className="form-group mb-2">
            <label>Tên</label>
            {isEditMode ? (
              <input
                className="form-control"
                value={selectedcategory.name}
                onChange={(e) =>
                  setSelectedcategory({ ...selectedcategory, name: e.target.value })
                }
              />
            ) : (
              <div>{selectedcategory.name || "Trống"}</div>
            )}
          </div>

          <div className="form-group mb-2">
            <label>Đơn vị tính</label>
            {isEditMode ? (
              <select
                className="form-select"
                value={selectedcategory.unitId || selectedcategory.unitReponse?.id || 0}
                onChange={(e) =>
                  setSelectedcategory({ ...selectedcategory, unitId: parseInt(e.target.value) })
                }
              >
                <option value={0}>Chọn loại đơn vị</option>
                {unit && unit.map((item) => (
                  <option key={item.id} value={item.id}>{item.name}</option>
                ))}
              </select>

            ) : (
              <div>{selectedcategory.unitReponse?.name ?? "Trống"}</div>
            )}
          </div>

          <div className="form-group mb-2">
            <label>Mô tả</label>
            {isEditMode ? (
              <textarea
                className="form-control"
                value={selectedcategory.description}
                onChange={(e) =>
                  setSelectedcategory({ ...selectedcategory, description: e.target.value })
                }
              />
            ) : (
              <div>{selectedcategory.description || "Trống"}</div>
            )}
          </div>

          <div className="form-group mb-2">
            <label>Ngày tạo</label>
            {isEditMode ? (
              <input
                className="form-control"
                value={selectedcategory.createdAt}
                readOnly
              />
            ) : (
              <div>{selectedcategory.createdAt || "Trống"}</div>
            )}
          </div>
          <div className="form-group mb-2">
            <label>Ngày cập nhật</label>
            {isEditMode ? (
              <input
                className="form-control"
                value={selectedcategory?.updateAt ?? "-"}
                readOnly
              />
            ) : (
              <div>{selectedcategory.updateAt || "Trống"}</div>
            )}
          </div>
          <div className="form-group mb-2">
            <label>Loại</label>
            {isEditMode ? (
              <select
                className="form-select"
                value={selectedcategory.categoryId || selectedcategory.categoryReponse?.id || 0}
                onChange={(e) =>
                  setSelectedcategory({ ...selectedcategory, categoryId: parseInt(e.target.value) })
                }
              >
                <option value={0}>Chọn loại danh mục</option>
                {category && category.map((item) => (
                  <option key={item.id} value={item.id}>{item.name}</option>
                ))}
              </select>

            ) : (
              <div>{selectedcategory.categoryReponse?.name ?? "Trống"}</div>
            )}
          </div>

        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={() => setShowModal(false)}>
            Đóng
          </Button>
          {isEditMode && (
            <Button variant="primary" onClick={handleSave}>
              Lưu
            </Button>
          )}
        </Modal.Footer>
      </Modal>
    </>
  );
}

export default Product;
