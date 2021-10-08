import React, { useState } from "react";
import logo from "../assets/images/Canfirm_Logo.png"

import "./css/signin.css";
import {  Redirect } from "react-router-dom";

import { signin, authenticate, isAutheticated } from "../auth";

const Signin = () => {
  const [values, setValues] = useState({
    username: "",
    password: "",
    error: "",
    loading: false,
    didRedirect: false,
  });

  const { username, password, error, loading, didRedirect } = values;

  const token = isAutheticated();

  const handleChange = (name) => (event) => {
    setValues({ ...values, error: false, [name]: event.target.value });
  };

  const onSubmit = (event) => {
    event.preventDefault();
    setValues({ ...values, error: false, loading: true });
     console.log(username);
     console.log(password);
    signin({ username, password })
      .then((data) => {
        console.log(data)
        if(data.non_field_errors != "No error")
        {
          console.log("some error happend",data.non_field_errors)
        }
         else {
          authenticate(data, () => {
            setValues({ ...values, didRedirect: true });
          });
        }
      })
      .catch(console.log("signin failed"));
  };

  const performRedirect = () => {
    // todo redirecyion here

    if (didRedirect) {
     
        return <Redirect to="/camera" />;
     
    }

   if (isAutheticated()) {
      return <Redirect to="/camera" />;
    }
  };

  // const loadingMessage = () => {
  //   return (
  //     loading && (
  //       <div className="alert alert-info">
  //         <h2>Loading is happening</h2>
  //       </div>
  //     )
  //   );
  // };

  // const errorMessage = () => {
  //   return (
  //     <div className="row">
  //       <div className="col-md-6 offset-sm-3 text-left">
  //         <div
  //           className="alert alert-danger"
  //           style={{ display: error ? "" : "none" }}
  //         >
  //           {error}
  //         </div>
  //       </div>
  //     </div>
  //   );
  // };

  const signInForm = () => {
    return (
    
      <div className="container-fluid bg-dark text-white">
      <h1 id="herotext">Your Identity Is Secure.</h1>
      <div className="row" >
        <div className="col d-flex align-items-center justify-content-center">
          <form>
            <img src= {logo} className="img-fluid pb-4" alt="..." />
            <h3>Login</h3>
            <div className="mb-3">
              <label htmlFor="InputUsername" className="form-label"
                >Username</label
              >
              <input
                onChange={handleChange("username")}
                        value={username}
                type="text"
                className="form-control"
                id="InputUsername"
              />
            </div>
            <div className="mb-3">
              <label htmlFor="InputPassword" className="form-label"
                >Password</label
              >
              <input
               onChange={handleChange("password")}
                         value={password}
                type="password"
                className="form-control"
                id="InputPassword"
              />
            </div>

            <div className="mb-3 form-check">
              <input type="checkbox" className="form-check-input" checked />
              <div className="d-flex justify-content-between">
                <label className="form-check-label">Remember Me</label>
                <a href="#">Forgot Credentials?</a>
              </div>
            </div>
            <div className="d-grid col-6 mx-auto py-3">
              <button type="submit" onClick={onSubmit} className="btn btn-primary" type="button">
                <b>Login</b>
              </button>
            </div>
            <h6 className="text-center mt-4">
              Don't have account? <a href="http://localhost:3000/signup">Sign Up</a>
            </h6>
            <hr />
            <p className="text-center mt-2" id="team_name">
              Developed by <a href="https://team-sha-1.github.io/Team_Website/index.html">Team SHA-1</a>
            </p>
          </form>
        </div>
        <div className="col-md-7 order-md-first" id="picture"></div>
      </div>
    </div>
    
    );
  };

  return (
  
     <div>
      {/* {loadingMessage()}
      {errorMessage()} */}
      {signInForm()}
      {performRedirect()}
      {/* <p className="text-black text-center">{JSON.stringify(values)}</p>    */}
    </div>
  );
};

export default Signin;
