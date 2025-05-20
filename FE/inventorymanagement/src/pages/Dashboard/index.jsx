import React, { useEffect, useState } from "react";
import "../../assets/css/dashboard.css";
import { Bar } from "react-chartjs-2";
import { Chart as ChartJS, BarElement, CategoryScale, LinearScale } from "chart.js";
import { getListInfoDashboard, getListInfoLowStock } from "../../service/DashboardService";

ChartJS.register(BarElement, CategoryScale, LinearScale);

function Dashboard() {

    const [info,setInfor] =useState();
    const [datastock,setDataStock] =useState([]);
    
    useEffect(() => {
        const fetchApi = async () => {
            try {
                const response = await getListInfoDashboard();
                setInfor(response);
            } catch (error) {
                console.error("Lỗi khi gọi API Dashboard:", error);
            }
        };
        fetchApi();
    }, []);

    useEffect(() => {
        const fetchApi = async () => {
            try {
                const response = await getListInfoLowStock();
                setDataStock(response);
            } catch (error) {
                console.error("Lỗi khi gọi API Dashboard:", error);
            }
        };
        fetchApi();
    }, []);


    // Dữ liệu giả cho tồn kho
    const data = {
        labels: datastock.map(item => item.productName),
        datasets: [
            {
                label: 'Số lượng trong kho',
                data: datastock.map(item => item.quantity),
                backgroundColor: '#0d6efd',
            },
        ],
    };

    const options = {
        responsive: true,
        plugins: {
            tooltip: {
                callbacks: {
                    label: function(context) {
                        return `${context.dataset.label}: ${context.parsed.y} sản phẩm`;
                    }
                }
            },
            legend: {
                display: false,
            },
        },
        scales: {
            y: {
                beginAtZero: true,
            },
        },
    };

    return (
        <>
            <nav
                style={{
                    "--bs-breadcrumb-divider": `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='8' height='8'%3E%3Cpath d='M2.5 0L1 1.5 3.5 4 1 6.5 2.5 8l4-4-4-4z' fill='%236c757d'/%3E%3C/svg%3E")`,
                }}
                aria-label="breadcrumb"
            >
                <ol className="breadcrumb">
                    <li className="breadcrumb-item">
                        <h6>Trang chủ</h6>
                    </li>
                   
                </ol>
            </nav>
            <div className="dashboard container mt-4">
                <div className="row g-3">
                    <div className="col-3">
                        <div className="box box-blue">
                            <i className="bi bi-box icon"></i>
                            <p>Tổng số sản phẩm</p>
                            <h3>{info?.getTotalProducts ?? 0}</h3>
                        </div>
                    </div>
                    <div className="col-3">
                        <div className="box box-green">
                            <i className="bi bi-tags icon"></i>
                            <p>Tổng số danh mục</p>
                            <h3>{info?.getTotalCategories ?? 0}</h3>
                        </div>
                    </div>
                    <div className="col-3">
                        <div className="box box-yellow">
                            <i className="bi bi-truck icon"></i>
                            <p>Tổng số nhà cung cấp</p>
                            <h3>{info?.getTotalSuppliers ?? 0}</h3>
                        </div>
                    </div>
                    <div className="col-3">
                        <div className="box box-red">
                            <i className="bi bi-exclamation-triangle icon"></i>
                            <p>Sản phẩm sắp hết hàng</p>
                            <h3>{info?.getLowStockProducts ?? 0}</h3>
                        </div>
                    </div>
                </div>

                {/* Biểu đồ tồn kho */}
                <div className="row mt-5">
                    <div className="col-12">
                        <h5 className="mb-3">Biểu đồ tồn kho</h5>
                        <div className="chart-container">
                            <Bar data={data} options={options} />
                        </div>
                    </div>
                </div>


            </div>
        </>

    );
}

export default Dashboard;
