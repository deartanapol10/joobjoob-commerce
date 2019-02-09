import React, { Component } from "react";
import { connect } from "react-redux";
import { withRouter } from "react-router-dom";
import PropTypes from "prop-types";
import {
  getAllStore,
  createStore,
  deleteStore,
  updateStore
} from "../actions/storeAction";
import { getCategory } from "../actions/categoryAction";
import { login } from "../actions/authAction";
import { getBankAccount } from "../actions/bankAccountAction";
import { getDelivery } from "../actions/deliveryAction";

class Test extends Component {
  componentDidMount() {
    // this.props.login({
    //   username: "tarksb",
    //   password: "123456"
    // });
    // this.props.createStore({
    //   storeName: "Testing Redux"
    // });
    // this.props.deleteStore("5c56b172dab106770833bf66");
    // this.props.getAllStore();
    // this.props.updateStore("5c304934dd40285654e4ab33", {
    //   storeName: "Shippe Redux"
    // });
    this.props.getCategory();
    this.props.getBankAccount();
    this.props.getDelivery();
  }

  render() {
    return <div>{console.log(this.props.store)}</div>;
  }
}

Test.propTypes = {
  getAllStore: PropTypes.func.isRequired,
  login: PropTypes.func.isRequired,
  createStore: PropTypes.func.isRequired,
  deleteStore: PropTypes.func.isRequired,
  updateStore: PropTypes.func.isRequired
};

const mapStateToProps = state => ({
  store: state.store,
  auth: state.auth,
  category: state.category
});

export default connect(
  mapStateToProps,
  {
    getAllStore,
    login,
    createStore,
    deleteStore,
    updateStore,
    getCategory,
    getBankAccount,
    getDelivery
  }
)(withRouter(Test));
