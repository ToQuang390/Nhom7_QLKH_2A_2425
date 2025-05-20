import React, { useState } from "react";
import { Button, Card, Form, Row, Col, Toast, Alert } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import { addCategory } from "../../service/categoryService";
import { showError, showSuccess } from "../../utils/alert";
function CategoryAdd() {
    const navigate = useNavigate();
    const [showToast, setShowToast] = useState(false);
    const [contentToast, setcontentToast] = useState("");
    const [formData, setFormData] = useState({
        name: "",
        description: "",

    });

    const handleSubmit = async (e) => {
        e.preventDefault(); 

        const response = await addCategory(formData);
        if (response) {
            showSuccess("Thêm danh mục thành công !")
            setFormData({
                name: "",
                description: ""
            })
        } else {
            showError("Thêm thất bại !");
        }
    };

    return (
        <>
            <div className="p-4" style={{ backgroundColor: "#f5f5f5", minHeight: "100vh" }}>
                <h5 className="mb-4">Thêm danh mục</h5>
                <Card className="p-4 shadow-sm bg-white rounded">
                    <Form onSubmit={handleSubmit}>
                        <Form.Group as={Row} className="mb-3" controlId="formName">
                            <Form.Label column sm={2}>Tên </Form.Label>
                            <Col sm={5}>
                                <Form.Control
                                    type="text"
                                    placeholder="Nhập  tên"
                                    value={formData.name}
                                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                                />
                            </Col>
                        </Form.Group>

                        <Form.Group as={Row} className="mb-3" controlId="formDescription">
                            <Form.Label column sm={2}>Mô tả</Form.Label>
                            <Col sm={5}>
                                <Form.Control
                                    as="textarea"
                                    rows={3} // số dòng hiển thị
                                    placeholder="Nhập mô tả"
                                    value={formData.description}
                                    onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                                />
                            </Col>
                        </Form.Group>
                        <Row>
                            <Col sm={6} className="text-start">
                                <Button variant="secondary" onClick={() => navigate("/categorys")}>
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

export default CategoryAdd;
