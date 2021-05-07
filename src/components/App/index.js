import React from "react";
import { Switch, Route } from "react-router-dom";

import Navbar from "../Navbar";
import BottomNav from "../BottomNav";
import routes from "../../routes";

function App() {
  return (
    <div className="overflow-x-hidden">
      <Navbar />

      <div className="py-14">
        <Switch>
          {routes.map(({ path, component: Component, exact }) => (
            <Route path={path} component={Component} key={path} exact={exact} />
          ))}
        </Switch>
      </div>

      <BottomNav />
    </div>
  );
}

export default App;
