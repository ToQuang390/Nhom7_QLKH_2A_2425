import { authHeader } from "../utils/authHeader";

import { API_DOMAIN } from "../constant/URL";

//báo cáo doanh thu lợi nhuận
export const getListRevenueReport =async (year, month)=>{
    const response= await  fetch(API_DOMAIN+`reports/by-month?year=${year}&month=${month}`,{
        headers:authHeader()
    });
        const result= await response.json();
        return result;
}

export const getListRevenueReportToPDF =async (year, month)=>{
    const response= await  fetch(API_DOMAIN+`reports/by-monthToPDF?year=${year}&month=${month}`,{
        headers:authHeader()
    });
    if (!response.ok) {
        throw new Error("Tải file thất bại");
    }

    const blob = await response.blob(); 

    const fileName = `bao-cao-doanh-thu-${month}-${year}.pdf`;
    const url = window.URL.createObjectURL(blob);
  
    const a = document.createElement("a");
    a.href = url;
    a.download = fileName;
    document.body.appendChild(a);
    a.click();
    a.remove();

    window.URL.revokeObjectURL(url);
}


//báo cáo doanh thu xuất nhập tồn
export const getListInventoryReport =async (fromDate, toDate)=>{
    const response= await  fetch(API_DOMAIN+`reports/inventory?from=${fromDate}&to=${toDate}`,{
        headers:authHeader()
    });
    const result= await response.json();
    return result;
}

export const getListInventoryReportToPDF =async (fromDate, toDate)=>{
    const response= await  fetch(API_DOMAIN+`reports/inventoryToPDF?from=${fromDate}&to=${toDate}`,{
        headers:authHeader()
    });
    if (!response.ok) {
        throw new Error("Tải file thất bại");
    }

    const blob = await response.blob(); 

    const fileName = `bao-cao-nhap-xuat-ton-${fromDate}-${toDate}.pdf`;
    const url = window.URL.createObjectURL(blob);
  
    const a = document.createElement("a");
    a.href = url;
    a.download = fileName;
    document.body.appendChild(a);
    a.click();
    a.remove();

    window.URL.revokeObjectURL(url);
}





export const addCheckInventory = async (options) => {// truyền 1 data
    const response = await fetch(API_DOMAIN+"inventorycheck", {
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
        headers: authHeader(),
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
