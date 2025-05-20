import React, { useState } from "react";
import { Table, Button, Image, Card, Form, Row, Col, Toast } from "react-bootstrap";
import { FaEdit, FaTrash } from "react-icons/fa";
import { Link } from "react-router-dom";
import { addUser } from "../../service/userService";
import { useNavigate } from "react-router-dom";
import { addSupplier } from "../../service/supplierSerivce";
import { addCustomer } from "../../service/customerService";
import { showError, showSuccess } from "../../utils/alert";

function CustomerAdd() {
    const navigate = useNavigate();
    const [showToast, setShowToast] = useState(false);
    const [contentToast, setcontentToast] = useState("");
    const [formData, setFormData] = useState({
        name: "",
        email: "",
        phone: null,
        address: ""
    });

    const handleSubmit = async (e) => {
        e.preventDefault();

        console.log(formData);
        const data ={
            id:null,
            name: formData.name,
            email:  formData.email,
            phone: formData.phone,
            address: formData.address,
            isdelete:false
        }

        const response = await addCustomer(data);
        if (response) {
          showSuccess("Thêm  thành công !")
            setFormData({
                name: "",
                email: "",
                phone: "",
                address: ""

            })
        } else {
           showError("Thêm thất bại !");
        }

    };

    return (
        <>
            <div className="p-4" style={{ backgroundColor: "#f5f5f5", minHeight: "100vh" }}>
                <h5 className="mb-4">Thêm mới khách hàng</h5>
                <Card className="p-4 shadow-sm bg-white rounded">
                    <Form onSubmit={handleSubmit}>
                        <Form.Group as={Row} className="mb-3" controlId="formName">
                            <Form.Label column sm={2}>Họ tên</Form.Label>
                            <Col sm={10}>
                                <Form.Control
                                    type="text"
                                    placeholder="Nhập họ tên"
                                    value={formData.name}
                                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                                />
                            </Col>
                        </Form.Group>

                        <Form.Group as={Row} className="mb-3" controlId="formEmail">
                            <Form.Label column sm={2}>Email</Form.Label>
                            <Col sm={10}>
                                <Form.Control
                                    type="email"
                                    placeholder="Nhập email"
                                    value={formData.email}
                                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                                />
                            </Col>
                        </Form.Group>

                        <Form.Group as={Row} className="mb-3" controlId="formPhone">
                            <Form.Label column sm={2}>Số điện thoại</Form.Label>
                            <Col sm={10}>
                                <Form.Control
                                    type="text"
                                    placeholder="Nhập số điện thoại"
                                    value={formData.phone}
                                    onChange={(e) => setFormData({ ...formData, phone: parseInt(e.target.value) })}
                                />
                            </Col>
                        </Form.Group>

                        <Form.Group as={Row} className="mb-3" controlId="formaddress">
                            <Form.Label column sm={2}>Address</Form.Label>
                            <Col sm={10}>
                                <Form.Control
                                    type="text"
                                    placeholder="Nhập địa chỉ"
                                    value={formData.address}
                                    onChange={(e) => setFormData({ ...formData, address: e.target.value })}
                                />
                            </Col>
                        </Form.Group>


                        <Row>
                            <Col sm={6} className="text-start">
                                <Button variant="secondary" onClick={() => navigate("/customer")}>
                                    Quay lại
                                </Button>
                            </Col>
                            <Col sm={6} className="text-end">
                                <Button variant="primary" type="submit"  >
                                    Thêm khách hàng
                                </Button>
                            </Col>
                        </Row>
                    </Form>
                </Card>
            </div>

        </>
    );
}

export default CustomerAdd;
