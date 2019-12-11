import React from "react";

import { BrowserRouter, Switch, Route } from "react-router-dom";

import Main from "./pages/main";
import Product from "./pages/product";
import Form from "./pages/form";

const Routes = () => {
  return (
    <BrowserRouter>
      <Switch>
        <Route exact path='/' component={Main} />
        <Route path='/filme/:hashcod' component={Product} />
        <Route path='/cadastro/:hashcod' component={Form} />
      </Switch>
    </BrowserRouter>
  );
};

export default Routes;
