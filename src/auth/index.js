import { API } from "./../backend";
// const API = "http://f730-2402-3a80-1b9e-a432-c197-d45e-bd0f-fe5d.ngrok.io/api";
// API means : http://localhost:8000/api/

export const signup = (user) => {
    console.log(user);
    return fetch(`${API}/signup/`,{
        method: "POST",
        headers: {
            
            Accept: "application/json",
           
        },
        body: user
    })
    .then(response => {
        return response.json();
    })
    .catch(err => console.log(err));
}

export const signin = (user) => {
    console.log(user)
    return fetch(`${API}/signin/`,{
        method: "POST",
        headers: {
            Accept: "application/json",
            "Content-Type": "application/json"
        },
        body: JSON.stringify(user)
    })
    .then(response => {
        console.log("I am in response")
        console.log(response);
        return response.json();
    })
    .catch(err => {
        console.log("I am in catch block") 
        console.log(err)});
};


export const authenticate = (data, next) => {
    if(typeof window !== "undefined"){
        localStorage.setItem("token", JSON.stringify(data.token))
        next();
    }
}

export const signout = next => {
    if(typeof window !== "undefined"){
        localStorage.removeItem("token")
        next();

        return fetch(`${API}/signout`,{
            method: "GET"
        })
        .then(response => console.log("signout success"))
        .catch(err => {
                 
            console.log(err)
        })
    }
}

export const isAutheticated = () => {
    if(typeof window == "undefined"){
       return false;
    }
    if(localStorage.getItem("token")){
        return JSON.parse(localStorage.getItem("token"));
    }
    else{
        return false;
    }
}