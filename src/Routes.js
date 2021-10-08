import React from "react";
import { BrowserRouter, Switch, Route } from "react-router-dom";
import Home from "./pages/home";
import Signup from "./pages/signup";
import Camera from "./pages/camera";
import BankAuth from "./pages/bankAuth";
import Signin from "./pages/signin";
import PrivateRoute from "./auth/PrivateRoutes";
import Thanks from "./pages/thanks";


const Routes = () => {
  return (
    <BrowserRouter>
      <Switch>
        <Route path="/home" exact component={Home} />
        <Route path="/signup" exact component={Signup} />
        <Route path="/bankAuth" exact render={(props) => <BankAuth {...props}/>} />
        <Route path="/signin" exact component={Signin} />
        <Route path="/thanks" exact component={Thanks} />
        <PrivateRoute path="/camera" exact component={Camera} />              
      </Switch>

    </BrowserRouter>
  );
};

export default Routes;
