import React, { useState } from "react";
import '../assets/css/LoginPage.css';
import { CheckLogin, ResetPassword } from "../service/LoginService";
import { jwtDecode } from "jwt-decode";
import { useNavigate } from "react-router-dom";
const LoginPage = () => {
    const [email, setEmail] = useState("");
    
    const [err, setError] = useState("");
    const navigate = useNavigate();

    const handleReset = async (e) => {
        e.preventDefault();
        try {
            const response = await ResetPassword(email);
            if(response.status===404 ||response.success===false){
                    setError("Mật khẩu mới đã được gửi vào email của bạn")
            }else{
               setError("Mật khẩu mới đã được gửi vào email của bạn");
            }
        } catch (error) {
            alert("Email không đúng!");
        }
    };
    return (
        <div className="loginpage">
            <div className="container" role="main" aria-label="Warehouse Management System login page">
                <div className="logo" aria-hidden="true">
                    <svg viewBox="0 0 64 64" aria-hidden="true" focusable="false" xmlns="http://www.w3.org/2000/svg">
                        <path d="M2 20 L32 2 L62 20 V58 H2 V20 Z M10 58 V30 H54 V58 H10 Z" />
                    </svg>
                    <h1>WarehouseMS</h1>
                </div>
                <div className="login-card" role="form" aria-labelledby="login-title">
                    <h2 id="login-title">Khôi phục mật khẩu </h2>
                    <form onSubmit={handleReset} aria-describedby="login-desc" noValidate>
                        <label htmlFor="email">Email người dùng</label>
                        <input
                            type="text"
                            id="email"
                            name="email"
                            placeholder="Địa chỉ email "
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            required
                            autoComplete="username"
                            aria-required="true"
                        />
                        <span className="error">{err}</span>
                        <button type="submit">Cấp lại mật khẩu</button>
                        <a href={"/login"}>Quay lại</a>
                    </form>
                    <p id="login-desc" className="footer-text">
                        Quản lý kho hàng hiệu quả, nhanh chóng và an toàn.
                    </p>
                </div>
            </div>
        </div>

    );
};

export default LoginPage;
