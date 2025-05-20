import React, { useEffect, useState } from "react";
import { Button, Card, CardBody, Col, Row } from "react-bootstrap";
import { getInfoMe, updateInfo } from "../../service/userService";
import { showError, showSuccess } from "../../utils/alert";
import "../../assets/css/userprofile.css";


function UserProfile() {

    const [name,setUserName]= useState("");
    const [email,setEmail]= useState("");
    const [phone,setPhone]= useState("");
    const [role,setRole]= useState("");

    const userJson = localStorage.getItem("infoUser");
    const user = userJson ? JSON.parse(userJson) : null;

    useEffect(()=>{

        const fetchApi= async()=>{
            const response =await getInfoMe(user.id);
            setUserName(response.username);
            setEmail(response.email);
            setPhone(response.phone);
            setRole(response.role);
        }
        fetchApi();

    },[])
    const handleSubmit= async(e)=>{
        e.preventDefault();
        try {
            const payload={
                username:name.trim(),
                email:email.trim(),
                phone:phone.trim()
            }
            console.log(payload);
            const response = await updateInfo(user.id,payload)
            if(response!=null){
                showSuccess("Cập nhật thông tin thành công!");
            }
            else{
                showError("Cập nhật thông tin thất bại");
            }
        } catch (error) {
            
        }
    }

    return (

        <>
            <div className="profileinfo">
                <div className="title-profile">
                    <h5>Thông tin cá nhân</h5>
                </div>
                <div className="row">
                    <div className="col-12">
                    <Card className=" shadow-sm bg-white rounded">
                    <CardBody>
                    <form onSubmit={handleSubmit}>
                        <label>Họ tên</label>
                        <input 
                        type="text"
                        value={name}
                        onChange={(e)=>setUserName(e.target.value)}
                        />

                        <label>Email</label>
                        <input 
                        type="email"
                        value={email}
                        onChange={(e)=>setEmail(e.target.value)}
                        />
                        <label>Số điện thoại</label>
                        <input 
                        type="text"
                        value={phone}
                        onChange={(e)=>setPhone(e.target.value)}
                        />
                        <label>Quyền</label>
                        <input 
                        type="text"
                        value={role}
                        readOnly
                        />
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
export default UserProfile;