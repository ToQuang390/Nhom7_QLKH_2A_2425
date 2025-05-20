import { authHeader } from "../utils/authHeader";

import { API_DOMAIN } from "../constant/URL";


export const getListUnit=async ()=>{
    const response= await  fetch(API_DOMAIN+"unit",{
        headers:authHeader()
    });
        const result= await response.json();
        return result;
}

export const addUnit = async (options) => {// truyền 1 data
    const response = await fetch(API_DOMAIN+"unit", {
        method: "POST",
        headers: authHeader(),
        body: JSON.stringify(options)
    })
    const result = await response.json();
    return result;
}

export const updateUnit= async (options) => {// truyền 1 data
    const response = await fetch(API_DOMAIN+"unit", {
        method: "PUT",
        headers: authHeader(),
        body: JSON.stringify(options)
    })
    const result = await response.json();
    return result;
}

export const deleteUnit = async (id) => {
    const response = await fetch(`${API_DOMAIN}unit/${id}`, {
        method: "DELETE",
        headers:authHeader()
    });
    const result = await response.json();
    return result;
}
