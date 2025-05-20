import React, { useState } from "react";
import { Button, Card, Form, Row, Col, Toast, Alert } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import { addUser } from "../../service/userService";
import { BsCheckCircleFill } from "react-icons/bs";
import { showError, showSuccess } from "../../utils/alert";
function StaffAdd() {
    const navigate = useNavigate();
    const [showToast, setShowToast] = useState(false);
    const [contentToast, setcontentToast] = useState("");
    const [formData, setFormData] = useState({
        username: "",
        email: "",
        password: "",
        phone: "",
        active: "true",
        roleId: 1,
    });

    const handleSubmit = async (e) => {
        e.preventDefault();
        const data = {
            ...formData,
            roleId: parseInt(formData.roleId),
            active: formData.active === "true"
        };
        console.log(data);

        const response = await addUser(data);
        if (response) {
           showSuccess("Thêm  thành công !")
            setFormData({
                username: "",
                email: "",
                password: "",
                phone: "",
                active: "true",
                roleId: 1
            })
        } else {
        showError("Thêm thất bại !");
        
        }

    };

    return (
        <>
            <div className="p-4" style={{ backgroundColor: "#f5f5f5", minHeight: "100vh" }}>
                <h5 className="mb-4">Thêm mới nhân viên</h5>
                <Card className="p-4 shadow-sm bg-white rounded">
                    <Form onSubmit={handleSubmit}>
                        <Form.Group as={Row} className="mb-3" controlId="formName">
                            <Form.Label column sm={2}>Họ tên</Form.Label>
                            <Col sm={10}>
                                <Form.Control
                                    type="text"
                                    placeholder="Nhập họ tên"
                                    value={formData.username}
                                    onChange={(e) => setFormData({ ...formData, username: e.target.value })}
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

                        <Form.Group as={Row} className="mb-3" controlId="formPassword">
                            <Form.Label column sm={2}>Mật khẩu</Form.Label>
                            <Col sm={10}>
                                <Form.Control
                                    type="password"
                                    placeholder="Nhập mật khẩu"
                                    value={formData.password}
                                    onChange={(e) => setFormData({ ...formData, password: e.target.value })}
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

                        <Form.Group as={Row} className="mb-3" controlId="formStatus">
                            <Form.Label column sm={2}>Trạng thái</Form.Label>
                            <Col sm={10}>
                                <Form.Select
                                    value={formData.active}
                                    onChange={(e) => setFormData({ ...formData, active: e.target.value })}
                                >
                                    <option value="true">Hoạt động</option>
                                    <option value="false">Ngưng hoạt động</option>
                                </Form.Select>
                            </Col>
                        </Form.Group>

                        <Form.Group as={Row} className="mb-3" controlId="formRole">
                            <Form.Label column sm={2}>Quyền</Form.Label>
                            <Col sm={10}>
                                <Form.Select
                                    value={formData.roleId}
                                    onChange={(e) => setFormData({ ...formData, roleId: e.target.value })}
                                >
                                    <option value="1">ADMIN</option>
                                    <option value="2">STAFF</option>
                                </Form.Select>
                            </Col>
                        </Form.Group>
                        <Row>
                            <Col sm={6} className="text-start">
                                <Button variant="secondary" onClick={() => navigate("/staff")}>
                                    Quay lại
                                </Button>
                            </Col>
                            <Col sm={6} className="text-end">
                                <Button variant="primary" type="submit"  >
                                   Lưu
                                </Button>
                            </Col>
                        </Row>
                    </Form>
                </Card>
            </div>
        </>
    );
}

export default StaffAdd;
