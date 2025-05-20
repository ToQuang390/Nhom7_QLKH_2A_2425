import React, { useEffect, useRef, useState } from "react";
import { Table, Button, Image, Card, Toast, Modal, CardBody, Pagination } from "react-bootstrap";
import { Link } from "react-router-dom";
import { deleteSupplier, getListPageSupplier, getListSupplier, updateSupplier } from "../../service/supplierSerivce";

function Suppelier() {
  const [customer, setcustomer] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [selectedcustomer, setSelectedcustomer] = useState({});
  const [isEditMode, setIsEditMode] = useState(null);

  const [search, setSearch] = useState("");
  const [page, setPage] = useState(1); // bắt đầu từ 1 vì backend đã sửa
  const [totalPages, setTotalPages] = useState(0);

  const [showToast, setShowToast] = useState(false);
  const [contentToast, setcontentToast] = useState("");


  const searchInputRef = useRef(null);
  //Get List Suppliers
  // const fetchApi = async () => {
  //   const response = await getListSupplier();
  //   setcustomer(response.reverse());
  // }
  // useEffect(() => {
  //   fetchApi();
  // }, []);

    //Get List User
    const fetchApi = async (currentPage) => {
      const result = await getListPageSupplier(currentPage,10,search);
      setcustomer(result.content);
      setPage(result.pageNumber); // backend đã trả về từ 1
      setTotalPages(result.totalPages);
    }
  
    useEffect(() => {
      fetchApi(page);
    }, [page,search]);
  
  //save Suppliers
  const handleSave = async () => {
    const payload = {
      id: selectedcustomer.id,
      supplierName: selectedcustomer.supplierName,
      email: selectedcustomer.email,
      phone: selectedcustomer.phone,
      address: selectedcustomer.address
    };

    try {
      await updateSupplier(payload); // gọi API backend cập nhật
      setShowModal(false);
      setShowToast(true)
      setcontentToast("Sửa thành công !")
      fetchApi(); // load lại dữ liệu
    } catch (error) {
      console.error("Lỗi khi cập nhật:", error);
    }

  };

  //xóa người dùng 
  const handleDel = async (item) => {
    try {
      const response = await deleteSupplier((item.id));
      if (response) {
        setcustomer((prevcustomer) => prevcustomer.filter((user) => user.id !== parseInt(item.id)));
        setShowToast(true)
        setcontentToast("Xóa thành công !")
      } else {
        setShowToast(true)
        setcontentToast("Xóa thất bại !")
      }
    } catch (error) {
    }
  }

  const hanldeSearch = async () => {
    const searchValue = searchInputRef.current.value;
    setSearch(searchValue); // cập nhật state search
    const result = await getListPageSupplier(1, 10, searchValue); // luôn tìm từ trang 1
    setcustomer(result.content);
    setPage(result.pageNumber);
    setTotalPages(result.totalPages);
   
  };

  //xem thông tin 
  const handleView = (item) => {
    setSelectedcustomer(item);
    setIsEditMode(false);
    setShowModal(true);
  };

  //Chỉnh sửa
  const hanldeEdit = (item) => {
    console.log(item);
    setSelectedcustomer(item);
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
      <div className="customer">
        <div className="container-fluid">
          <div className="row">
            <div className="col-12">
              <div className="page-title-box">
                <h5 className="page-title">Nhà cung cấp </h5>
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
                          <input type="search" className="form-control" id="inputPassword2" ref={searchInputRef} placeholder="Tìm kiếm theo tên hoặc số điện thoại..." />
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
                        <Link to="/supplier/add" className="btn btn-danger mb-2 me-2"><i className="mdi mdi-basket me-1"></i> Thêm </Link>
                      </div>
                    </div>
                  </div>
                  <Table >
                    <thead>
                      <tr>
                        <th>STT</th>
                        <th>Name</th>
                        <th>Phone</th>
                        <th>Email</th>
                        <th>Adress</th>
                        <th>Action</th>
                      </tr>
                    </thead>
                    <tbody>

                      {customer && customer.map((item, index) => (
                        <tr key={item.id}>
                          <td>{index + 1}</td>
                          <td>{item.supplierName || ""}</td>
                          <td>{item.phone || ""}</td>
                          <td>{item.email || ""}</td>
                          <td>{item.address || ""}</td>
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
          <Modal.Title>{isEditMode ? "Sửa thông tin khách hàng " : "Chi tiết khách hàng"}</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <div className="form-group mb-2">
            <label>Tên</label>
            {isEditMode ? (
              <input
                className="form-control"
                value={selectedcustomer.supplierName}
                onChange={(e) =>
                  setSelectedcustomer({ ...selectedcustomer, supplierName: e.target.value })
                }
              />
            ) : (
              <div>{selectedcustomer.supplierName}</div>
            )}
          </div>

          <div className="form-group mb-2">
            <label>Email</label>
            {isEditMode ? (
              <input
                className="form-control"
                value={selectedcustomer.email}
                onChange={(e) =>
                  setSelectedcustomer({ ...selectedcustomer, email: e.target.value })
                }
              />
            ) : (
              <div>{selectedcustomer.email}</div>
            )}
          </div>

          <div className="form-group mb-2">
            <label>Phone</label>
            {isEditMode ? (
              <input
                className="form-control"
                value={selectedcustomer.phone}
                onChange={(e) =>
                  setSelectedcustomer({ ...selectedcustomer, phone: e.target.value })
                }
              />
            ) : (
              <div>{selectedcustomer.phone}</div>
            )}
          </div>
          <div className="form-group mb-2">
            <label>Address</label>
            {isEditMode ? (
              <input
                className="form-control"
                value={selectedcustomer.address}
                onChange={(e) =>
                  setSelectedcustomer({ ...selectedcustomer, address: e.target.value })
                }
              />
            ) : (
              <div>{selectedcustomer.address}</div>
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

export default Suppelier;
