import { authHeader } from "../utils/authHeader";

import { API_DOMAIN } from "../constant/URL";

export const getListCustomer =async ()=>{
    const response= await  fetch(API_DOMAIN+"customer",{
        headers:authHeader()
    });
        const result= await response.json();
        return result;
}

export const getListPageCustomer =async (currentPage,size,search)=>{
    const response= await  fetch(API_DOMAIN+`customer/list?page=${currentPage}&size=${size}&search=${encodeURIComponent(search)}`,{
        headers:authHeader()
    });
        const result= await response.json();
        return result;
}


export const addCustomer = async (options) => {// truyền 1 data
    const response = await fetch(API_DOMAIN+"customer", {
        method: "POST",
        headers:authHeader(),
        body: JSON.stringify(options)
    })
    const result = await response.json();
    return result;
}

export const updateCustomer= async (options) => {// truyền 1 data
    const response = await fetch(API_DOMAIN+"customer", {
        method: "PUT",
        headers: authHeader(),
        body: JSON.stringify(options)
    })
    const result = await response.json();
    return result;
}
export const deleteCustomer = async (id) => {
    const response = await fetch(`${API_DOMAIN}customer/${id}`, {
        method: "DELETE",
        headers:authHeader()
    });
    const result = await response.json();
    return result;
}
