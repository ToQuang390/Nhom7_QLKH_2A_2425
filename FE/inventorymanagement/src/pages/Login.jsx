import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "../assets/css/login.css";
import logo from "../assets/image/logostock.png";
import { CheckLogin } from "../service/LoginService";
import { jwtDecode } from "jwt-decode";

function Login() {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [err,setError]=useState("");
    const navigate = useNavigate();

    // const tokenAvaiable = localStorage.getItem("token");

    // if(tokenAvaiable){
    //     navigate("/");
    // }

    const handleLogin = async (e) => {
        e.preventDefault();
        try {
            const response = await CheckLogin({ email, password });
            if(response.status==404 ||response.success==false){
                    setError("Tài khoản hoặc mật khẩu không đúng!")
            }else{
                const token = response.data;
                // Lưu token vào localStorage
                if (token) {
                    localStorage.setItem("token", token);
                    const decoded = jwtDecode(token);
                    localStorage.setItem("infoUser", JSON.stringify(decoded));
                    navigate("/");
                }
            }
        } catch (error) {
            alert("Email hoặc mật khẩu không đúng!");
        }
    };

    return (
        <>
            <div className="login">
                <div className="container-fluid">
                    <div className="row">
                        <div className="col-6">
                            <div className="login_content-left">
                                <div className="image_login">
                                    <img src={logo} alt="Login image" class="w-100 vh-100" />
                                </div>
                            </div>
                        </div>
                        <div className="col-6">
                            <div className="login_content-left">
                                <div className="login_title">
                                    <h2>Hệ thống quản lý kho</h2>
                                </div>
                                <div className="login_form">
                                    <form id="form_login" onSubmit={handleLogin}>
                                        <input
                                            type="text"
                                            placeholder="Email"
                                            value={email}
                                            onChange={(e) => setEmail(e.target.value)}
                                        />
                                        <input
                                            type="password"
                                            placeholder="Password"
                                            value={password}
                                            onChange={(e) => setPassword(e.target.value)}
                                        />
                                        <span className="error">{err}</span>
                                        <button
                                            type="submit"
                                            className="btn btn-info btn-lg btn-block"
                                        >
                                            Login
                                        </button>
                                        <a href={"/reset"}>Quên mật khẩu?</a>
                                    </form>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
}

export default Login;
