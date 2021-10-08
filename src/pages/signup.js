import React, { useState } from "react";
import "./css/signup.css"
import { Redirect} from "react-router-dom";
import icon1 from "../assets/icons/1.png" 
import icon2 from "../assets/icons/2.png" 
import icon3 from "../assets/icons/3.png"
import logo from "../assets/images/Canfirm_Logo_white.png" 

const Signup = () => {
  
  
    const [values, setValues] = useState({
    username: "",
    email: "",
    password: "",
    AccountNumber : "",
    error: "",
    getaRedirect : false,
    success: false,
  });

  const { username, email, password, AccountNumber ,getaRedirect,error, success } = values;

  const handleChange = (name) => (event) => {
    setValues({ ...values, error: false, [name]: event.target.value });
  };
  
  const doThat = () =>{
    if(getaRedirect)
    return <Redirect to={{ pathname: "/bankAuth", state: {...values} }}/>;
    else
    return;
  }
  const onSubmit = (event) => {
    event.preventDefault();
    setValues({ ...values, error: false, getaRedirect : true });
    

   

  
  };

  const signUpForm = () => {
    return (
    

      <div className="container-fluid bg-dark text-white">
      <img id="logo" src={logo} alt="Canfirm Logo" />
      <div className="row " id="signupRow">
        <div id="info" className="col-md-7">
          <h1>Why Use Canfirm?</h1>
          <p><img className="reasons" src={icon1} alt="Authentic Data" />
          Services Provided on Authentic and Credible Data</p>
         
          <p><img className="reasons" src={icon2} alt="Selective Attributes" />
          Selective Identity Attributes are shared, Securing Sensitive Info.</p>
        
          <p><img className="reasons" src={icon3} alt="Facial Recognition" />
          Facial Recognition as Two Factor Authentication to Counter
          Impersonation</p>
          <p>and many more other benefits like curated content for users, increased
          online freedom and anonimity. Also, you get offers as you use this
          authentication service!</p>
        </div>
        <div className="col d-flex align-items-center justify-content-center">
          <form>
            <h3>Sign Up</h3>
            <div className="mb-3">
              <label htmlFor="InputEmail" className="form-label">Email address</label>
              <input
                type="email"
                className="form-control"
                onChange={handleChange("email")}
                value={email}
                id="InputEmail"
                aria-describedby="emailHelp"
              />
              <div id="emailHelp" className="form-text">
                We'll never share your email with anyone else.
              </div>
            </div>
            <div className="mb-3">
              <label htmlFor="InputUsername" className="form-label">Username</label>
              <input
                type="text"
                onChange={handleChange("username")}
                value={username}
                className="form-control"
                id="InputUsername"
                aria-describedby="UsernameHelp"
              />
              <div id="UsernameHelp" className="form-text">
                Try to create a new username that you don't use at other places.
              </div>
            </div>
            <div className="mb-3">
              <label htmlFor="exampleInputPassword1" className="form-label"
                >Password</label
              >
              <input
                type="password"
                onChange={handleChange("password")}
                value={password}
                className="form-control"
                id="InputPassword"
                aria-describedby="PasswordHelp"
              />
              <div id="PasswordHelp" className="form-text">
                Use a Strong Password.
              </div>
            </div>

            <div className="mb-3">
              <label htmlFor="InputAccNo" className="form-label"
                >Bank Account Number</label
              >
              <input
                type="text"
                onChange={handleChange("AccountNumber")}
                value={AccountNumber}
                className="form-control"
                id="InputAccNo"
                aria-describedby="AccNoHelp"
              />
              <div id="AccNoHelp" className="form-text">
                Your face will be verified against the account holder.
              </div>
            </div>

            <div className="d-grid col-6 mx-auto py-3">
              <button type="submit" onClick={onSubmit} className="btn btn-primary" type="button">
                <b>Sign Up</b>
              </button>
            </div>
            <h6 className="text-center mt-4">
              Already have an account? <a href="http://localhost:3000/signin">Sign In</a>
            </h6>
            <hr />
            <p className="text-center mt-2" id="team_name">
              Developed by <a href="https://team-sha-1.github.io/Team_Website/index.html">Team SHA-1</a>
            </p>
          </form>
        </div>
      </div>
    </div>
    );
  };



  return (
   <div>
      
      {signUpForm()}
      {doThat()}
      {/* <p className="text-black text-center">{JSON.stringify(values)}</p> */}
    </div>
  );
};

export default Signup;
