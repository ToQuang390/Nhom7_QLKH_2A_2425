import React, { useEffect, useRef, useState } from "react";
import Modal from 'react-bootstrap/Modal';
import { Link } from "react-router-dom";
import { Button, Table, Pagination, Toast, CardBody, Card } from "react-bootstrap";
import "../../assets/css/category.css"; // CSS tùy chỉnh nếu có
import { deleteCategory, getListCategory, updateCategory } from "../../service/categoryService";
import { getListInventoryReport, getListInventoryReportToPDF, getListRevenueReport } from "../../service/reportService";
import numeral from "numeral";
import iconbox from "../../assets/image/iconbox.png";
import { showConfirm, showError } from "../../utils/alert";


function StockReport() {

    const [report, setreport] = useState([]);
    const [showModal, setShowModal] = useState(false);
    const [selectedcategory, setSelectedcategory] = useState({});
    const [isEditMode, setIsEditMode] = useState(null);

    const [search, setSearch] = useState("");

    const [showToast, setShowToast] = useState(false);


    //Tìm kiếm
    const searchFromRef = useRef(null);
    const searchToRef = useRef(null);

    // Lấy dữ liệu báo cáo
    const fetchApi = async (year, month) => {
        if (!year || !month) {
            setreport([]); // Nếu không có year hoặc month thì hiển thị dữ liệu trống
            return;
        }
        const response = await getListInventoryReport(year, month);
        setreport(response);
    }

    useEffect(() => {
        fetchApi(); // Ban đầu không gọi API nếu không có year hoặc month
    }, []);

    const hanldeSearch = () => {
        const fromDate = searchFromRef.current.value; // "2025-05-01"
        const toDate = searchToRef.current.value;     // "2025-05-10"
    
        if (!fromDate || !toDate) return;
    
        const year = fromDate.split("-")[0];
        const month = fromDate.split("-")[1];
    
        fetchApi(fromDate, toDate);
    };


    const hanldeToPDF = async() => {
        const confirmResult = await showConfirm("Bạn muốn xuất file pdf chứ?");
       if(confirmResult.isConfirmed) {
        const searchValue = searchFromRef.current.value; 
        const toDate = searchToRef.current.value;   
        if (!searchValue||!toDate){
            showError("Vui lòng chọn ngày tháng");
        }else{
            try {
                await getListInventoryReportToPDF(searchValue, toDate);
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
                                <h5 className="page-title">Báo cáo nhập xuất tồn </h5>
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
                                                    <label htmlFor="inputPassword2" >From</label>
                                                    <input type="date" className="form-control" id="inputPassword2" ref={searchFromRef} placeholder="Search..." />
                                                </div>
                                                <div className="col-auto">
                                                    <label htmlFor="inputPassword2" >To</label>
                                                    <input type="date" className="form-control" id="inputPassword2" ref={searchToRef} placeholder="Search..." />
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
                                                <th>STT</th>
                                                <th>Code </th>
                                                <th>Tên </th>
                                                <th>Tồn đầu kì</th>
                                                <th>Tổng nhập</th>
                                                <th>Tổng xuất</th>
                                                <th>Kiểm kê</th>
                                                <th>Tồn cuối kì</th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            {report.length === 0 ? (
                                                <tr>
                                                    <td colSpan="8" className="text-center">
                                                        <img src={iconbox} alt="ảnh icon box" />
                                                    <br></br> Không có dữ liệu
                                                        </td>
                                                </tr>
                                            ) : (
                                                report.map((item, index) => (
                                                    <tr key={item.productId}>
                                                        <td>{index+1}</td>
                                                        <td>{item.productCode || 0}</td>
                                                        <td>{item.productName || 0}</td>
                                                        <td>{item.beginQuantity || 0}</td>
                                                        <td>{item.totalImport || 0}</td>
                                                        <td>{item.totalExport || 0}</td>
                                                        <td>{item.totalAdjust || 0}</td>
                                                        <td>{item.finalQuantity || 0}</td>
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


            

        </>

    );
}

export default StockReport;
