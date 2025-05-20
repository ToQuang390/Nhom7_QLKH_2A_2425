import React, { useEffect, useRef, useState } from "react";
import { Table, Button, Image, Card, Toast, Modal, CardBody, Pagination, Row, Col } from "react-bootstrap";
import { FaEdit, FaTrash } from "react-icons/fa";
import { Link } from "react-router-dom";
import numeral from 'numeral';
import "../../assets/css/import.css";
import { deleteImport, getListImport } from "../../service/importService";
import { showDelete, showError, showSuccess } from "../../utils/alert";
import { getListExport, getListPageExport } from "../../service/exportService";

function TransactionExportInventory() {
  const [listimport, setlistimport] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [selectedlistimport, setSelectedlistimport] = useState({});
  const [isEditMode, setIsEditMode] = useState(null);

  const [search, setSearch] = useState("");

  const [showToast, setShowToast] = useState(false);
  const [contentToast, setcontentToast] = useState("");

  const [status, setStatus] = useState("0");
  const [originallistimport, setOriginallistimport] = useState([]);

  const [page, setPage] = useState(1); // bắt đầu từ 1 vì backend đã sửa
  const [totalPages, setTotalPages] = useState(0);

  const searchInputRef = useRef(null);
  const searchFromRef = useRef(null);
  const searchToRef = useRef(null);

  const fetchApi = async (currentPage, searchValue = "", fromDate = "1970-01-01", toDate = null) => {
    const to = toDate ?? new Date().toISOString().split("T")[0];
    const result = await getListPageExport(currentPage, 10, searchValue, fromDate, to);
    setlistimport(result.content);
    setPage(result.pageNumber);
    setTotalPages(result.totalPages);
  };
  useEffect(() => {
    const today = new Date().toISOString().split("T")[0];
    fetchApi(page, "", "1970-01-01", today);
  }, [page]);


  //Update User
  const handleSave = async () => {
    const payload = {
      id: selectedlistimport.id,
      name: selectedlistimport.name,
      email: selectedlistimport.email,
      phone: selectedlistimport.phone,
      address: selectedlistimport.address
    };
    try {

      setShowModal(false);
      fetchApi(page);
    } catch (error) {
      console.error("Lỗi khi cập nhật:", error);
    }

  };

  //xóa  
  const handleDel = async (item) => {
    const confirmed = await showDelete();
    if (!confirmed) return;

    try {
      const response = await deleteImport((item.id));
      if (response) {
        setlistimport((prevlistimport) => prevlistimport.filter((imp) => imp.id !== parseInt(item.id)));
        await showSuccess("Dữ liệu đã được xóa !")
      } else {
        await showError("Thất bại");

      }
    } catch (error) {
    }
  }
  const hanldeSearch = async () => {
    const searchValue = searchInputRef.current.value.trim();
    const fromDate = searchFromRef.current.value || "1970-01-01";
    const toDate = searchToRef.current.value || new Date().toISOString().split("T")[0];
    const result = await getListPageExport(1, 10, searchValue, fromDate, toDate);
    setlistimport(result.content);
    setPage(result.pageNumber);
    setTotalPages(result.totalPages);
  };

  //xem thông tin 
  const handleView = (item) => {
    setSelectedlistimport(item);
    setIsEditMode(false);
    setShowModal(true);
  };

  //Chỉnh sửa
  const hanldeEdit = (item) => {
    console.log(item);
    setSelectedlistimport(item);
    setIsEditMode(true);
    setShowModal(true);
  };

  // phân trang
  const handlePageChange = (newPage) => {
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
      <div className="listimport">
        <div className="container-fluid">
          <div className="row">
            <div className="col-12">
              <div className="page-title-box">
                <h5 className="page-title">Giao dịch xuất kho </h5>
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
                         
                        </div>
                        <div className="col-auto">
                          <div className="d-flex align-items-center">
                            <label htmlFor="inputfromdate" >Từ</label>
                            <input type="date" className="form-control" id="inputfromdate" ref={searchFromRef} placeholder="--Chọn ngày bắt đầu" />
                            <label htmlFor="inputtodate" >Đến</label>
                            <input type="date" className="form-control" id="inputtodate" ref={searchToRef} placeholder="--Chọn ngày kết thúc" />

                            <input type="search" className="form-control" id="inputsearch" ref={searchInputRef} placeholder="Tìm theo mã ..." />
                          </div>
                          <Button onClick={hanldeSearch}> <i class="bi bi-search"></i>Tìm kiếm</Button>
                        </div>
                      </form>
                    </div>
                    <div className="col-xl-4">
                      <div className="text-xl-end mt-xl-0 mt-2">
                        <Link to="/inventory/exports/create" className="btn btn-success mb-2 me-2"><i className="mdi mdi-basket me-1"></i> Thêm </Link>
                      </div>
                    </div>
                  </div>
                  <Table >
                    <thead>
                      <tr>
                        <th>STT</th>
                        <th>Mã Phiếu</th>
                        <th>Khách hàng</th>
                        <th>Nhân viên</th>
                        <th>Thời gian</th>
                        <th>Mô tả</th>
                        <th>Tổng tiền</th>
                        <th>Action</th>
                      </tr>
                    </thead>
                    <tbody>

                      {listimport && listimport.map((item, index) => (
                        <tr key={item.id}>
                          <td>{index + 1}</td>
                          <td>{item.id}</td>
                          <td>{item.customer?.name || "N/A"}</td>
                          <td>{item.user?.username || "N/A"}</td>
                          <td>{item.createdAt}</td>
                          <td>{item.description}</td>
                          <td>{item.total ? numeral(item.total).format('0,0') : ""} </td>
                          <td>
                            <button className="btn btn-link p-0 me-2">
                              <i className="bi bi-eye-fill text-primary" onClick={() => handleView(item)}></i>
                            </button>
                            {/* <button className="btn btn-link p-0 me-2">
                              <i className="bi bi-pencil-square text-warning" onClick={() => hanldeEdit(item)}></i>
                            </button> */}
                            {/* <button className="btn btn-link p-0">
                              <i className="bi bi-trash text-danger" onClick={() => handleDel(item)}></i>
                            </button> */}
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



      <Modal show={showModal} onHide={() => setShowModal(false)} centered size="lg">
        <Modal.Header closeButton>
          <Modal.Title>{isEditMode ? "Sửa thông tin phiếu nhập" : "Thông tin phiếu xuất"}</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <div className="form-group mb-2">
            <Row>
              <Col md={4}>
                <label>Khách hàng:</label>
              </Col>
              <Col md={8}>
                {isEditMode ? (
                  <input
                    className="form-control"
                    value={selectedlistimport.customer?.name || ""}
                    onChange={(e) =>
                      setSelectedlistimport({
                        ...selectedlistimport,
                        supplierName: e.target.value,
                      })
                    }
                  />
                ) : (
                  <div>{selectedlistimport.customer?.name || "N/A"}</div>
                )}
              </Col>
            </Row>
          </div>
          <div className="form-group mb-2">
            <Row>
              <Col md={4}>
                <label>Người nhập:</label>
              </Col>
              <Col md={8}>
                {isEditMode ? (
                  <input
                    className="form-control"
                    value={selectedlistimport.user?.username || ""}
                    onChange={(e) =>
                      setSelectedlistimport({
                        ...selectedlistimport,
                        user: { ...selectedlistimport.user, username: e.target.value },
                      })
                    }
                  />
                ) : (
                  <div>{selectedlistimport.user?.username || "N/A"}</div>
                )}
              </Col>
            </Row>
          </div>
          <div className="form-group mb-2">
            <Row>
              <Col md={4}>
                <label>Ngày nhập:</label>
              </Col>
              <Col md={8}>
                {isEditMode ? (
                  <input
                    className="form-control"
                    value={selectedlistimport.createdAt || ""}
                    onChange={(e) =>
                      setSelectedlistimport({
                        ...selectedlistimport,
                        createdAt: e.target.value,
                      })
                    }
                  />
                ) : (
                  <div>{selectedlistimport.createdAt || "N/A"}</div>
                )}
              </Col>
            </Row>
          </div>
          <div className="form-group mb-2">
            <Row>
              <Col md={4}>
                <label>Ghi chú:</label>
              </Col>
              <Col md={8}>
                {isEditMode ? (
                  <input
                    className="form-control"
                    value={selectedlistimport.description || ""}
                    onChange={(e) =>
                      setSelectedlistimport({
                        ...selectedlistimport,
                        description: e.target.value,
                      })
                    }
                  />
                ) : (
                  <div>{selectedlistimport.description || "N/A"}</div>
                )}
              </Col>
            </Row>
          </div>

          {/* Bảng chi tiết sản phẩm nhập kho */}
          <div className="form-group mb-2">
            <Row>
              <Col md={12}>
                <div className="table-responsive">
                  <Table>
                    <thead>
                      <tr>
                        <th>STT</th>
                        <th>Mã hàng</th>
                        <th>Tên hàng</th>
                        <th>Đơn vị</th>
                        <th>Số lượng</th>
                        <th>Giá</th>
                        <th>Thành tiền</th>
                      </tr>
                    </thead>
                    <tbody>
                      {selectedlistimport.exportDetailList && selectedlistimport.exportDetailList.map((item, index) => (
                        <tr key={index}>
                          <td>{index + 1}</td>
                          <td>{item.product?.productCode || ""}</td>
                          <td>{item.product?.name || ""}</td>
                          <td>{item.product?.unitReponse.name || ""}</td>
                          <td>{item.quantity || ""}</td>
                          <td>{item.price ? numeral(item.price).format('0,0') : ""}</td>
                          <td>{item.quantity && item.price ? numeral(item.quantity * item.price).format('0,0') : ""}</td>
                        </tr>
                      ))}
                    </tbody>
                  </Table>
                </div>
              </Col>
            </Row>
          </div>
          <div className="form-group mb-2">
            <Row>
              <Col md={8}>
                <label>Tổng tiền: {selectedlistimport.total ? numeral(selectedlistimport.total).format('0,0') : ""} VNĐ</label>
              </Col>
            </Row>
          </div>
        </Modal.Body>

        <Modal.Footer>
          <Button variant="secondary" onClick={() => setShowModal(false)}>
            <i className="bi bi-file-earmark-arrow-up"></i> Xuất file PDF
          </Button>
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
export default TransactionExportInventory;