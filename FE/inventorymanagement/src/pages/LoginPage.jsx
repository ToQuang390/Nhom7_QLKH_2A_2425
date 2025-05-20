import React, { useState } from "react";
import '../assets/css/LoginPage.css';
import { CheckLogin } from "../service/LoginService";
import { jwtDecode } from "jwt-decode";
import { useNavigate } from "react-router-dom";
const LoginPage = () => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [err, setError] = useState("");
    const navigate = useNavigate();

    const handleLogin = async (e) => {
        e.preventDefault();
        try {
        
            const response = await CheckLogin({ email, password });

            if (response.status == 404 || response.success == false) {
                setError("Tài khoản hoặc mật khẩu không đúng!")
            }
            else {
                const token = response.data;
                // Lưu token vào localStorage
                if (token) {
                    localStorage.setItem("token", token);
                    const decoded = jwtDecode(token);
                   if(decoded.active){
                    localStorage.setItem("infoUser", JSON.stringify(decoded));
                    navigate("/");
                   }
                   setError("Tài khoản tạm thời bị khóa!")
                }
            }
        } catch (error) {
            alert("Email hoặc mật khẩu không đúng!");
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
                    <h2 id="login-title">Đăng nhập quản lý kho hàng</h2>
                    <form onSubmit={handleLogin} aria-describedby="login-desc" noValidate>
                        <label htmlFor="email">Email </label>
                        <input
                            type="text"
                            id="email"
                            name="email"
                            placeholder="Nhập địa chỉ email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            required
                            autoComplete="username"
                            aria-required="true"
                        />

                        <label htmlFor="password">Mật khẩu</label>
                        <input
                            type="password"
                            id="password"
                            name="password"
                            placeholder="Nhập mật khẩu"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            required
                            autoComplete="current-password"
                            aria-required="true"
                        />
                        <span className="error">{err}</span>
                        <button type="submit">Đăng nhập</button>
                        <a href={"/reset"}>Quên mật khẩu?</a>
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
