import React from "react";
import { Outlet } from "react-router-dom";


import "../assets/css/layoutadmin.css";
import Header from "../components/Header";
import Sidebar from "../components/Sidebar";

function LayoutAdmin() {
    return (
        <div className="layout__admin ">
            <Sidebar />
            <div className="layout__body" >
                <div className="layout__header">
                    <Header />
                </div>
                <div className="layout__content">
                    <Outlet />
                </div>
            </div>
        </div>
    );
}

export default LayoutAdmin;
