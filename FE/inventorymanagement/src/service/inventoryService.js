import { authHeader } from "../utils/authHeader";

import { API_DOMAIN } from "../constant/URL";



export const getListInventory =async ()=>{
    const response= await  fetch(API_DOMAIN+"inventory",{
        headers:authHeader()
    });
        const result= await response.json();
        return result;
}

export const searchInventory=async (year,month)=>{
    const response= await  fetch(API_DOMAIN+`inventorycheck/search?year=${year}&month=${month}`,{
        headers:authHeader()
    });
    const result= await response.json();
        return result;
      
}

export const getListInventoryPage =async (currentPage,size,search)=>{
    const response= await  fetch(API_DOMAIN+`inventory/listpage?page=${currentPage}&size=${size}&search=${encodeURIComponent(search)}`,{
        headers:authHeader()
    });
        const result= await response.json();
        return result;
}

export const getListProductInventory =async ()=>{
    const response= await  fetch(API_DOMAIN+"inventory/listproduct",{
        headers:authHeader()
    });
        const result= await response.json();
        return result;
}


export const getInventoryCheck =async ()=>{
    const response= await  fetch(API_DOMAIN+"inventorycheck",{
        headers:authHeader()
    });
        const result= await response.json();
        return result;
}


export const getListPageInventory =async (currentPage,size)=>{
    const response= await  fetch(API_DOMAIN+`customer/list?page=${currentPage}&size=${size}`,{
        headers:authHeader()
    });
        const result= await response.json();
        return result;
}


export const addInventory = async (options) => {// truyền 1 data
    const response = await fetch(API_DOMAIN+"inventory", {
        method: "POST",
        headers: {
            Accept: "application/json",
            "Content-Type": "application/json"
        },
        body: JSON.stringify(options)
    })
    const result = await response.json();
    return result;
}


