import React from "react";
import "../assets/css/sidebar.css";
import { Link, useNavigate } from "react-router-dom";
import { showConfirm } from "../utils/alert";
function Sidebar() {
    const navigate = useNavigate();
    const userJson = localStorage.getItem("infoUser");
    const user = userJson ? JSON.parse(userJson) : null;
    const isAdmin = user && user.role === "ADMIN";


    const handleLogout = async () => {
        const result = await showConfirm("Bạn muốn  đăng xuất?");
        if (result.isConfirmed) {
            localStorage.removeItem("token");
            localStorage.removeItem("infoUser");
            navigate("/login");
        }
    }
    return (
        <>
            <div class="sidebar">
                {/* <h4><i class="bi bi-speedometer2"></i> Dashboard</h4> */}
                <img src={"https://coderthemes.com/hyper/saas/assets/images/logo.png"} />
                <ul className="list-unstyled " id="menu__one">
                    <li><Link to={"/"}><i class="bi bi-speedometer2"></i> Trang chủ</Link></li>
                    <li>
                        <a
                            class="dropdown-toggle"
                            href="#ecommerceSubmenu"
                            data-bs-toggle="collapse"
                            aria-expanded="false"
                        >
                            <i class="bi bi-box"></i> Hàng hóa
                        </a>
                        <ul className="collapse list-unstyled submenu" id="ecommerceSubmenu">
                            <li className="menu__item" ><Link to="/products">Danh sách hàng hóa</Link></li>
                            <li className="menu__item"><Link to="/categorys">Danh mục</Link></li>
                            <li className="menu__item"><Link to="/unit">Đơn vị</Link></li>
                        </ul>
                    </li>
                    <li>
                        <a
                            className="dropdown-toggle"
                            href="#invoSubmenu"
                            data-bs-toggle="collapse"
                            aria-expanded="false"
                        >
                            <i class="bi bi-box-seam"></i> Kho
                        </a>
                        <ul className="collapse list-unstyled submenu" id="invoSubmenu">
                            <li className="menu__item"><Link to="/inventory">Hàng trong kho</Link></li>
                            <li className="menu__item"><Link to="/inventory/check">Kiểm kho</Link></li>
                        </ul>
                    </li>

                    <li>
                        <a
                            className="dropdown-toggle"
                            href="#transactionSubmenu"
                            data-bs-toggle="collapse"
                            aria-expanded="false"
                        >
                            <i class="bi bi-arrow-left-right"></i> Giao dịch
                        </a>
                        <ul className="collapse list-unstyled submenu" id="transactionSubmenu">
                            <li className="menu__item"><Link to="/inventory/imports">Nhập kho</Link></li>
                            <li className="menu__item"><Link to="/inventory/exports">Xuất kho</Link></li>
                        </ul>
                    </li>

                    <li><Link to="/supplier"><i class="bi-building"></i> Nhà cung cấp</Link></li>
                    <li><Link to="/customer"><i class="bi bi-people-fill"></i> Khách hàng</Link></li>

                    {isAdmin && (
                        <li><Link to="/staff"><i className="bi bi-person-badge"></i> Nhân viên</Link></li>
                    )}

                    {isAdmin && (
                        <li>
                            <a
                                className="dropdown-toggle"
                                href="#repoSubmenu"
                                data-bs-toggle="collapse"
                                aria-expanded="false"
                            >
                                <i className="bi bi-calendar-check"></i> Báo cáo
                            </a>
                            <ul className="collapse list-unstyled submenu" id="repoSubmenu">
                                <li className="menu__item"><Link to="/reports/revenue">Doanh thu - lợi nhuận</Link></li>
                                <li className="menu__item"><Link to="/reports/stock">Nhập - xuất - tồn</Link></li>
                            </ul>
                        </li>
                    )}
                    <li>
                        <a
                            className="dropdown-toggle"
                            href="#transactionSetting"
                            data-bs-toggle="collapse"
                            aria-expanded="false"
                        >
                            <i class="bi bi-gear"></i> Setting
                        </a>
                        <ul className="collapse list-unstyled submenu" id="transactionSetting">
                            <li className="menu__item"><Link to="/profile">Thông tin cá nhân</Link></li>
                            <li className="menu__item"><Link to="/changePass">Đổi mật khẩu</Link></li>
                        </ul>
                    </li>
                    <li onClick={() => handleLogout()}><Link><i className="bi bi-box-arrow-right" /> Đăng xuất</Link></li>

                </ul>
            </div>
        </>
    );
}

export default Sidebar;
