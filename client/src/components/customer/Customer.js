import React, { Component } from "react";
import PropTypes from "prop-types";
import { Link } from "react-router-dom";
import { getOrder } from "../../actions/orderAction";
import { connect } from "react-redux";
import Spinner from "../common/Spinner";
import moment from "moment";

import {
  Grid,
  Typography,
  withStyles,
  Paper,
  Step,
  Stepper,
  StepLabel,
  List,
  ListItem,
  ListItemText,
  Radio,
  RadioGroup,
  FormControlLabel,
  FormControl,
  Divider,
  Card,
  CardContent,
  CardMedia
} from "@material-ui/core";

import SALogo from "../../images/sa-logo.png";
import Item1 from "../../images/item-1.jpg";
import Item2 from "../../images/item-2.jpg";

import PaymentForm from "../common/PaymentForm";
import AddressForm from "../common/AddressForm";
import Success from "../common/Success";

import styles from "../style/styles";

const items = [
  {
    id: 1,
    name:
      "สินค้าที่ชื่อยาวที่สุดในโลกที่คุณไม่เคยเห็นมาก่อนแล้วคุณจะตกใจว่าทำไมมันยาวได้ขนาดนี้",
    price: 499.49,
    amount: 1,
    image: Item1
  },
  {
    id: 2,
    name: "Lorem Ipsum",
    price: 299.5,
    amount: 2,
    image: Item2
  }
];

class Customer extends Component {
  state = {
    activeStep: 0,
    shipping: "0.00",
    bank: "ธนาคาร กสิกรไทย",
    total: "0.00",
    userAmount: "",
    userDate: "",
    userTime: "",
    userFile: "",
    userFirstName: "",
    userLastName: "",
    userNumber: "",
    userAddress: "",
    userProvince: "",
    userPostalCode: ""
  };

  componentWillMount() {
    let userid = this.props.match.params.userid;
    let orderid = this.props.match.params.orderid;
    this.props.getOrder(userid, orderid);
  }

  getStepContent = step => {
    switch (step) {
      case 0:
        return (
          <PaymentForm
            bank={this.state.bank}
            total={this.state.total}
            userFile={this.state.userFile}
            handleBank={this.handleChange("bank").bind(this)}
            handleUserAmount={this.handleChange("userAmount").bind(this)}
            handleUserDate={this.handleChange("userDate").bind(this)}
            handleUserTime={this.handleChange("userTime").bind(this)}
            handleUserFile={this.handleChange("userFile").bind(this)}
            handleNext={this.handleNext.bind(this)}
            handleBack={this.handleBack.bind(this)}
            classes={this.props.classes}
            order={this.props.order}
          />
        );
      case 1:
        return (
          <AddressForm
            handleUserFirstName={this.handleChange("userFirstName").bind(this)}
            handleUserLastName={this.handleChange("userLastName").bind(this)}
            handleUserNumber={this.handleChange("userNumber").bind(this)}
            handleUserAddress={this.handleChange("userAddress").bind(this)}
            handleUserProvince={this.handleChange("userProvince").bind(this)}
            handleUserPostalCode={this.handleChange("userPostalCode").bind(
              this
            )}
            handleNext={this.handleNext.bind(this)}
            handleBack={this.handleBack.bind(this)}
            classes={this.props.classes}
            order={this.props.order}
          />
        );
      case 2:
        return (
          <Success
            bank={this.state.bank}
            total={this.state.total}
            userDate={this.state.userDate}
            userTime={this.state.userTime}
            userAddress={this.state.userAddress}
            userProvince={this.state.userProvince}
            userPostalCode={this.state.userPostalCode}
            handleUserAddress={this.handleChange("userAddress").bind(this)}
            handleUserProvince={this.handleChange("userProvince").bind(this)}
            handleUserPostalCode={this.handleChange("userPostalCode").bind(
              this
            )}
            handleNext={this.handleNext.bind(this)}
            handleBack={this.handleBack.bind(this)}
            classes={this.props.classes}
            order={this.props.order}
          />
        );
      default:
        throw new Error("Unknown step");
    }
  };

  calculateTotal = () => {
    let total = 0;
    let shipping = parseInt(this.state.shipping);
    for (let i = 0; i < items.length; i++) {
      total += items[i].price * items[i].amount;
    }

    this.setState({
      total: String(total + shipping)
    });
  };

  handleShipping = event => {
    this.setState(
      {
        shipping: event.target.value
      },
      function() {
        this.calculateTotal();
      }
    );
  };

  handleChange = name => event => {
    this.setState({
      [name]: event.target.value
    });
  };

  handleNext = () => {
    let { activeStep } = this.state;
    this.setState({
      activeStep: activeStep + 1
    });
  };

  handleBack = () => {
    let { activeStep } = this.state;
    this.setState({
      activeStep: activeStep - 1
    });
  };

  componentDidMount() {
    this.calculateTotal();
  }

