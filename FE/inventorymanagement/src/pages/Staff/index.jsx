import React, { useEffect, useState } from "react";
import { Table, Button, Image, Card, CardBody, Modal, Toast, } from "react-bootstrap";
import { FaEdit, FaTrash } from "react-icons/fa";
import { Link } from "react-router-dom";
import "../../assets/css/staff.css";
import { deleteUser, getListUser, updateUser } from "../../service/userService";


function Staff() {

  const [staff, setStaff] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [selectedStaff, setSelectedStaff] = useState({});
  const [isEditMode, setIsEditMode] = useState(null);

  const [showToast, setShowToast] = useState(false);
  const [contentToast, setcontentToast] = useState("");

  const [status, setStatus] = useState("0");
  const [originalStaff, setOriginalStaff] = useState([]);
  //Get List User
  const fetchApi = async () => {
    const response = await getListUser();
    console.log(response);
    setStaff(response.reverse());
    setStaff(response.reverse());        
    setOriginalStaff(response.reverse());
  }
  useEffect(() => {
    fetchApi();
  }, []);

  //Update User
  const handleSave = async () => {
    console.log(selectedStaff);
    const payload = {
      id: selectedStaff.id,
      username: selectedStaff.username,
      email: selectedStaff.email,
      phone: selectedStaff.phone,
      roleId: parseInt(selectedStaff.roleId), // gửi đúng roleId
      active: selectedStaff.active,
    };
    console.log("data gửi đi", payload);

    try {
      await updateUser(payload); // gọi API backend cập nhật
      setShowModal(false); // đóng modal
      fetchApi(); // load lại dữ liệu
    } catch (error) {
      console.error("Lỗi khi cập nhật:", error);
    }

  };

  const mapRoleToId = (role) => {
    if (role === "ADMIN") return 1;
    if (role === "STAFF") return 2;
    return null;
  };

  //xóa người dùng 
  const handleDel = async (item) => {
    try {
      const response = await deleteUser((item.id));
      if (response) {
        setStaff((prevStaff) => prevStaff.filter((user) => user.id !== parseInt(item.id)));
        setShowToast(true)
        setcontentToast("Xóa thành công !")
      } else {
        setShowToast(true)
        setcontentToast("Xóa thất bại !")
      }

    } catch (error) {

    }

  }


  //xem thông tin 
  const handleView = (item) => {
    setSelectedStaff({ ...item, roleId: mapRoleToId(item.role) });
    setIsEditMode(false);
    setShowModal(true);
  };

  //Chỉnh sửa
  const hanldeEdit = (item) => {
    setSelectedStaff({ ...item, roleId: mapRoleToId(item.role) });
    setIsEditMode(true);
    setShowModal(true);
  };

  //filter status 
  const handleStatusChange = (e) => {
    const selectedValue = e.target.value;
    setStatus(selectedValue);
  
    if (selectedValue === "1") {
      const arrA = originalStaff.filter((user) => user.active === true);
      setStaff(arrA);
    } else if (selectedValue === "2") {
      const arrB = originalStaff.filter((user) => user.active === false);
      setStaff(arrB);
    } else {
      setStaff(originalStaff); // show lại tất cả
    }
  };


  return (

    <>
      <div className="staff">
        <div className="container-fluid">
          <div className="row">
            <div className="col-12">
              <div className="page-title-box">
                <h5 className="page-title">Nhân viên</h5>
              </div>
            </div>
          </div>
          <div className="row">
            <div className="col-12">
              <Card className=" shadow-sm bg-white rounded">
                <CardBody>
                  <div class="row mb-2">
                    <div class="col-xl-8">
                      <form class="row gy-2 gx-2 align-items-center justify-content-xl-start justify-content-between">
                        {/* <div class="col-auto">
                          <label for="inputPassword2" class="visually-hidden">Search</label>
                          <input type="search" class="form-control" id="inputPassword2" placeholder="Search..." />
                        </div> */}
                        <div class="col-auto">
                          <div class="d-flex align-items-center">
                            <label for="status-select" class="me-2">Trạng thái</label>
                            <select class="form-select" id="status-select" onChange={handleStatusChange}>
                              <option selected="0">Tất cả</option>
                              <option value="1">Active</option>
                              <option value="2">DisActive </option>
                            </select>
                          </div>
                        </div>
                      </form>
                    </div>
                    <div class="col-xl-4">
                      <div class="text-xl-end mt-xl-0 mt-2">
                        <Link to="/staff/add" class="btn btn-danger mb-2 me-2"><i class="mdi mdi-basket me-1"></i> Thêm nhân viên</Link>
                      </div>
                    </div>
                  </div>
                  <Table >
                    <thead>
                      <tr>
                        <th>STT</th>
                        <th>Name</th>
                        <th>Email</th>
                        <th>Phone</th>
                        {/* <th>Address</th> */}
                        <th>Role</th>
                        <th>Active</th>
                        <th>Action</th>
                      </tr>
                    </thead>
                    <tbody>
                      <tr>
                        <td>1</td>
                        <td>Mark</td>
                        <td>Otto</td>
                        <td>@mdo</td>

                        <td>@mdo</td>
                        <td>@mdo</td>
                        <td>
                          <td>
                            <button className="btn btn-link p-0 me-2" >
                              <i className="bi bi-eye-fill text-primary" ></i>
                            </button>
                            <button className="btn btn-link p-0 me-2" >
                              <i className="bi bi-pencil-square text-warning"></i>
                            </button>
                            <button className="btn btn-link p-0">
                              <i className="bi bi-trash text-danger"></i>
                            </button>
                          </td>
                        </td>
                      </tr>

                      {staff && staff.map((item, index) => (
                        <tr key={item.id}>
                          <td>{index + 1}</td>
                          <td>{item.username || ""}</td>
                          <td>{item.email || ""}</td>
                          <td>{item.phone || ""}</td>
                          {/* <td>{item.address || ""}</td> */}
                          <td>{item.role || ""}</td>
                          <td>{item.active ? (
                            <span className="badge badge-success-lighten">
                              <i class="bi bi-check-circle-fill text-success"></i>
                            </span>
                          ) : (
                            <span className="badge badge-danger-lighten">
                              <i class="bi bi-x-circle-fill text-danger"></i>
                            </span>
                          )}</td>
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
          <Modal.Title>{isEditMode ? "Sửa thông tin nhân viên" : "Chi tiết nhân viên"}</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <div className="form-group mb-2">
            <label>Tên</label>
            {isEditMode ? (
              <input
                className="form-control"
                value={selectedStaff.username}
                onChange={(e) =>
                  setSelectedStaff({ ...selectedStaff, username: e.target.value })
                }
              />
            ) : (
              <div>{selectedStaff.username}</div>
            )}
          </div>

          <div className="form-group mb-2">
            <label>Email</label>
            {isEditMode ? (
              <input
                className="form-control"
                value={selectedStaff.email}
                onChange={(e) =>
                  setSelectedStaff({ ...selectedStaff, email: e.target.value })
                }
              />
            ) : (
              <div>{selectedStaff.email}</div>
            )}
          </div>

          <div className="form-group mb-2">
            <label>Phone</label>
            {isEditMode ? (
              <input
                className="form-control"
                value={selectedStaff.phone}
                onChange={(e) =>
                  setSelectedStaff({ ...selectedStaff, phone: e.target.value })
                }
              />
            ) : (
              <div>{selectedStaff.phone}</div>
            )}
          </div>

          <div className="form-group mb-2">
            <label>Role</label>
            {isEditMode ? (
              <select
                className="form-select"
                value={selectedStaff.roleId}
                onChange={(e) =>
                  setSelectedStaff({ ...selectedStaff, roleId: e.target.value })
                }
              >
                <option value={1}>ADMIN</option>
                <option value={2}>STAFF</option>
              </select>
            ) : (
              <div>{selectedStaff.role}</div>
            )}
          </div>

          <div className="form-group mb-2">
            <label>Active</label>
            {isEditMode ? (
              <select
                className="form-select"
                value={selectedStaff.active ? "true" : "false"}
                onChange={(e) =>
                  setSelectedStaff({ ...selectedStaff, active: e.target.value === "true" })
                }
              >
                <option value="true">Hoạt động</option>
                <option value="false">Ngưng hoạt động</option>
              </select>
            ) : (
              <div>
                {selectedStaff.active ? (<span>Hoạt động</span>) : (<span>Ngưng hoạt động</span>)}
              </div>
            )}
          </div>


          {/* Thêm các field khác tương tự */}
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

export default Staff;
