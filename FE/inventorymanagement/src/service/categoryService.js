import { authHeader } from "../utils/authHeader";

import { API_DOMAIN } from "../constant/URL";


export const getListCategory =async ()=>{
    const response= await  fetch(API_DOMAIN+"category",{
        headers:authHeader()
    });
        const result= await response.json();
        return result;
}

export const addCategory = async (options) => {// truyền 1 data
    const response = await fetch(API_DOMAIN+"category", {
        method: "POST",
        headers: authHeader(),
        body: JSON.stringify(options)
    })
    const result = await response.json();
    return result;
}

export const updateCategory= async (options) => {// truyền 1 data
    const response = await fetch(API_DOMAIN+"category", {
        method: "PUT",
        headers:authHeader(),
        body: JSON.stringify(options)
    })
    const result = await response.json();
    return result;
}
export const deleteCategory = async (id) => {
    const response = await fetch(`${API_DOMAIN}category/${id}`, {
        method: "DELETE",
        headers:authHeader()
    });
    const result = await response.json();
    return result;
}
