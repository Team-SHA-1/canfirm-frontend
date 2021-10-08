import { API } from "../backend";
// const API = "http://f730-2402-3a80-1b9e-a432-c197-d45e-bd0f-fe5d.ngrok.io/api";



export const getData = () => {
//   return fetch("url")
//   .then(response => {
//     return response.json()
// })
// .catch(err => console.log(err));

return {

   "data0" : "Name",
   "data1" : "Montly_Income",
   "data2" : "DOB"  ,
   "data3" : "Nationality",
   "data4" : "Email",
"data5" : "Profession",
"data6" :  "Account_Number"

}

}

export const twofactorAuth = (token, data) => {
  
    return fetch(`${API}/camera/`,{
    method: "POST",
    headers: {
      Accept: "application/json",
      Authorization: `Token ${token}`
    },
           body: data
  })
  .then(response => {
    return response.json()
})
.catch(err => console.log(err));
};


