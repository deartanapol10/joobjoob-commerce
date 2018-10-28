import React, { Component } from "react";
import { BrowserRouter as Router, Route } from "react-router-dom";

import { Provider } from "react-redux";
import store from "./store";

import Login from "./components/auth/Login";
import Customer from "./components/customer/Customer";

class App extends Component {
  render() {
    return (
      <Provider store={store}>
        <Router>
          <div className={"App"}>
            <Route exact path="/login" component={Login} />
            <Route exact path="/:userid/:orderid" component={Customer} />
          </div>
        </Router>
      </Provider>
    );
  }
}

export default App;
