import React, { useEffect, useRef } from "react";
import { useState } from 'react';
import Modal from 'react-bootstrap/Modal';
import Form from 'react-bootstrap/Form';
import "../../assets/css/checkinventory.css";
import { BsSearch } from "react-icons/bs"; // Icon từ react-icons
import {
  Container,
  Row,
  Col,
  Breadcrumb,
  Button,
  Table,
  Pagination,
  Toast,
  CardBody,
  Card,
} from "react-bootstrap";
import "../../assets/css/inventory.css"; // CSS tùy chỉnh nếu có
import { Link } from "react-router-dom";
import { getInventoryCheck, getListInventory, searchInventory } from "../../service/inventoryService";
import numeral from "numeral";

function CheckInventory() {
  const [category, setcategory] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [selectedcategory, setSelectedcategory] = useState({});

  const [search, setSearch] = useState("");

  //Tìm kiếm
  const searchInputRef = useRef(null);

  //Get List User
  const fetchApi = async () => {
    const response = await getInventoryCheck();
    setcategory(response.reverse());
  }
  useEffect(() => {
    fetchApi();
  }, []);

  const fetchApiSearch = async (year,month) => {
    const response = await searchInventory(year,month);
    setcategory(response.reverse());
  }
 

  const hanldeSearch = () => {
    const searchValue = searchInputRef.current.value;
    console.log(searchValue);
    if (searchValue && searchValue.trim() !== "") {
      const [year, month] = searchValue.split("-");
      return fetchApiSearch(year, month);
    }
  
    fetchApi();
  };
  //xem thông tin 
  const handleView = (item) => {
    setSelectedcategory(item);
    setShowModal(true);
  };

  return (
    <>
      <div className="category">
        <div className="container-fluid">
          <div className="row">
            <div className="col-12">
              <div className="page-title-box">
                <h5 className="page-title">Lịch sử kiểm kho </h5>
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
                          <input type="month" className="form-control" id="inputPassword2" ref={searchInputRef} placeholder="Search..." />
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
                        <Link to="/inventory/checkadd" className="btn btn-success mb-2 me-2"><i className="mdi mdi-basket me-1"></i>Tạo phiếu điều chỉnh </Link>
                      </div>
                    </div>
                  </div>

                  <Table >
                    <thead>
                      <tr>
                        {/* <th>STT</th> */}
                        <th>Mã phiếu kiểm</th>
                        <th>Ngày kiểm </th>
                        <th>Ghi chú </th>
                        <th>Người kiểm</th>
                        <th>Hành động</th>
                      </tr>
                    </thead>
                    <tbody>
                      {category && category.map((item, index) => (
                        <tr key={item.id}>
                          {/* <td>{index + 1}</td> */}
                          <td>{item.id}</td>
                          <td>{item.createdAt || ""}</td>
                          <td>{item.note || ""}</td>
                          <td>{item.createUser.username || ""}</td>
                          <td>
                            <button className="btn btn-link p-0 me-2">
                              <i className="bi bi-eye-fill text-primary" onClick={() => handleView(item)}></i>
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
          <Modal.Title>{"Chi tiết kiểm hàng trong kho"}</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <div className="form-group mb-2">
            <label>Mã Phiếu</label>
            <div>{selectedcategory.id || "Trống"}</div>
          </div>
          <div className="form-group mb-2">
            <label>Ngày kiểm</label>
            <div>{selectedcategory.createdAt || "Trống"}</div>
          </div>
          <div className="form-group mb-2">
            <label>Người kiểm </label>
            <div>{selectedcategory.createUser?.username || "Trống"}</div>
          </div>
          <div className="form-group mb-2">
            <label>Ghi chú</label>
            <div>{selectedcategory.note || "Trống"}</div>
          </div>

          {/* Bảng chi tiết kiểm kho */}
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
                        <th>Tồn hệ thống</th>
                        <th>Tồn thực tế</th>
                        <th>Chênh lệch</th>
                      </tr>
                    </thead>
                    <tbody>
                      {selectedcategory.checkDetailRequestList && selectedcategory.checkDetailRequestList.map((item, index) => (
                        <tr key={index}>
                          <td>{index + 1}</td>
                          <td>{item.productReponse.productCode || ""}</td>
                          <td>{item.productReponse?.name || ""}</td>
                          <td>{item.productReponse?.unit.name || ""}</td>
                          <td>{item.systemQuantity || ""}</td>
                          <td>{item.actualQuantity || ""}</td>
                          <td>{item.difference || ""}</td>
                        </tr>
                      ))}
                    </tbody>
                  </Table>
                </div>
              </Col>
            </Row>
          </div>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={() => setShowModal(false)}>
            Đóng
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
}

export default CheckInventory;
