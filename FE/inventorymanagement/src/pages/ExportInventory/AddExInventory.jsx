
import React, { useEffect, useReducer } from "react";
import { Card, Form, Button, Row, Col, Table, InputGroup } from "react-bootstrap";
import { getListInventory, getListProductInventory } from "../../service/inventoryService";
import "../../assets/css/addinventory.css";
import { useNavigate } from "react-router-dom";
import { addImport } from "../../service/importService";
import { showError, showSuccess } from "../../utils/alert";
import { getListCustomer } from "../../service/customerService";
import { addExport } from "../../service/exportService";
const today = new Date().toISOString().split("T")[0];

const initState = {
    searchTerm: "",
    listProducts: [],
    customers: [],
    productDetails: [],
    totalAmount: 0,
    customerId: 0,
    currentDate: today,
    description: "",
};

function reducer(state, action) {

    switch (action.type) {
        //set trang thai sản phẩm 
        case "SET_LIST_PRODUCT":
            return { ...state, listProducts: action.payload };
        //set trang thai sản phẩm 
        case "SET_LIST_SUPPLIER":
            return { ...state, customers: action.payload };
        //set id nhà cung cấp
        case "SET_SUPPLIER_ID":
            return { ...state, customerId: action.payload };
        //set tu khoa
        case "SET_SEARCH_TERM":
            return { ...state, searchTerm: action.payload };
        case "CLEAR_ALL_PRODUCTS":
            return { ...state, productDetails: [], totalAmount: 0 };
        case "SET_DESCRIPTION":
            return { ...state, description: action.payload };
        //set trang thai prochi ten
        case "UPDATE_PRODUCT_DETAIL": {
            const updatedDetails = state.productDetails.map((item, index) =>
                index === action.payload.index
                    ? { ...item, [action.payload.field]: action.payload.value }
                    : item
            );

            const total = updatedDetails.reduce((sum, item) => {
                const quantity = Number(item.quantity) || 0;
                const price = Number(item.price) || 0;
                return sum + quantity * price;
            }, 0);

            return { ...state, productDetails: updatedDetails, totalAmount: total };
        }

        case "TOGGLE_PRODUCT": {
            const existing = state.productDetails.find(p => p.id === action.payload.id);
            let updatedDetails;

            if (existing) {
                updatedDetails = state.productDetails.filter(p => p.id !== action.payload.id);
            } else {
                updatedDetails = [
                    ...state.productDetails,
                    {
                        ...action.payload,
                        quantity: 1,
                        price: 0
                    }
                ];
            }

            const total = updatedDetails.reduce((sum, item) => {
                const quantity = Number(item.quantity) || 0;
                const price = Number(item.price) || 0;
                return sum + quantity * price;
            }, 0);

            return { ...state, productDetails: updatedDetails, totalAmount: total };
        }

        default:
            return state;
    }
}

