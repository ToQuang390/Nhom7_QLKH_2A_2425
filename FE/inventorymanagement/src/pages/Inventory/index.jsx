import React, { useEffect, useRef } from "react";
import { useState } from 'react';
import Modal from 'react-bootstrap/Modal';
import Form from 'react-bootstrap/Form';
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
import { getListInventory, getListInventoryPage } from "../../service/inventoryService";
import numeral from "numeral";

function Inventory() {
  const [category, setcategory] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [selectedcategory, setSelectedcategory] = useState({});

  const [search, setSearch] = useState("");

  const [page, setPage] = useState(1); // bắt đầu từ 1 vì backend đã sửa
  const [totalPages, setTotalPages] = useState(0);

  //Tìm kiếm
  const searchInputRef = useRef(null);

  //Get List User
  // const fetchApi = async () => {
  //   const response = await getListInventory();
  //   setcategory(response.reverse());
  // }
  // useEffect(() => {
  //   fetchApi();
  // }, []);

  //Get List User
  const fetchApi = async (currentPage) => {
    const result = await getListInventoryPage(currentPage, 10, search);
    setcategory(result.content);
    setPage(result.pageNumber); // backend đã trả về từ 1
    setTotalPages(result.totalPages);
  }

  useEffect(() => {
    fetchApi(page);
  }, [page, search]);


  const hanldeSearch = async () => {
    const searchValue = searchInputRef.current.value;
    setSearch(searchValue); // cập nhật state search
    const result = await getListInventoryPage(1, 10, searchValue); // luôn tìm từ trang 1
    setcategory(result.content);
    setPage(result.pageNumber);
    setTotalPages(result.totalPages);
  };

  //xem thông tin 
  const handleView = (item) => {
    setSelectedcategory(item);
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
                <h5 className="page-title">Hàng trong kho </h5>
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
                        <th>STT</th>
                        <th>Mã </th>
                        <th>Tên hàng </th>
                        <th>Đơn vị </th>
                        <th>Số lượng</th>
                        <th>Giá bình quân</th>
                        <th>Loại</th>
                        <th>Hành động</th>

                      </tr>
                    </thead>
                    <tbody>
                      {category && category.map((item, index) => (
                        <tr key={item.id}>
                          <td>{index + 1}</td>
                          <td>{item.product.productCode || ""}</td>
                          <td>{item.product.name || ""}</td>
                          <td>{item.product.unit.name || ""}</td>
                          <td>{item.quantity || ""}</td>
                          <td>{item.avgPrice ? numeral(item.avgPrice).format('0,0') : "" || ""}</td>
                          <td>{item.product.category.name || ""}</td>
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
          <Modal.Title>{"Chi tiết hàng trong kho"}</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <div className="form-group mb-2">
            <label>Mã</label>
            <div>{selectedcategory.product?.productCode || "Trống"}</div>
          </div>
          <div className="form-group mb-2">
            <label>Tên</label>
            <div>{selectedcategory.product?.name || "Trống"}</div>
          </div>
          <div className="form-group mb-2">
            <label>Đơn vị</label>
            <div>{selectedcategory.product?.unit.name || "Trống"}</div>
          </div>
          <div className="form-group mb-2">
            <label>Số lượng</label>
            <div>{selectedcategory.quantity || "Trống"}</div>
          </div>
          <div className="form-group mb-2">
            <label>Giá bình quân</label>
            <div>{numeral(selectedcategory.avgPrice).format('0,0') || "Trống"}đ</div>
          </div>
          <div className="form-group mb-2">
            <label>Loại hàng:</label>
            <div>{selectedcategory.product?.category?.name || "Trống"}</div>
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

export default Inventory;
