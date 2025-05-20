import React from "react";
import "../assets/css/header.css";
function Header() {

const userJson = localStorage.getItem("infoUser");
const user = userJson ? JSON.parse(userJson) : null;

    return (
        <>
            <div className="header">
              <div className="profile">
                {/* <img src="https://danhgiaxe.edu.vn/upload/2024/12/tong-hop-50-hinh-anh-avatar-anh-gai-dep-de-thuong-nhat-13.webp"/> */}
                <h7>Xin chào, {user?.username || ""}</h7>
              </div>
            </div>
        </>
    );
}

export default Header;
