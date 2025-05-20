import { API_DOMAIN } from "../constant/URL";


export const CheckLogin = async (options) => {// truyền 1 data
    const response = await fetch(API_DOMAIN+"login/signin", {
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

export const ResetPassword = async (email) => {// truyền 1 data
    const response = await fetch(API_DOMAIN+`login/reset?email=${email}`, {
        method: "POST",
        headers: {
            Accept: "application/json",
            "Content-Type": "application/json"
        }
    })
    const result = await response.json();
    return result;
}

