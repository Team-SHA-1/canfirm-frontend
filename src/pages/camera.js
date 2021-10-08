import React, { useState, useRef,useEffect } from "react";
import { Link, Redirect  , useLocation } from "react-router-dom";
import { getData ,twofactorAuth } from "../auth/cameraapicalls";
import { isAutheticated } from "../auth/index";
import "./css/camera.css"
import logo from "../assets/images/Canfirm_Logo_white.png"


const Camera = () => {


  const token = isAutheticated();
    const [values, setValues] = useState({
    error  : false,
    Image : "",
    loading: false,
    getaRedirect: false,
    formData: new FormData(),
  });

  const {
    Image,
   error,
    loading,
    
    getaRedirect,
    formData
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
let neededAtri = getData();
for (const property in neededAtri) {
  formDataToUpload.append(property,neededAtri[property]);
  console.log(`${property}: ${neededAtri[property]}`);
}
//formDataToUpload.append("data0", "DOB");
formDataToUpload.append("WebsiteName", "http://0491-27-62-190-125.ngrok.io");
formDataToUpload.append("WebsiteToken", "59e19187-6efb-4c0f-bc05-fbc0559096b1");
  
        setValues({...values, [Image]: picture})

        twofactorAuth( token,formDataToUpload)
        .then(data => {
          console.log(data);
          console.log(typeof(data));
          if( data == "error")
          {
                 localStorage.removeItem("token");
                 alert("face doesn't matched , please sigin again !!");
                 setValues({...values,error: true});
          }
         else {
           localStorage.setItem("thirdparty" , JSON.stringify(data));
            setValues({...values, 
            Image: "",
          stock:"",
           loading: false, 
            
            getaRedirect: true
          }); 
          }
        })
       
    
  };

  const performRedirect = () => {
    // todo redirecyion here

    if (getaRedirect) {
     
        return <Redirect to="/thanks" />;
     
    }
    if(error)
    {
      return <Redirect to="/signin" />;
    }

  
  };

  return (
    <div className="bg-dark">

   
    <div >
    
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
  

  <div className="offcanvas offcanvas-end" tabindex="-1" id="offcanvasRight" aria-labelledby="offcanvasRightLabel">
    <div className="offcanvas-header">
      <h4 id="offcanvasRightLabel">Attribute List</h4>
      <button type="button" className="btn-close text-reset" data-bs-dismiss="offcanvas" aria-label="Close"></button>
    </div>

    <div className="offcanvas-body bg-dark text-light">
      <h5>Request From: AmexFund</h5> 
      <h6>http://127.0.0.1:5500/index.html</h6>
      <br/>
      <br/>
      <b>Following Attributes are Required:</b>
      <ul>
      <li>Age(Date of Birth)</li>
      <li>Profession</li>
      <li>Email</li>
      <li>Monthly Income</li>
      <li>Account Number</li>
      <li>Nationality</li>
     

    </ul>
    </div>
    
  </div>

    </div>
    {performRedirect()}
    </div>
  );

}



export default Camera;