function AddExInventory() {
    const [state, dispatch] = useReducer(reducer, initState);
    const navigate = useNavigate();
    //Get Product
    useEffect(() => {
        const fetchApi = async () => {
            const listproduct = await getListProductInventory();
            dispatch({ type: "SET_LIST_PRODUCT", payload: listproduct });
            console.log(listproduct);
        }
        fetchApi();
    }, []);

    //Get List customers
    useEffect(() => {
        const fetchApi = async () => {
            const listsupplier = await getListCustomer();
            dispatch({ type: "SET_LIST_SUPPLIER", payload: listsupplier });
            console.log(listsupplier);
        }
        fetchApi();
    }, []);

    const handleToggleProduct = (product) => {
        dispatch({ type: "TOGGLE_PRODUCT", payload: product });
    };

    const handleProductDetailChange = (index, field, value) => {
        dispatch({
            type: "UPDATE_PRODUCT_DETAIL",
            payload: { index, field, value }
        });
    };


    const handleSubmit = async () => {
        console.log(state);
        
        const payload = {
            customerId: state.customerId,
            description: state.description || "",
            exportDetailList: state.productDetails,
            userId: 1,
            total: state.totalAmount || 0
        };
        console.log("dữ liệu gửi đi",payload);

        if (state.customerId === 0) {
            showError("Vui lòng chọn khách hàng!");
            return;
        }

        if (state.productDetails.length === 0) {
            showError("Vui lòng chọn ít nhất một sản phẩm!");
            return;
        }
        // const importDetailList = state.productDetails.map(item => ({
        //     productId: item.id,
        //     quantity: item.quantity,
        //     price: item.price
        // }));

        // const payload = {
        //     customerId: state.customerId,
        //     description: state.description || "",
        //     importDetailList: importDetailList,
        //     userId: 1,
        //     total: state.totalAmount || 0
        // };

        try {
            const response = await addExport(payload);

            if (response) {
                showSuccess("Tạo phiếu xuất  thành công!");

            } else {
                showError("Tạo phiếu xuất thất bại!");
            }
        } catch (error) {
            console.error("Lỗi khi tạo phiếu nhập:", error);
            showError("Đã có lỗi xảy ra khi gửi dữ liệu!");
        }
    };

    const handleBack = () => {
        navigate("/inventory/imports");
    }

    return (
        <div className="p-4" style={{ backgroundColor: "#f5f5f5", minHeight: "100vh" }}>
            <h4 className="mb-4 text-start">Tạo phiếu xuất</h4>
            <Card className="p-4 shadow-sm bg-white rounded">
                <Row className="mb-3">
                    <Col md={6}>
                        <InputGroup className="mb-3">
                            <Form.Control
                                placeholder="Tìm kiếm theo mã or tên sản phẩm..."
                                value={state.searchTerm}
                                onChange={(e) =>
                                    dispatch({ type: "SET_SEARCH_TERM", payload: e.target.value })
                                }
                            />
                        </InputGroup>
                        <div style={{ maxHeight: "200px", overflowY: "auto", border: "1px solid #ddd", padding: "10px" }}>
                            {state.listProducts
                                .filter(
                                    (inventoryP) =>
                                        inventoryP.productName.toLowerCase().includes(state.searchTerm.toLowerCase()) ||
                                        inventoryP.productCode.toLowerCase().includes(state.searchTerm.toLowerCase())
                                )
                                .map((inventoryP) => (
                                    <Form.Check
                                        key={inventoryP.id}
                                        type="checkbox"
                                        label={inventoryP.productCode + " - " + inventoryP.productName}
                                        checked={state.productDetails.some((p) => p.id === inventoryP.id)}
                                        onChange={() =>
                                            handleToggleProduct({
                                                id: inventoryP.id,
                                                productId: inventoryP.productId,
                                                productCode: inventoryP.productCode,
                                                name: inventoryP.productName,
                                                quantity: 1,
                                                price: 0,
                                                unitReponse: { name: inventoryP.unitName },
                                                stockQuantity: inventoryP.quantity,
                                                avgPrice:inventoryP.avgPrice
                                            })
                                        }
                                    />
                                ))}

                        </div>
                        <Button
                            variant="outline-danger"
                            size="sm"
                            className="mt-2"
                            onClick={() => dispatch({ type: "CLEAR_ALL_PRODUCTS" })}
                        >
                            Bỏ chọn tất cả sản phẩm
                        </Button>
                    </Col>
                    <Col md={6}>
                        <Form.Group>

                            <Form.Label>Khách hàng</Form.Label>
                            <Form.Select
                                name="customerId"
                                value={state.customerId}
                                onChange={(e) =>
                                    dispatch({ type: "SET_SUPPLIER_ID", payload: parseInt(e.target.value) })
                                }
                            >
                                <option value={0}>-- Chọn khách hàng --</option>
                                {state.customers.map((item) => (
                                    <option key={item.id} value={item.id}>
                                        {item.name + "-" + item.phone}
                                    </option>
                                ))}
                            </Form.Select>
                        </Form.Group>
                        <Form.Group className="mt-3">
                            <Form.Label>Ngày</Form.Label>
                            <Form.Control
                                readOnly
                                type="date"
                                name="date"
                                value={state.currentDate}
                            />
                        </Form.Group>

                        <Form.Group className="mt-3">
                            <Form.Label>Người nhập</Form.Label>
                            <Form.Control
                                readOnly
                                name="orderCode"
                                value={"Tô Minh Quang"}

                            />
                        </Form.Group>
                        <Form.Group className="mt-3">
                            <Form.Label>Mô tả phiếu xuất</Form.Label>
                            <Form.Control
                                as="textarea"
                                rows={3}
                                value={state.description}
                                onChange={(e) =>
                                    dispatch({ type: "SET_DESCRIPTION", payload: e.target.value })
                                }
                                placeholder="Nhập mô tả về phiếu xuất, ví dụ: xuất hàng tháng 4..."
                            />
                        </Form.Group>
                        <Form.Group className="mt-3">
                            <Form.Label>Tổng tiền hàng (VND)</Form.Label>
                            <Form.Control
                                type="number"
                                name="total"
                                readOnly
                                value={state.totalAmount}
                            />
                        </Form.Group>

                    </Col>
                </Row>

                <Table className="mt-4">
                    <thead>
                        <tr>
                            <th>STT</th>
                            <th>Mã sản phẩm</th>
                            {/* <th>Code</th> */}
                            <th>Tên sản phẩm</th>
                            <th>Số lượng</th>
                            <th>Đơn giá xuất</th>
                            <th>Đơn vị tính</th>
                            <th>Thành tiền</th>
                        </tr>
                    </thead>
                    <tbody>
                        {state.productDetails.map((item, index) => (
                            <tr key={item.id}>
                                <td>{index + 1}</td>
                                {/* <td>{item.id}</td> */}
                                <td>{item.productCode}</td>
                                <td>{item.name}</td>
                                <td>
                                    <Form.Control
                                        type="number"
                                        value={item.quantity}
                                        min={1}
                                        onChange={(e) =>
                                            handleProductDetailChange(index, "quantity",parseInt(e.target.value))
                                        }
                                        max={item.stockQuantity}
                                    />
                                    <span className="stockquantity">Tồn kho :{item.stockQuantity}</span>
                                </td>
                                <td>
                                    <Form.Control
                                        type="number"
                                        value={item.price}
                                        min={0}
                                        onChange={(e) =>
                                            handleProductDetailChange(index, "price",parseInt(e.target.value))
                                        }
                                    />
                                </td>
                                <td>
                                    <Form.Control
                                        readOnly
                                        type="text"
                                        value={item.unitReponse.name}
                                    />
                                </td>
                                <td>
                                    {item.quantity && item.price
                                        ? Number(item.quantity) * Number(item.price)
                                        : 0}
                                </td>
                            </tr>
                        ))}
                    </tbody>

                </Table>


                <Row className="mt-3">
                    <Col>
                        <div className="d-flex justify-content-between">
                            <Button variant="secondary" onClick={handleBack}>
                                <i className="bi bi-arrow-left-circle"></i> Quay lại
                            </Button>
                            <Button variant="primary" onClick={handleSubmit}>
                                Lưu
                            </Button>
                        </div>
                    </Col>
                </Row>


            </Card>
        </div>
    );
}

export default AddExInventory;
