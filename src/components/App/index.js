import React from "react";
import { Switch, Route } from "react-router-dom";

import Navbar from "../Navbar";
import routes from "../../routes";

function App() {
  return (
    <div className="overflow-x-hidden">
      <Navbar />

      <div className="py-20">
        <Switch>
          {routes.map(({ path, component: Component, ...rest }) => (
            <Route path={path} component={Component} key={path} {...rest} />
          ))}
        </Switch>
      </div>
    </div>
  );
}

export default App;
