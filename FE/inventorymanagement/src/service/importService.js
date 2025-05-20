import { authHeader } from "../utils/authHeader";
import { API_DOMAIN } from "../constant/URL";


export const getListImport =async ()=>{
    const response= await  fetch(API_DOMAIN+"import",{
        headers:authHeader()
    });
        const result= await response.json();
        return result;
}

export const getListPageImport = async (currentPage, size, search = "", from = null, to = null) => {
    const toDate = to ?? new Date().toISOString().split("T")[0]; // Nếu to = null thì lấy ngày hôm nay
    const response = await fetch(API_DOMAIN + 
        `import/list?page=${currentPage}&size=${size}&search=${search}&from=${from}&to=${toDate}`, {
        headers: authHeader(),
        method: "GET"
    });
    const result = await response.json();
    return result;
};

export const addImport = async (options) => {
    const response = await fetch(API_DOMAIN+"import", {
        method: "POST",
        headers: authHeader(),
        body: JSON.stringify(options)
    })
    const result = await response.json();
    return result;
}

export const updateImport= async (options) => {
    const response = await fetch(API_DOMAIN+"import", {
        method: "PUT",
        headers: authHeader(),
        body: JSON.stringify(options)
    })
    const result = await response.json();
    return result;
}
export const deleteImport = async (id) => {
    const response = await fetch(`${API_DOMAIN}import/${id}`, {
        method: "DELETE",
        headers:authHeader()
    });
    const result = await response.json();
    return result;
}
