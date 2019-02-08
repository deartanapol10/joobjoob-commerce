import React, { Component } from "react";
import { BrowserRouter as Router, Route } from "react-router-dom";
import jwt_decode from "jwt-decode";
import setAuthToken from "./utils/setAuthToken";
import { Provider } from "react-redux";
import store from "./store";

import Login from "./components/auth/Login";
import Customer from "./components/customer/Customer";
import Merchant from "./components/merchant/Merchant";
import Receipt from "./receipt/SellerReceipt";
import Test from "./components/Test";

import { setCurrentUser, logoutUser } from "./actions/authAction";

// Check for token
if (localStorage.jwtToken) {
  // set auth token header auth
  setAuthToken(localStorage.jwtToken);
  // Decode token and get user info and exp
  const decoded = jwt_decode(localStorage.jwtToken);
  // Set user and isAuthenticated
  store.dispatch(setCurrentUser(decoded));
  // Check for expired token
  const currentTime = Date.now() / 1000;
  if (decoded.exp < currentTime) {
    // Logout user
    store.dispatch(logoutUser());
    // Redirect to login
    window.location.href = "/login";
  }
}

class App extends Component {
  render() {
    return (
      <Provider store={store}>
        <Router>
          <React.Fragment>
            <Route exact path="/login" component={Login} />
            <Route exact path="/:userid/:orderid" component={Customer} />
            <Route exact path="/merchant" component={Merchant} />
            <Route exact path="/receipt" component={Receipt} />
            <Route exact path="/redux" component={Test} />
          </React.Fragment>
        </Router>
      </Provider>
    );
  }
}

export default App;
