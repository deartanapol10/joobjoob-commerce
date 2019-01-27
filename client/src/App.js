import React, { Component } from "react";
import { BrowserRouter as Router, Route } from "react-router-dom";

import { Provider } from "react-redux";
import store from "./store";

import Login from "./components/auth/Login";
import Customer from "./components/customer/Customer";
import Merchant from "./components/merchant/Merchant";
import ProductSelection from "./components/merchant/ProductSelection";
import OrderDetails from "./components/merchant/OrderDetails";
import Receipt from "./receipt/SellerReceipt";

class App extends Component {
   render() {
      return (
         <Provider store={store}>
            <Router>
               <div className={"App"}>
                  <Route exact path="/login" component={Login} />
                  <Route path="/:userid/:orderid" component={Customer} />
                  <Route path="/merchant" component={Merchant} />
                  <Route path="/receipt" component={Receipt} />
                  <Route path="/products" component={ProductSelection} />
                  <Route path="/order" component={OrderDetails} />
               </div>
            </Router>
         </Provider>
      );
   }
}

export default App;
