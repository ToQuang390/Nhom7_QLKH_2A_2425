import React, { useEffect, useState } from "react";
import { Button, Card, Form, Row, Col, Toast, Alert } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import { addUser } from "../../service/userService";
import { BsCheckCircleFill } from "react-icons/bs";
import { addSupplier } from "../../service/supplierSerivce";
import { addCategory, getListCategory } from "../../service/categoryService";
import { addProduct } from "../../service/productService";
import { getListUnit } from "../../service/unitService";
import { showError, showSuccess } from "../../utils/alert";
function ProductAdd() {
    const navigate = useNavigate();
    const [showToast, setShowToast] = useState(false);
    const [contentToast, setcontentToast] = useState("");
    const [category, setCategory] = useState([]);
    const [unit,setUnit]=useState([]);
    const [formData, setFormData] = useState({
        name: "",
        productCode: "",
        description: "",
        categoryId: 0,
        unitId:0

    });

    const fetchApiUnit = async () => {
        const response = await getListUnit();
        setUnit(response);
    }
    useEffect(() => {
        fetchApiUnit();
    }, []);

    const fetchApi = async () => {
        const response = await getListCategory();
        setCategory(response);
    }
    useEffect(() => {
        fetchApi();
    }, []);

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (formData.categoryId == 0 || formData.unitId==0) {
               showError("Vui lòng chọn điền đầy đủ thông tin!");
        }else{
            const response = await addProduct(formData);
            if (response!=null) {
               showSuccess("Thêm thành công !")
                setFormData({
                    name: "",
                    productCode: "",
                    description: "",
                    categoryId: 0,
                    unitId:0
                })
            } else {
                showError("Thêm thất bại !");
            }
        }
    };

    return (
        <>
            <div className="p-4" style={{ backgroundColor: "#f5f5f5", minHeight: "100vh" }}>
                <h5 className="mb-4">Thêm sản phẩm</h5>
                <Card className="p-4 shadow-sm bg-white rounded">
                    <Form onSubmit={handleSubmit}>

                        <Form.Group as={Row} className="mb-3" controlId="formName">
                            <Form.Label column sm={2}>Tên </Form.Label>
                            <Col sm={5}>
                                <Form.Control
                                    required
                                    type="text"
                                    placeholder="Nhập tên"
                                    value={formData.name}
                                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                                />
                            </Col>
                        </Form.Group>

                        <Form.Group as={Row} className="mb-3" controlId="formName">
                            <Form.Label column sm={2}>Code </Form.Label>
                            <Col sm={5}>
                                <Form.Control
                                    required
                                    type="text"
                                    placeholder="code..."
                                    value={formData.productCode}
                                    onChange={(e) => setFormData({ ...formData, productCode: e.target.value })}
                                />
                            </Col>
                        </Form.Group>


                        <Form.Group as={Row} className="mb-3" controlId="formDescription">
                            <Form.Label column sm={2}>Mô tả</Form.Label>
                            <Col sm={5}>
                                <Form.Control
                                    as="textarea"
                                    rows={3} // số dòng hiển thị
                                    placeholder="Mô tả..."
                                    value={formData.description}
                                    onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                                />
                            </Col>
                        </Form.Group>

                        <Form.Group as={Row} className="mb-3" controlId="formName">
                            <Form.Label column sm={2}>Danh mục </Form.Label>
                            <Col sm={5}>

                                <select
                                    className="form-select"
                                    value={formData.categoryId}
                                    onChange={(e) =>
                                        setFormData({ ...formData, categoryId: parseInt(e.target.value) })
                                    }
                                >
                                    <option value={0}>Chooice</option>
                                    {category && category.map((item) => (
                                        <option value={item.id}>{item.name}</option>
                                    ))}

                                </select>
                            </Col>
                        </Form.Group>
                        <Form.Group as={Row} className="mb-3" controlId="formName">
                            <Form.Label column sm={2}>Đơn vị tính </Form.Label>
                            <Col sm={5}>

                                <select
                                    className="form-select"
                                    value={formData.unitId}
                                    onChange={(e) =>
                                        setFormData({ ...formData, unitId: parseInt(e.target.value) })
                                    }
                                >
                                    <option value={0}>Chooice</option>
                                    {unit && unit.map((item) => (
                                        <option value={item.id}>{item.name}</option>
                                    ))}

                                </select>
                            </Col>
                        </Form.Group>
                        <Row>
                            <Col sm={6} className="text-start">
                                <Button variant="secondary" onClick={() => navigate("/products")}>
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
                <Toast.Header className="bg-gray text-warning">
                    <strong className="me-auto">Thông báo</strong>
                </Toast.Header>
                <Toast.Body className="bg-gray ">{contentToast}</Toast.Body>
            </Toast>
        </>
    );
}

export default ProductAdd;
