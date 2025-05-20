import React, { useEffect, useState } from "react";
import { Button, Card, CardBody, Col, Row } from "react-bootstrap";
import { changepass, getInfoMe, updateInfo } from "../../service/userService";
import { showConfirm, showError, showSuccess } from "../../utils/alert";
import "../../assets/css/changepass.css";


function ChangePass() {


    const [passNew, setPassNew] = useState("");
    const [confirm, setconfirm] = useState("");

    const [notification, setnotification] = useState("");

    const userJson = localStorage.getItem("infoUser");
    const user = userJson ? JSON.parse(userJson) : null;

    const handleSubmit = async (e) => {

        e.preventDefault();

        if(passNew==="" && confirm ===""){
            setnotification("Vui lòng điền mật khẩu mới.");
            return;
        }

        if (passNew.toLowerCase() !== confirm.toLowerCase()) {
            setnotification("Mật khẩu không khớp");
            return;
        }
        try {
            const payload = {
                id: user.id,
                password: passNew.trim()
            };
            const result = await showConfirm("Bạn muốn  thay đổi mật khẩu?");
            if (result.isConfirmed) {
                const response = await changepass(payload);
                if (response.password != null) {
                    showConfirm()
                    showSuccess("Cập nhật thông tin thành công!");
                } else {
                    showError("Cập nhật thông tin thất bại");
                }
            } else {
            }
            
        } catch (error) {
            showError("Đã xảy ra lỗi. Vui lòng thử lại!");
        }
    }

    return (

        <>
            <div className="changepass">
                <div className="title">
                    <h5>Đổi mật khẩu</h5>
                </div>
                <div className="row">
                    <div className="col-12">
                        <Card className=" shadow-sm bg-white rounded">
                            <CardBody>
                                <form onSubmit={handleSubmit}>
                                    <label>Mật khẩu mới</label>
                                    <input
                                        type="text"
                                        value={passNew}
                                        onChange={(e) => setPassNew(e.target.value)}
                                    />
                                    <label>Nhập lại mật khẩu</label>
                                    <input
                                        type="text"
                                        value={confirm}
                                        onChange={(e) => setconfirm(e.target.value)}
                                    />
                                    <p>{notification}</p>
                                    <Button type="submit">Gửi</Button>
                                </form>
                            </CardBody>
                        </Card>
                    </div>
                </div>
            </div>
        </>
    );
}
export default ChangePass;