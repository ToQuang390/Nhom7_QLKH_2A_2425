import { authHeader } from "../utils/authHeader";

import { API_DOMAIN } from "../constant/URL";


export const getListInfoDashboard =async ()=>{
    const response = await fetch(API_DOMAIN + "dashboard/counts", {
        headers: authHeader(),
      });
        const result= await response.json();
        return result;
}


export const getListInfoLowStock =async ()=>{
    const response= await  fetch(API_DOMAIN+"dashboard/low-stock", {
        headers: authHeader(),
      });
        const result= await response.json();
        return result;
}

export const addCategory = async (options) => {// truyền 1 data
    const response = await fetch(API_DOMAIN+"category", {
        method: "POST",
        headers:authHeader(),
        body: JSON.stringify(options)
    })
    const result = await response.json();
    return result;
}

export const updateCategory= async (options) => {// truyền 1 data
    const response = await fetch(API_DOMAIN+"category", {
        method: "PUT",
        headers: {
            Accept: "application/json",
            "Content-Type": "application/json"
        },
        body: JSON.stringify(options)
    })
    const result = await response.json();
    return result;
}
export const deleteCategory = async (id) => {
    const response = await fetch(`${API_DOMAIN}category/${id}`, {
        method: "DELETE"
    });
    const result = await response.json();
    return result;
}
