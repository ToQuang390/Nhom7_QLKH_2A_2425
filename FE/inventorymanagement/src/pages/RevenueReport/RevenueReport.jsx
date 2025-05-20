import React, { useEffect, useRef, useState } from "react";
import Modal from 'react-bootstrap/Modal';
import { Link } from "react-router-dom";
import { Button, Table, Pagination, Toast, CardBody, Card } from "react-bootstrap";
import "../../assets/css/category.css"; // CSS tùy chỉnh nếu có
import { deleteCategory, getListCategory, updateCategory } from "../../service/categoryService";
import { getListRevenueReport, getListRevenueReportToPDF } from "../../service/reportService";
import numeral from "numeral";
import iconbox from "../../assets/image/iconbox.png";
import { showConfirm, showError } from "../../utils/alert";
function RevenueReport() {

    const [report, setreport] = useState([]);
    const [showModal, setShowModal] = useState(false);
    const [selectedcategory, setSelectedcategory] = useState({});
    const [isEditMode, setIsEditMode] = useState(null);

    const [search, setSearch] = useState("");


    //Tìm kiếm
    const searchInputRef = useRef(null);
    // Lấy dữ liệu báo cáo
    const fetchApi = async (year, month) => {
        if (!year || !month) {
            setreport([]); 
            return;
        }
        const response = await getListRevenueReport(year, month);
        setreport(response);
    }

    useEffect(() => {
        fetchApi(); 
    }, []);

    const hanldeSearch = () => {
        const searchValue = searchInputRef.current.value; 
        if (!searchValue) return;
        const [year, month] = searchValue.split("-");
        fetchApi(year, month);
    };

    const hanldeToPDF = async() => {
         const confirmResult = await showConfirm("Bạn muốn xuất file pdf chứ?");
         if(confirmResult.isConfirmed) {
            const searchValue = searchInputRef.current.value; 
            if (!searchValue){
                showError("Vui lòng chọn ngày tháng");
            }else{
                const [year, month] = searchValue.split("-");
    
                try {
                    await getListRevenueReportToPDF(year, month);
                } catch (err) {
                    showError("Không thể tải file PDF");
                }
            }
         }
        
    };


    return (
        <>
            <div className="category">
                <div className="container-fluid">
                    <div className="row">
                        <div className="col-12">
                            <div className="page-title-box">
                                <h5 className="page-title">Báo cáo doanh thu </h5>
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
                                                <Button  onClick={hanldeToPDF} className="btn btn-success mb-2 me-2"><i class="bi bi-file-earmark-pdf"></i> Xuất file PDF </Button>
                                            </div>
                                        </div>
                                    </div>
                                    <Table >
                                        <thead>
                                            <tr>
                                                <th >STT</th>
                                                <th>Code </th>
                                                <th>Tên </th>
                                                <th>Doanh thu</th>
                                                <th>Lợi nhuận</th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            {report.length === 0 ? (
                                                <tr>
                                                    <td colSpan="5" className="text-center">
                                                        <img src={iconbox} alt="ảnh icon box" />
                                                    <br></br> Không có dữ liệu
                                                        </td>
                                                </tr>
                                            ) : (
                                                report.map((item, index) => (
                                                    <tr key={item.productId}>
                                                        <td>{index + 1}</td>
                                                        <td>{item.productCode || ""}</td>
                                                        <td>{item.productName || ""}</td>
                                                        <td>{item.totalRevenue ? numeral(item.totalRevenue).format('0,0') : 0}</td>
                                                        <td>{item.totalProfit ? numeral(item.totalProfit).format('0,0') : 0}</td>
                                                    </tr>
                                                ))
                                            )}
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
                    <Modal.Title>{isEditMode ? "Sửa thông tin danh mục " : "Chi tiết danh mục"}</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <div className="form-group mb-2">
                        <label>Tên</label>
                        {isEditMode ? (
                            <input
                                className="form-control"
                                value={selectedcategory.name}
                                onChange={(e) =>
                                    setSelectedcategory({ ...selectedcategory, name: e.target.value })
                                }
                            />
                        ) : (
                            <div>{selectedcategory.name || "Trống"}</div>
                        )}
                    </div>
                    <div className="form-group mb-2">
                        <label>Mô tả</label>
                        {isEditMode ? (
                            <textarea
                                className="form-control"
                                value={selectedcategory.description}
                                onChange={(e) =>
                                    setSelectedcategory({ ...selectedcategory, description: e.target.value })
                                }
                            />
                        ) : (
                            <div>{selectedcategory.description || "Trống"}</div>
                        )}
                    </div>
                    <div className="form-group mb-2">
                        <label>Ngày tạo</label>
                        {isEditMode ? (
                            <input
                                className="form-control"
                                value={selectedcategory.createdAt}
                                readOnly
                            />
                        ) : (
                            <div>{selectedcategory.createdAt || "Trống"}</div>
                        )}
                    </div>
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={() => setShowModal(false)}>
                        Đóng
                    </Button>
                    {isEditMode && (
                        <Button variant="primary" >
                            Lưu
                        </Button>
                    )}
                </Modal.Footer>
            </Modal>
        </>

    );
}

export default RevenueReport;
