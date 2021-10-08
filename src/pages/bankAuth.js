
import React, { useState, useRef,useEffect } from "react";
import { Link, Redirect ,useLocation } from "react-router-dom";
import { signup } from "../auth/index";
import "./css/camera.css"
import logo from "../assets/images/Canfirm_Logo_white.png"




const BankAuth = (props) => {


    // console.log(props.location.state);
  
    const [values, setValues] = useState({
    username : props.location.state.username,
    password : props.location.state.password,
    email : props.location.state.email,
    AccountNumber :props.location.state.AccountNumber,

    Image : "",
  
   
    getaRedirect: false,
   
  });

  const {
    username, email, password, AccountNumber,
    Image,
   
   
    
    getaRedirect,
   
  } = values;

  const cameraView = useRef(null);
  const beforeButtons = useRef(null);
  const afterButtons = useRef(null);
  const cameraSensor = useRef(null);
  const Loading = useRef(null);
  const location = useLocation();

  useEffect(() => {
      console.log('route has been changed');
     cameraStart();
  },[location.pathname]);

  useEffect(() => {
    // initiate the event handler
    window.addEventListener("load", cameraStart, false)
        
    // this will clean up the event every time the component is re-rendered
    return function cleanup() {
      window.removeEventListener("load",cameraStart)
    }
  })
  

  const cameraStart = () => {
    const  constraints = { video: {facingMode: "user" }, audio: false };
    navigator.mediaDevices
      .getUserMedia(constraints)
      .then(function (stream) {
       // track = stream.getTracks()[0];
        cameraView.current.srcObject = stream;
        cameraView.current.play();
      })
      .catch(function (error) {
        console.error("Oops. Something is broken.", error);
      });
  }
  
  
  const cameraTrigger =  () => {
    beforeButtons.current.style.display = "none";
    afterButtons.current.style.display= 'block';
    cameraSensor.current.width = cameraView.current.videoWidth;
    cameraSensor.current.height = cameraView.current.videoHeight;
    const ctx = cameraSensor.current.getContext("2d");
    
    ctx.drawImage(cameraView.current, 0, 0);
    cameraSensor.current.style.display = "block";
    cameraView.current.style.display = "none";
  };
  
  const cameraAnother =  () => {
    beforeButtons.current.style.display = "block";
    afterButtons.current.style.display = "none";
    cameraSensor.current.style.display = "none"
    cameraView.current.style.display = "block";
  };

 
  
  const cameraSend= (event) => {
    event.preventDefault();
    let picture = cameraSensor.current.toDataURL("image/jpeg", 1); //yeh variable mein path store kiya hai, yaha se bhejo backemd
    afterButtons.current.style.display = "none";
    Loading.current.style.display = "block";
var formDataToUpload = new FormData();
formDataToUpload.append("Image", picture);
formDataToUpload.append("username", username);
formDataToUpload.append("password", password);
formDataToUpload.append("AccountNumber", AccountNumber);
formDataToUpload.append("Image", picture);
formDataToUpload.append("email", email);



        console.log(username);
        console.log(AccountNumber);
        console.log(email);
        console.log(password);
        console.log(picture);
        setValues({...values, [Image]: picture})
         
        signup(formDataToUpload)
      .then((data) => {
        {
          console.log(data)
          setValues({...values, 
            Image: "",
          
            loading: false, 
             
             getaRedirect: true
           });
        }
      }).catch(console.log("ERROR in signup"));
      
        
       
    
  };

  const performRedirect = () => {
    // todo redirecyion here

    if (getaRedirect) {
     
        return <Redirect to="/signin" />;
     
    }

  
  };

  return (
    <div className="bg-dark">
    
       <main id="camera">
    <img id="logo" src={logo} alt="Canfirm Logo"/>
    <canvas ref={cameraSensor} id="camera--sensor"></canvas>
    <video id="camera--view" ref={cameraView}  playsInline ></video>

    <div className="container-fluid text-center" ref={beforeButtons}id="beforeTake">
      <button id="camera--trigger" onClick={cameraTrigger} type="button" className="btn btn-light">Take a picture</button>
      <button id="Attributes" className="btn btn-outline-light" type="button" data-bs-toggle="offcanvas" data-bs-target="#offcanvasRight"
      aria-controls="offcanvasRight">Check Attributes</button>
    </div>

    <div className="container-fluid text-center" ref={afterButtons} id="onTake">
      <button id="camera--another" onClick={cameraAnother} type="button" className="btn btn-outline-light">Take another picture</button>
      <button id="camera--send" onClick={cameraSend}type="button" className="btn btn-light">Proceed Verification</button>
    </div>
    <div id="Loading" ref={Loading} class=" container-fluid text-center" >
    <button  class="btn btn-outline-light" id="onSend" type="button" disabled>
        <span class="spinner-border text-light spinner-border-sm" role="status" aria-hidden="true"></span>
        Loading...
    </button>
    </div>
  </main>
  

       {performRedirect()}

    </div>
  );

}


export default BankAuth;

