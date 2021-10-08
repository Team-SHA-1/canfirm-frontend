import React, { useState } from "react";
import logo from "../assets/images/Canfirm_Logo_white.png";
import praying from "../assets/images/praying.png";
import "./css/thanks.css";

import { Link, Redirect } from "react-router-dom";

const Thanks = () => {
  const sendMessage = () => {
    var url = "http://127.0.0.1:5500/";
      
    let data = localStorage.getItem("thirdparty");
    window.opener.postMessage(JSON.stringify(data), url);
  };


  const thanksForm = () => {return (
    <div id="main">
      <div className="container-fluid text-center text-white pt-5">
        <img id="logo1" src={logo} alt="Canfirm Logo" />
        <h5>
          Your face is verified and attributes are shared with External
          Application.
          <br />
          <i>You may close this window now.</i>
        </h5>
        <img src={praying} className="img-fluid  py-5" alt="praying emoji" />
        <h1>Thank for Using Canfirm!</h1>
        <h3>We hope you liked our service. Please rate us.</h3>
        <div
          className="btn-group py-4"
          role="group"
          aria-label="Basic radio toggle button group"
        >
          <input
            type="radio"
            className="btn-check"
            name="btnradio"
            id="btnradio1"
            autoComplete="off"
          />
          <label className="btn btn-outline-light" htmlFor="btnradio1">
            1
          </label>

          <input
            type="radio"
            className="btn-check"
            name="btnradio"
            id="btnradio2"
            autoComplete="off"
          />
          <label className="btn btn-outline-light" htmlFor="btnradio2">
            2
          </label>

          <input
            type="radio"
            className="btn-check"
            name="btnradio"
            id="btnradio3"
            autoComplete="off"
          />
          <label className="btn btn-outline-light" htmlFor="btnradio3">
            3
          </label>

          <input
            type="radio"
            className="btn-check"
            name="btnradio"
            id="btnradio4"
            autoComplete="off"
          />
          <label className="btn btn-outline-light" htmlFor="btnradio4">
            4
          </label>

          <input
            type="radio"
            className="btn-check"
            name="btnradio"
            id="btnradio5"
            autoComplete="off"
          />
          <label className="btn btn-outline-light" htmlFor="btnradio5">
            5
          </label>
        </div>

        <p>
          Also, you can consider using bank services directly from Canfirm:
          <br />
          <u>Money Transfer</u> | <u>Password Change</u> |{" "}
          <u>Apply Instant Loan</u>
        </p>
        <hr />
        <p className="text-center pt-2" id="team_name">
          Developed by <a href="#">Team SHA-1</a>
        </p>

      </div>

     
    </div>
  );

}

return (
  <div>
    {thanksForm()}
    {sendMessage()}
  </div>
)
};

export default Thanks;
