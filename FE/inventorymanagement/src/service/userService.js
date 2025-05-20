import { authHeader } from "../utils/authHeader";


import { API_DOMAIN } from "../constant/URL";


export const getListUser =async ()=>{
    const response= await  fetch(API_DOMAIN+"users",{
        headers:authHeader()
    });
        const result= await response.json();
        return result;
}

export const addUser = async (options) => {// truyền 1 data
    const response = await fetch(API_DOMAIN+"users", {
        method: "POST",
        headers:authHeader(),
        body: JSON.stringify(options)
    })
    const result = await response.json();
    return result;
}

export const getInfoMe =async (id)=>{
    const response= await  fetch(API_DOMAIN+`users/${id}`,{
        headers:authHeader()
    });
        const result= await response.json();
        return result;
}
//update thông tin người dùng
export const updateInfo = async (id,user) => {// truyền 1 data
    const response = await fetch(API_DOMAIN+`users/${id}`, {
        method: "PATCH",
        headers: authHeader(),
        body: JSON.stringify(user)
    })
    const result = await response.json();
    return result;
}

//thay đổi mật khẩu
export const changepass = async (user) => {// truyền 1 data
    const response = await fetch(API_DOMAIN+`users/changepass`, {
        method: "PATCH",
        headers: authHeader(),
        body: JSON.stringify(user)
    })
    const result = await response.json();
    return result;
}


export const updateUser = async (options) => {// truyền 1 data
    const response = await fetch(API_DOMAIN+"users", {
        method: "PUT",
        headers: authHeader(),
        body: JSON.stringify(options)
    })
    const result = await response.json();
    return result;
}
export const deleteUser = async (id) => {
    const response = await fetch(`${API_DOMAIN}users/${id}`, {
        method: "DELETE",
        headers:authHeader()
    });
    const result = await response.json();
    return result;
}

