import React, { Component } from "react";

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

import SALogo from "./images/sa-logo.png";
import Item1 from "./images/item-1.jpg";
import Item2 from "./images/item-2.jpg";

import PaymentForm from "./components/PaymentForm";
import AddressForm from "./components/AddressForm";
import Success from "./components/Success";

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

const styles = theme => ({
   layout: {
      width: "auto",
      marginLeft: theme.spacing.unit * 2,
      marginRight: theme.spacing.unit * 2,
      marginBottom: theme.spacing.unit * 6,
      [theme.breakpoints.up(1280 + theme.spacing.unit * 2 * 2)]: {
         width: 1280,
         marginLeft: "auto",
         marginRight: "auto"
      }
   },
   grid: {
      marginTop: theme.spacing.unit * 3,
      marginBottom: theme.spacing.unit,
      padding: theme.spacing.unit,
      [theme.breakpoints.up(1280 + theme.spacing.unit * 3 * 2)]: {
         marginTop: theme.spacing.unit * 6,
         marginBottom: theme.spacing.unit,
         padding: theme.spacing.unit * 2
      }
   },
   gridsm: {
      [theme.breakpoints.up(600)]: {
         flexBasis: "100%",
         maxWidth: "100%"
      },
      [theme.breakpoints.up(960)]: {
         flexBasis: "50%",
         maxWidth: "50%"
      }
   },
   stepper: {
      width: `${80}%`,
      padding: `${theme.spacing.unit * 3}px 0 ${theme.spacing.unit * 5}px`,
      [theme.breakpoints.up(600)]: {
         width: `${100}%`
      }
   },
   paper: {
      padding: `${theme.spacing.unit * 5}px ${theme.spacing.unit * 3}px`,
      margin: 0
   },
   listItem: {
      padding: `${theme.spacing.unit}px 0`
   },
   title: {
      marginTop: theme.spacing.unit * 2
   },
   titleSecondary: {
      color: theme.palette.secondary[400]
   },
   total: {
      fontWeight: 500,
      fontSize: "1.2rem",
      "& span": {
         fontSize: "1.2rem",
         fontWeight: 500
      }
   },
   shippingCost: {
      fontWeight: 500,
      "& span": {
         fontWeight: 500
      }
   },
   expiryDate: {
      color: theme.palette.secondary[400],
      "& span": {
         color: theme.palette.secondary[400]
      }
   },
   divider: {
      margin: `${theme.spacing.unit}px 0`
   },
   formControl: {
      width: "100%"
   },
   input: {
      display: "none"
   },
   card: {
      display: "flex",
      marginBottom: theme.spacing.unit
   },
   content: {
      flex: "1 0 auto",
      width: 0
   },
   cardMedia: {
      width: "5rem",
      height: "5rem",
      [theme.breakpoints.up(480)]: {
         width: "7rem",
         height: "7rem"
      },
      [theme.breakpoints.up(600)]: {
         width: "9rem",
         height: "9rem"
      },
      [theme.breakpoints.up(960)]: {
         width: "9rem",
         height: "9rem"
      }
   },
   centerCard: {
      textAlign: "center",
      width: "100%",
      "&:last-child": {
         paddingBottom: 16
      },
      "&.processing": {
         backgroundColor: theme.palette.primary[100]
      },
      "&.confirm": {
         backgroundColor: theme.palette.primary[300]
      },
      "&.shipped": {
         backgroundColor: theme.palette.primary[700]
      }
   },
   bankCard: {
      display: "flex",
      marginBottom: theme.spacing.unit,
      alignItems: "center"
   },
   bankMedia: {
      width: 50,
      height: 50,
      margin: 20
   },
   bankContent: {
      "&:last-child": {
         paddingBottom: 16
      }
   },
   bankRadio: {
      "& input": {
         display: "none"
      },
      "& label": {
         position: "relative",
         cursor: "pointer"
      },
      "& input:checked": {
         "& + label": {
            "& $bankCard": {
               backgroundColor: theme.palette.primary[100],
               boxShadow:
                  "0px 1px 5px 0px rgba(0, 0, 0, 0.2), 0px 1px 3px 0px rgba(0, 0, 0, 0.14), 0px 5px 3px -1px rgba(0, 0, 0, 0.12)"
            }
         }
      }
   },
   itemName: {
      fontSize: "1.1rem"
   },
   itemPriceLabel: {
      fontSize: "0.8rem"
   },
   itemPrice: {
      fontSize: "1rem"
   },
   itemAmount: {
      fontSize: "0.8rem"
   },
   nextButton: {
      color: "white",
      backgroundColor: theme.palette.primary[200],
      "&:hover": {
         backgroundColor: theme.palette.primary[300]
      }
   },
   uploadButton: {
      fontSize: "0.8rem",
      marginBottom: theme.spacing.unit * 2
   },
   centerButton: {
      textAlign: "center",
      marginTop: 16
   },
   cancelButton: {
      marginTop: theme.spacing.unit
   },
   hide: {
      display: "none"
   }
});

class App extends Component {
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
               />
            );
         case 1:
            return (
               <AddressForm
                  handleUserFirstName={this.handleChange("userFirstName").bind(
                     this
                  )}
                  handleUserLastName={this.handleChange("userLastName").bind(
                     this
                  )}
                  handleUserNumber={this.handleChange("userNumber").bind(this)}
                  handleUserAddress={this.handleChange("userAddress").bind(
                     this
                  )}
                  handleUserProvince={this.handleChange("userProvince").bind(
                     this
                  )}
                  handleUserPostalCode={this.handleChange(
                     "userPostalCode"
                  ).bind(this)}
                  handleNext={this.handleNext.bind(this)}
                  handleBack={this.handleBack.bind(this)}
                  classes={this.props.classes}
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
                  handleUserAddress={this.handleChange("userAddress").bind(
                     this
                  )}
                  handleUserProvince={this.handleChange("userProvince").bind(
                     this
                  )}
                  handleUserPostalCode={this.handleChange(
                     "userPostalCode"
                  ).bind(this)}
                  handleNext={this.handleNext.bind(this)}
                  handleBack={this.handleBack.bind(this)}
                  classes={this.props.classes}
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
                     <img
                        src={SALogo}
                        alt="Something Apparel Logo"
                        width="180px"
                     />
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
                           บิลเลขที่ 01
                        </Typography>
                        <List disablePadding>
                           <ListItem className={classes.listItem}>
                              <ListItemText primary="ชื่อลูกค้า" />
                              <Typography variant="body1">beer</Typography>
                           </ListItem>
                           <ListItem className={classes.listItem}>
                              <ListItemText primary="ออกบิลเมื่อ" />
                              <Typography variant="body1">
                                 30/08/2018
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
                           {items.map(item => (
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
                              <Typography
                                 variant="body2"
                                 className={classes.total}
                              >
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
                                 02/09/2018
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

export default withStyles(styles)(App);
