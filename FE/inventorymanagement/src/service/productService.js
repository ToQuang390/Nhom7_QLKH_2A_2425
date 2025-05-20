import { authHeader } from "../utils/authHeader";
import { API_DOMAIN } from "../constant/URL";


export const getListProduct =async ()=>{
    const response= await  fetch(API_DOMAIN+"product",{
        headers:authHeader()
    });
        const result= await response.json();
        return result;
}
export const getListPageProduct =async (currentPage,size,search)=>{
    const response= await  fetch(API_DOMAIN+`product/list?page=${currentPage}&size=${size}&search=${encodeURIComponent(search)}`,{
        headers:authHeader()
    });
        const result= await response.json();
        return result;
}
export const addProduct = async (options) => {// truyền 1 data
    const response = await fetch(API_DOMAIN+"product", {
        method: "POST",
        headers: authHeader(),
        body: JSON.stringify(options)
    })
    const result = await response.json();
    return result;
}

export const updateProduct= async (options) => {// truyền 1 data
    const response = await fetch(API_DOMAIN+"product", {
        method: "PUT",
        headers: authHeader(),
        body: JSON.stringify(options)
    })
    const result = await response.json();
    return result;
}
export const deleteProduct = async (id) => {
    const response = await fetch(`${API_DOMAIN}product/${id}`, {
        method: "DELETE",
        headers:authHeader()
    });
    const result = await response.json();
    return result;
}
