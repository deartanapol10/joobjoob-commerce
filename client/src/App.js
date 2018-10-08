import React, { Component } from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";

import { Provider } from "react-redux";
import store from "./store";

import Customer from "./components/customer/Customer";

class App extends Component {
   render() {
      return (
         <Provider store={store}>
            <Router>
               <Route exact path="/" component={Customer} />
            </Router>
         </Provider>
      );
   }
}

export default App;
