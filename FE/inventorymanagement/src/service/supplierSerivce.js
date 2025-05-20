import { authHeader } from "../utils/authHeader";

import { API_DOMAIN } from "../constant/URL";


export const getListSupplier =async ()=>{
    const response= await  fetch(API_DOMAIN+"supplier",{
        headers:authHeader()
    });
        const result= await response.json();
        return result;
}
export const getListPageSupplier =async (currentPage,size,search)=>{
    const response= await  fetch(API_DOMAIN+`supplier/list?page=${currentPage}&size=${size}&search=${encodeURIComponent(search)}`,{
        headers:authHeader()
    });
        const result= await response.json();
        return result;
}

export const addSupplier = async (options) => {// truyền 1 data
    const response = await fetch(API_DOMAIN+"supplier", {
        method: "POST",
        headers: authHeader(),
        body: JSON.stringify(options)
    })
    const result = await response.json();
    return result;
}

export const updateSupplier= async (options) => {// truyền 1 data
    const response = await fetch(API_DOMAIN+"supplier", {
        method: "PUT",
        headers:authHeader(),
        body: JSON.stringify(options)
    })
    const result = await response.json();
    return result;
}
export const deleteSupplier = async (id) => {
    const response = await fetch(`${API_DOMAIN}supplier/${id}`, {
        method: "DELETE",
        headers:authHeader()
    });
    const result = await response.json();
    return result;
}
