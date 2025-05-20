import React, { useState } from "react";
import { Button, Card, Form, Row, Col, Toast, Alert } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import { addUser } from "../../service/userService";
import { BsCheckCircleFill } from "react-icons/bs";
import { addSupplier } from "../../service/supplierSerivce";
function SupplierAdd() {
 const navigate = useNavigate();
    const [showToast, setShowToast] = useState(false);
    const [contentToast, setcontentToast] = useState("");
    const [formData, setFormData] = useState({
        name: "",
        email: "",
        phone: "",
        address: ""
    });

    const handleSubmit = async (e) => {
        e.preventDefault();

        console.log(formData);
        const data ={
            id:null,
            supplierName: formData.name,
            email:  formData.email,
            phone: formData.phone,
            address: formData.address,
            isdelete:false
        }

        const response = await addSupplier(data);
        if (response) {
            setcontentToast("Thêm nhà cung cấp thành công !");
            setShowToast(true);
            setFormData({
                name: "",
                email: "",
                phone: "",
                address: ""

            })
        } else {
            setcontentToast("Thêm khách dùng thất bại !");
            setShowToast(true);

        }

    };

    return (
        <>
            <div className="p-4" style={{ backgroundColor: "#f5f5f5", minHeight: "100vh" }}>
                <h5 className="mb-4">Thêm nhà cung cấp</h5>
                <Card className="p-4 shadow-sm bg-white rounded">
                    <Form onSubmit={handleSubmit}>
                        <Form.Group as={Row} className="mb-3" controlId="formName">
                            <Form.Label column sm={2}>Tên nhà cung cấp</Form.Label>
                            <Col sm={10}>
                                <Form.Control
                                    type="text"
                                    placeholder="Nhập  tên"
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
                                    onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
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
                                <Button variant="secondary" onClick={() => navigate("/supplier")}>
                                    Quay lại
                                </Button>
                            </Col>
                            <Col sm={6} className="text-end">
                                <Button variant="primary" type="submit"  >
                                    Thêm 
                                </Button>
                            </Col>
                        </Row>
                    </Form>
                </Card>
            </div>

            <Toast
                onClose={() => setShowToast(false)}
                show={showToast}
                delay={2000}
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

export default SupplierAdd;
