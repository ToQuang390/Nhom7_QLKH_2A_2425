import React, { useEffect, useRef, useState } from "react";
import Modal from 'react-bootstrap/Modal';
import { Link } from "react-router-dom";
import { Button, Table, Pagination, Toast, CardBody, Card } from "react-bootstrap";
import "../../assets/css/category.css"; // CSS tùy chỉnh nếu có
import { deleteCategory, getListCategory, updateCategory } from "../../service/categoryService";

function Category() {
  const [category, setcategory] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [selectedcategory, setSelectedcategory] = useState({});
  const [isEditMode, setIsEditMode] = useState(null);

  const [search, setSearch] = useState("");

  const [showToast, setShowToast] = useState(false);
  const [contentToast, setcontentToast] = useState("");

  //Tìm kiếm
  const searchInputRef = useRef(null);

  //Get List User
  const fetchApi = async () => {
    const response = await getListCategory();
    setcategory(response.reverse());
  }
  useEffect(() => {
    fetchApi();
  }, []);

  //Update categorycategory
  const handleSave = async () => {
    const payload = {
      id: selectedcategory.id,
      name: selectedcategory.name,
      description: selectedcategory.description
    }
    try {
      const response = await updateCategory(payload); // gọi API backend cập nhật
      if (response != null) {
        setShowModal(false);
        setShowToast(true)
        setcontentToast("Sửa thành công !")
        fetchApi(); // load lại dữ liệu
      }
      else {
        setcontentToast("Sửa thất bại !")
      }

    } catch (error) {
      console.error("Lỗi khi cập nhật:", error);
    }

  };

  //xóa danh mục
  const handleDel = async (item) => {
    try {
      const response = await deleteCategory((item.id));
      if (response) {
        setcategory((prevcategory) => prevcategory.filter((category) => category.id !== parseInt(category.id)));
        setShowToast(true)
        setcontentToast("Xóa thành công !")
      } else {
        setShowToast(true)
        setcontentToast("Xóa thất bại !")
      }
    } catch (error) {
    }
  }
  const hanldeSearch = () => {
    const searchValue = searchInputRef.current.value.toLowerCase();
    const filtered = category.filter((item) =>
      item.name.toLowerCase().includes(searchValue)
    );
    setcategory(filtered);

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



  return (
    <>
      <div className="category">
        <div className="container-fluid">
          <div className="row">
            <div className="col-12">
              <div className="page-title-box">
                <h5 className="page-title">Danh mục </h5>
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
                          <input type="search" className="form-control" id="inputPassword2" ref={searchInputRef} placeholder="Search..." />
                        </div>
                        <div className="col-auto">
                          <div className="d-flex align-items-center">
                            <Button onClick={hanldeSearch}> <i class="bi bi-search"></i>Tìm kiếm</Button>
                            <Button variant="secondary" onClick={fetchApi} className="ms-2">
                            <i class="bi bi-arrow-clockwise"></i> Làm mới
                            </Button>
                          </div>
                        </div>
                      </form>
                    </div>
                    <div className="col-xl-4">
                      <div className="text-xl-end mt-xl-0 mt-2">
                        <Link to="/categorys/add" className="btn btn-danger mb-2 me-2"><i className="mdi mdi-basket me-1"></i> Thêm </Link>
                      </div>
                    </div>
                  </div>
                  <Table >
                    <thead>
                      <tr>
                        <th>STT</th>
                        <th>Tên danh mục </th>
                        <th>Mô tả</th>
                        <th>Ngày tạo</th>
                        <th>Hành động</th>

                      </tr>
                    </thead>
                    <tbody>
                      {category && category.map((item, index) => (
                        <tr key={item.id}>
                          <td>{index + 1}</td>
                          <td>{item.name || ""}</td>
                          <td>{item.description || ""}</td>
                          <td>{item.createdAt || ""}</td>
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


      <Toast
        onClose={() => setShowToast(false)}
        show={showToast}
        autohide
        style={{
          position: "fixed",
          top: 20,
          right: 20,
          zIndex: 9999
        }}
      >
        <Toast.Header className="bg-success text-white">
          <strong className="me-auto">Thông báo</strong>
        </Toast.Header>
        <Toast.Body>{contentToast}</Toast.Body>
      </Toast>
    </>

  );
}

export default Category;