  render() {
    const { classes } = this.props;
    const { order, loading } = this.props.order;

    if (order === null || loading) {
      return <Spinner />;
    } else {
      // create a product item to add in product component
      var newItem = [];
      for (let i = 0; i < order.products.length; i++) {
        newItem.push({
          id: order.products[i].product._id,
          name: order.products[i].product.productName,
          price: order.products[i].product.price,
          amount: order.products[i].quantity,
          image: Item1
        });
      }
      return (
        <React.Fragment>
          <main className={classes.layout}>
            <Grid
              container
              spacing={0}
              direction="column"
              alignItems="center"
              justify="center"
              className={classes.grid}
            >
              <Grid item xs={12}>
                <img src={SALogo} alt="Something Apparel Logo" width="180px" />
              </Grid>

              <Stepper
                activeStep={this.state.activeStep}
                className={classes.stepper}
              >
                <Step key={1}>
                  <StepLabel />
                </Step>
                <Step key={2}>
                  <StepLabel />
                </Step>
                <Step key={3}>
                  <StepLabel />
                </Step>
              </Stepper>
            </Grid>

            <Grid container spacing={16}>
              <Grid item xs={12} sm={6} className={classes.gridsm}>
                <Paper className={classes.paper}>
                  <Typography
                    variant="title"
                    gutterBottom
                    className={classes.titleSecondary}
                  >
                    Order ID: {order._id}
                  </Typography>
                  <List disablePadding>
                    <ListItem className={classes.listItem}>
                      <ListItemText primary="ชื่อลูกค้า" />
                      <Typography variant="body1">{order.name}</Typography>
                    </ListItem>
                    <ListItem className={classes.listItem}>
                      <ListItemText primary="ออกบิลเมื่อ" />
                      <Typography variant="body1">
                        {moment(order.createdAt).format("DD/MM/YYYY")}
                      </Typography>
                    </ListItem>
                  </List>
                  <Divider className={classes.divider} />
                  <Typography
                    variant="title"
                    gutterBottom
                    className={classes.title}
                  >
                    รายการสินค้า
                  </Typography>
                  <div style={{ marginBottom: "16px" }}>
                    {newItem.map(item => (
                      <Card className={classes.card} key={item.id}>
                        <CardMedia
                          className={classes.cardMedia}
                          image={item.image}
                          title={item.name}
                        />
                        <CardContent className={classes.content}>
                          <Typography
                            variant="headline"
                            className={classes.itemName}
                          >
                            {item.name}
                          </Typography>
                          <Typography
                            variant="subheading"
                            color="textSecondary"
                            className={classes.itemPriceLabel}
                          >
                            ราคา
                          </Typography>
                          <Typography
                            variant="title"
                            color="textSecondary"
                            className={classes.itemPrice}
                          >
                            {item.price} บาท
                          </Typography>
                          <Typography
                            variant="body1"
                            color="textSecondary"
                            className={classes.itemAmount}
                          >
                            จำนวน {item.amount}
                          </Typography>
                        </CardContent>
                      </Card>
                    ))}
                  </div>
                  <Divider className={classes.divider} />
                  <List disablePadding>
                    <ListItem className={classes.listItem}>
                      <ListItemText
                        primary="ค่าส่ง"
                        className={classes.shippingCost}
                      />
                      <Typography variant="body2">
                        {this.state.shipping} บาท
                      </Typography>
                    </ListItem>
                  </List>
                  <FormControl className={classes.formControl}>
                    <RadioGroup
                      name="shipping-method"
                      value={this.state.shipping}
                      onChange={this.handleShipping}
                    >
                      <FormControlLabel
                        value="50.00"
                        control={<Radio />}
                        label="Ems - 50 บาท (3 วันทำการ)"
                      />
                      <FormControlLabel
                        value="40.00"
                        control={<Radio />}
                        label="Alpha Fast - 40 บาท (เฉพาะ กรุงเทพฯ นนทบุรี สมุทรปราการ และปทุมธานี เท่านั้น)"
                      />
                      <FormControlLabel
                        value="0.00"
                        control={<Radio />}
                        label="มารับด้วยตัวเอง - 0 บาท"
                      />
                    </RadioGroup>
                  </FormControl>
                  <Divider className={classes.divider} />
                  <List disablePadding>
                    <ListItem className={classes.listItem}>
                      <ListItemText
                        primary="ยอดรวม"
                        className={classes.total}
                      />
                      <Typography variant="body2" className={classes.total}>
                        {this.state.total} บาท
                      </Typography>
                    </ListItem>
                    <Divider className={classes.divider} />
                    <ListItem className={classes.listItem}>
                      <ListItemText
                        primary="กรุณาชำระก่อน"
                        className={classes.expiryDate}
                      />
                      <Typography
                        variant="body2"
                        className={classes.expiryDate}
                      >
                        {moment(order.expiredAt).format("DD/MM/YYYY")}
                      </Typography>
                    </ListItem>
                  </List>
                  <Typography variant="caption" gutterBottom>
                    *หากท่านไม่ชำระภายใน 2 วัน บิลนี้จะใช้ไม่ได้
                    กรุณาติดต่อผู้ขาย
                  </Typography>
                </Paper>
              </Grid>

              <Grid item xs={12} sm={6} className={classes.gridsm}>
                <Paper className={classes.paper}>
                  {this.getStepContent(this.state.activeStep)}
                </Paper>
              </Grid>
            </Grid>
          </main>
        </React.Fragment>
      );
    }
  }
}

Customer.proptypes = {
  getOrder: PropTypes.func.isRequired,
  order: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
  order: state.order
});

export default connect(
  mapStateToProps,
  { getOrder }
)(withStyles(styles)(Customer));
