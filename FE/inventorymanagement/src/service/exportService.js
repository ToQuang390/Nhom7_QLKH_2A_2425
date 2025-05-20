import { authHeader } from "../utils/authHeader";

import { API_DOMAIN } from "../constant/URL";


export const getListExport =async ()=>{
    const response= await  fetch(API_DOMAIN+"export",{
        headers:authHeader()
    });
        const result= await response.json();
        return result;
}

export const getListPageExport = async (currentPage, size, search = "", from = null, to = null) => {
    const toDate = to ?? new Date().toISOString().split("T")[0]; // Nếu to = null thì lấy ngày hôm nay
    const response = await fetch(API_DOMAIN + 
        `export/list?page=${currentPage}&size=${size}&search=${search}&from=${from}&to=${toDate}`, {
        headers: authHeader(),
        method: "GET"
    });
    const result = await response.json();
    return result;
};

export const getListPageCustomer =async (currentPage,size)=>{
    const response= await  fetch(API_DOMAIN+`customer/list?page=${currentPage}&size=${size}`,{
        headers:authHeader()
    });
        const result= await response.json();
        return result;
}


export const addExport = async (options) => {// truyền 1 data
    const response = await fetch(API_DOMAIN+"export", {
        method: "POST",
        headers: authHeader(),
        body: JSON.stringify(options)
    })
    const result = await response.json();
    return result;
}

export const updateExport= async (options) => {// truyền 1 data
    const response = await fetch(API_DOMAIN+"export", {
        method: "PUT",
        headers: authHeader(),
        body: JSON.stringify(options)
    })
    const result = await response.json();
    return result;
}
export const deleteExport = async (id) => {
    const response = await fetch(`${API_DOMAIN}export/${id}`, {
        method: "DELETE",
        headers:authHeader()
    });
    const result = await response.json();
    return result;
}
