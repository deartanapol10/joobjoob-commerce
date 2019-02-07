// lodash for Array Management
import _ from "lodash";

import React, { Component } from "react";
import { Link } from "react-router-dom";

// moment for Time & Calendar Management
import moment from "moment";
import "moment/locale/th";

// Combine className in function classNames(className1, className2)
import classNames from "classnames";

// Import Material UI core components
import {
   AppBar,
   Avatar,
   Badge,
   Button,
   Card,
   CardActions,
   CardContent,
   CardMedia,
   Checkbox,
   Drawer,
   Divider,
   FormControlLabel,
   IconButton,
   InputBase,
   InputAdornment,
   List,
   ListItem,
   ListItemIcon,
   ListItemText,
   ListItemSecondaryAction,
   ListSubheader,
   Menu,
   MenuItem,
   MenuList,
   Modal,
   Paper,
   Tab,
   Tabs,
   TextField,
   Toolbar,
   Typography,
   withStyles
} from "@material-ui/core";

import Fab from "@material-ui/core/Fab";

// Import Icons
import AddIcon from "@material-ui/icons/Add";
import AddCircleIcon from "@material-ui/icons/AddCircle";
import CancelIcon from "@material-ui/icons/Cancel";
import CreateIcon from "@material-ui/icons/Create";
import CloseIcon from "@material-ui/icons/Close";
import InboxIcon from "@material-ui/icons/MoveToInbox";
import MenuIcon from "@material-ui/icons/Menu";
import MailIcon from "@material-ui/icons/Mail";
import PrintIcon from "@material-ui/icons/Print";
import SearchIcon from "@material-ui/icons/Search";
import RemoveIcon from "@material-ui/icons/Remove";

// Import Logo
import SALogo from "../../images/sa-logo.png";

// Import Mockup Data
import {
   orderStatus,
   paymentStatus,
   originalOrders,
   customerNamesList,
   productsList,
   optionsList,
   shippingMethods
} from "./data";

// Import JSS styles
import styles from "./styles";

// Init moment to local time format
moment.locale("th");

// Function to return a component for Tab
function TabContainer(props) {
   return <React.Fragment>{props.children}</React.Fragment>;
}

class Merchant extends Component {
   constructor(props) {
      super(props);

      // Ref for inputs
      this.myRef = React.createRef();

      this.state = {
         statusAnchorEl: null,
         menuAnchorEl: null,
         mobileMoreAnchorEl: null,
         value: 0,
         checked: [],
         orders: originalOrders,
         filteredOrders: [],
         customerNames: customerNamesList,
         newCustomerName: "",
         activeOrderStep: 0,
         addProductPopup: false,
         createProductPopup: false,
         productOptionPopup: false,
         cart: [],
         cartTotal: 0,
         products: productsList,
         options: optionsList,
         selectedProduct: {},
         newProduct: {},
         print: {},
         term: "",
         results: [],
         shippings: shippingMethods,
         selectedShipping: "เลือกการส่ง",
         shippingName: "เลือกการส่ง",
         shippingCost: 0,
         isAddShippingPopup: false
      };
   }

   //// ---- MENU POPUP FUNCTIONS ---- ////

   // Open status change menu
   handleStatusMenuOpen = event => {
      this.setState({ statusAnchorEl: event.currentTarget });
   };

   // Open menu
   handleMenuOpen = event => {
      this.setState({ menuAnchorEl: event.currentTarget });
   };

   // Close all menus
   handleMenuClose = () => {
      this.setState({ statusAnchorEl: null });
      this.setState({ menuAnchorEl: null });
   };

   //// **** END MENU POPUP FUNCTIONS **** ////

   //// ---- TABS FUNCTIONS ---- ////

   // Change tab - Clear previous filteredOrders > set new tab value >
   // filter orders > clear checked orders > close all menus
   handleTabChange = (event, value) => {
      this.setState({ filteredOrders: [] });
      this.setState({ value });
      this.filterOrders(value);
      this.setState({ checked: [] });
      this.handleMenuClose();
   };

   // Change status of order(s) - Get status to change > wait until all orders' status are change >
   // change tab
   async handleStatusChange(id) {
      const { checked, orders, value } = this.state;
      if (checked.length !== 0) {
         const targetStatus = orderStatus.filter(status => status.id === id);
         for (let i = 0; i < checked.length; i++) {
            await this.setState(
               {
                  orders: this.state.orders.map(order => {
                     if (order.orderID === checked[i]) {
                        return Object.assign({}, order, {
                           status: targetStatus[0].name.en
                        });
                     } else {
                        return order;
                     }
                  })
               },
               () => {
                  //this.filterOrders(value);
               }
            );
         }
         this.handleTabChange(null, value);
      } else {
         this.handleMenuClose();
      }
   }

   //// **** END TABS FUNCTIONS **** ////

   //// ---- CHECKBOX FUNCTIONS ---- ///

   // Toggle individual checkbox - Check if there's orderID in checked orders >
   // if none, push new order into checked orders > if yes, remove it.
   handleToggle = value => () => {
      const { checked } = this.state;
      const currentIndex = checked.indexOf(value);
      const newChecked = [...checked];

      if (currentIndex === -1) {
         newChecked.push(value);
      } else {
         newChecked.splice(currentIndex, 1);
      }

      this.setState({
         checked: newChecked
      });
   };

   // Select all checkboxes in current tab - Copy all orderId from filteredOrders into checked orders >
   // else clear checked orders
   handleSelectAll = event => {
      const { filteredOrders } = this.state;
      if (event.target.checked) {
         this.setState(state => ({
            checked: filteredOrders.map(o => o.orderID)
         }));
         return;
      }
      this.setState({ checked: [] });
   };

   // Select all checkboxes function for non-checkbox button(s)
   handleSelectAllCheckbox = () => {
      this.setState(state => ({
         checked: this.state.filteredOrders.map(o => o.orderID)
      }));
      this.handleMenuClose();
   };

   //// **** END CHECKBOX FUNCTIONS **** ///

   //// ---- FILTER ORDERS FUNCTIONS ---- ////

   // Filter from all orders - Filter orders that match with selected tab status
   filterOrders = statusIndex => {
      const { orders } = this.state;
      const newFilteredOrders = orders.filter(
         order => order.status === orderStatus[statusIndex].name.en
      );
      this.setState({ filteredOrders: newFilteredOrders });
   };

   //// **** END FILTER ORDERS FUNCTIONS **** ////

   //// ---- SEARCH FUNCTIONS ---- ///

   // Reset search term and results
   resetSearchTerm = () => {
      this.setState({
         term: "",
         results: []
      });
   };

   // Focus on search input
   focusSearchInput = () => {
      this.myRef.focus();
   };

   // Search - set term > filter results from orders in 300ms delay
   handleInputChange = event => {
      this.setState(
         {
            term: event.target.value
         },
         () => {
            setTimeout(() => {
               if (this.state.term.length < 1) return this.resetSearchTerm();

               const results = _.filter(
                  this.state.orders,
                  _.flow(
                     _.identity,
                     _.values,
                     _.join,
                     _.toLower,
                     _.partialRight(_.includes, this.state.term)
                  )
               );

               this.setState({
                  results
               });
            }, 300);
         }
      );
   };

   //// **** END SEARCH FUNCTIONS **** ////

   handleShippingSelect = name => event => {
      const { shippings } = this.state;
      if (isNaN(event.target.value) === false) {
         const selectedShipping = shippings.find(
            s => s.id === event.target.value
         );
         this.setState({
            selectedShipping: event.target.value,
            shippingName: selectedShipping.name,
            shippingCost: selectedShipping.cost
         });
      }
   };

   AddShipping = event => {
      this.setState({ isAddShippingPopup: true });
   };

   addShippingPopupDrawer = open => {
      this.setState({ isAddShippingPopup: open });
   };

   handleItemAmount = (add, id) => {
      const { order } = this.props.location.state;
   };

   componentDidMount() {
      const { order } = this.props.location.state;
      console.log(order), this.filterOrders(this.state.value);
   }

   orderInfo(e, order) {
      console.log(order);
   }

   toggleMenuDrawer = open => {
      this.setState({
         isMenuDrawerOpened: open
      });
      console.log(this.state.isMenuDrawerOpened);
   };

   toggleBottomDrawer = open => {
      this.toggleMenuDrawer(false);
      this.setState({
         isBottomDrawerOpened: open
      });
   };

   render() {
      const { classes } = this.props;
      const { order } = this.props.location.state;
      const {
         statusAnchorEl,
         menuAnchorEl,
         checked,
         value,
         filteredOrders,
         cart,
         term,
         results,
         shippings,
         selectedShipping,
         shippingName,
         shippingCost
      } = this.state;
      const isStatusMenuOpen = Boolean(statusAnchorEl);
      const isMenuOpen = Boolean(menuAnchorEl);

      const toOrders = props => <Link to="/merchant" {...props} />;
      const newOrder = props => <Link to="/products" {...props} />;

      // Translate status into color
      function orderStatusColor(status) {
         switch (status) {
            case "created":
               return classes.created;
            case "submitted":
               return classes.submitted;
            case "shipped":
               return classes.shipped;
            case "success":
               return classes.success;
            default:
               return classes.created;
         }
      }

      // Translate status into Thai
      function orderStatusText(status) {
         const alternateStatus = orderStatus.filter(
            thaiStatus => thaiStatus.name.en === status
         );
         return alternateStatus[0].name.th;
      }

      // Translate payment status into color
      function paymentColor(status, payment) {
         if (status === "submitted") {
            switch (payment) {
               case "pending":
                  return classes.pending;
               case "waitForConfirmation":
                  return classes.wait;
               case "comfirmed":
                  return classes.confirmed;
               default:
                  return classes.pending;
            }
         } else {
            return classes.pending;
         }
      }

      // Translate payment status into Thai
      function paymentText(payment) {
         const alternatePayment = paymentStatus.filter(
            thaiPayment => thaiPayment.name.en === payment
         );
         if (alternatePayment.length !== 0) {
            return alternatePayment[0].name.th;
         } else {
            return "";
         }
      }

      // Calculate time passes from latest updated time to current time
      function calculateDate(startDate) {
         const time = moment(startDate, "DDMMYYYYhhmm").fromNow();
         return time;
      }

      // Render menu popup
      const renderMenu = (
         <Menu
            anchorEl={menuAnchorEl}
            anchorOrigin={{ vertical: "top", horizontal: "right" }}
            transformOrigin={{ vertical: "top", horizontal: "right" }}
            open={isMenuOpen}
            onClose={this.handleMenuClose}
         >
            <MenuItem
               key="print_selected"
               className={classes.menuList}
               component={toOrders}
            >
               ยกเลิกบิล
            </MenuItem>
         </Menu>
      );

      // Render each order for current tab
      const itemList = (
         <React.Fragment>
            {/* Sort orders before map, by compare updated time */}
            {order.items.map(item => (
               <Card className={classes.itemCard} key={item.id}>
                  <CardContent className={classes.itemCardContent}>
                     <CardMedia
                        className={classes.itemCardMedia}
                        image={item.image}
                        title={item.name}
                     />
                     <span className={classes.itemCardDetailsWrapper}>
                        <div className={classes.itemCardDetails}>
                           <Typography
                              variant="body2"
                              className={classes.itemCardTitle}
                           >
                              {item.name}
                           </Typography>
                           <div className={classes.grow} />
                           <span className={classes.itemPriceInput}>
                              <TextField
                                 id="item-price"
                                 className={classNames(
                                    classes.margin,
                                    classes.textField
                                 )}
                                 variant="outlined"
                                 defaultValue={`${item.price}.00`}
                                 InputProps={{
                                    endAdornment: (
                                       <InputAdornment position="end">
                                          บาท
                                       </InputAdornment>
                                    )
                                 }}
                              />
                           </span>
                        </div>
                        <div className={classes.itemCardDetails}>
                           <span className={classes.itemOptionSelect}>
                              <TextField
                                 id="order-shipping-select"
                                 select
                                 className={classes.textField}
                                 onChange={this.handleShippingSelect(
                                    "shipping"
                                 )}
                                 value={selectedShipping}
                                 SelectProps={{
                                    MenuProps: {
                                       className: classes.menu
                                    }
                                 }}
                                 margin="none"
                                 variant="outlined"
                              >
                                 <MenuItem key={0} value="เลือกการส่ง" disabled>
                                    ไม่ระบุรูปแบบสินค้า
                                 </MenuItem>
                                 {shippings.map(shipping => (
                                    <MenuItem
                                       key={shipping.id}
                                       value={shipping.id}
                                    >
                                       {shipping.name}
                                    </MenuItem>
                                 ))}
                                 <MenuItem
                                    key={9999}
                                    value="เพิ่มการส่ง"
                                    className={classes.orderAddShipping}
                                 >
                                    <span
                                       className={
                                          classes.orderAddShippingButton
                                       }
                                       onClick={this.AddShipping}
                                    >
                                       <AddIcon />
                                       เพิ่มการส่ง
                                    </span>
                                 </MenuItem>
                              </TextField>
                           </span>
                           <div className={classes.grow} />
                           <span
                              className={classNames(
                                 classes.itemPriceInput,
                                 classes.itemAmountInput
                              )}
                           >
                              <TextField
                                 id="order-total"
                                 className={classNames(
                                    classes.margin,
                                    classes.textField
                                 )}
                                 variant="outlined"
                                 defaultValue="1"
                                 InputProps={{
                                    startAdornment: (
                                       <IconButton
                                          onClick={this.handleItemAmount(
                                             false,
                                             item.id
                                          )}
                                          className={classNames(
                                             classes.itemAmountButton,
                                             classes.itemAmountRemove
                                          )}
                                       >
                                          <RemoveIcon />
                                       </IconButton>
                                    ),
                                    endAdornment: (
                                       <IconButton
                                          onClick={this.handleItemAmount(
                                             true,
                                             item.id
                                          )}
                                          className={classNames(
                                             classes.itemAmountButton,
                                             classes.itemAmountAdd
                                          )}
                                       >
                                          <AddIcon />
                                       </IconButton>
                                    )
                                 }}
                              />
                           </span>
                        </div>
                     </span>
                  </CardContent>
                  <CardActions className={classes.itemCardComment}>
                     <TextField
                        id="item-comment"
                        className={classNames(
                           classes.margin,
                           classes.textField
                        )}
                        variant="outlined"
                        placeholder="รายละเอียดเพิ่มเติม"
                     />
                  </CardActions>
               </Card>
            ))}
         </React.Fragment>
      );

      const addShippingPopup = (
         <React.Fragment>
            <Drawer
               anchor="bottom"
               open={this.state.isAddShippingPopup}
               onClose={this.addShippingPopupDrawer.bind(this, false)}
            >
               <div
                  tabIndex={0}
                  role="button"
                  onClick={this.addShippingPopupDrawer.bind(this, false)}
                  onKeyDown={this.addShippingPopupDrawer.bind(this, false)}
               />
               {
                  <div className={classes.drawerContainer}>
                     <div style={{ textAlign: "right" }}>
                        <CloseIcon
                           style={{ cursor: "pointer" }}
                           onClick={this.addShippingPopupDrawer.bind(
                              this,
                              false
                           )}
                        />
                     </div>

                     <Typography variant="h5">เพิ่ม/แก้ไขการส่งใหม่</Typography>

                     {!this.state.shippings && (
                        <Typography variant="p">
                           กรุณากรอกการส่งอย่างน้อย 1 แบบ
                        </Typography>
                     )}

                     {this.state.shippings ? (
                        this.state.shippings.map(each => (
                           <div
                              style={{
                                 display: "flex"
                              }}
                           >
                              <TextField
                                 id="outlined-name"
                                 label="การส่ง"
                                 value={each.name}
                                 className={classes.textField}
                                 // onChange={this.handleTextFieldChange(
                                 //    "productPrice"
                                 // )}
                                 margin="normal"
                                 variant="outlined"
                                 style={{ marginRight: "15px" }}
                              />
                              <TextField
                                 id="outlined-name"
                                 label="ราคา"
                                 value={each.cost}
                                 className={classes.textField}
                                 // onChange={this.handleTextFieldChange(
                                 //    "productOption"
                                 // )}
                                 margin="normal"
                                 variant="outlined"
                                 fullWidth
                              />
                              <Fab
                                 aria-label="Add"
                                 style={{
                                    margin: "auto 10px",
                                    height: "auto"
                                 }}
                              >
                                 {/* <AddIcon /> */}
                                 {<RemoveIcon />}
                              </Fab>
                           </div>
                        ))
                     ) : (
                        <div
                           style={{
                              display: "flex"
                           }}
                        >
                           <TextField
                              id="outlined-name"
                              label="การส่ง"
                              // value={each.cat}
                              className={classes.textField}
                              // onChange={this.handleTextFieldChange(
                              //    "productPrice"
                              // )}
                              margin="normal"
                              variant="outlined"
                              style={{ marginRight: "15px" }}
                           />
                           <TextField
                              id="outlined-name"
                              label="ราคา"
                              // value={each.price}
                              className={classes.textField}
                              // onChange={this.handleTextFieldChange(
                              //    "productOption"
                              // )}
                              margin="normal"
                              variant="outlined"
                              fullWidth
                           />
                        </div>
                     )}
                     <div
                        style={{
                           display: "flex"
                        }}
                     >
                        <TextField
                           id="outlined-name"
                           label="none"
                           className={classes.textField}
                           margin="normal"
                           variant="outlined"
                           style={{
                              marginRight: "15px",
                              visibility: "hidden"
                           }}
                        />
                        <TextField
                           id="outlined-name"
                           label="none"
                           className={classes.textField}
                           margin="normal"
                           variant="outlined"
                           fullWidth
                           style={{ visibility: "hidden" }}
                        />
                        <Fab
                           aria-label="Add"
                           style={{
                              margin: "auto 10px",
                              height: "auto"
                           }}
                        >
                           <AddIcon />
                        </Fab>
                     </div>

                     <Button
                        variant="contained"
                        color="primary"
                        className={classes.button}
                        fullWidth
                     >
                        เสร็จสิ้น
                     </Button>
                  </div>
               }
            </Drawer>
         </React.Fragment>
      );

      return (
         <React.Fragment>
            {/* Wrapper */}
            <main className={classes.layout}>
               {/* Fixed top header for logo, search input and menus */}
               <AppBar
                  position="relative"
                  color="secondary"
                  className={classes.header}
               >
                  <Toolbar>
                     {/* Logo and name of shop */}
                     <IconButton
                        className={classes.avatarMenuButton}
                        color="inherit"
                     >
                        <Avatar
                           alt="Something Apparel"
                           src={SALogo}
                           className={classes.avatar}
                        />
                     </IconButton>
                     <div className={classes.appBarOrderTitle}>
                        <Typography
                           className={classes.appBarOrderNumber}
                           variant="h6"
                           color="inherit"
                           noWrap
                        >
                           #{order.orderID}
                        </Typography>
                        <Typography
                           className={classes.appBarOrderCustomerName}
                           variant="body1"
                           color="inherit"
                           noWrap
                        >
                           {order.name}
                        </Typography>
                     </div>
                     <div className={classes.grow} />
                     <div className={classes.sectionMobile}>
                        <Typography
                           className={classes.appBarOrderProcess}
                           variant="h6"
                           color="inherit"
                        >
                           รายการสินค้า
                        </Typography>
                        <IconButton
                           aria-haspopup="true"
                           onClick={this.handleMenuOpen}
                           color="inherit"
                        >
                           <MenuIcon />
                        </IconButton>
                     </div>
                  </Toolbar>
               </AppBar>

               <div
                  className={classNames(
                     classes.orderStatusBar,
                     orderStatusColor(order.status)
                  )}
               >
                  <Typography
                     variant="body2"
                     color="inherit"
                     className={classes.orderStatus}
                  >
                     {orderStatusText(order.status)}
                  </Typography>
                  <div className={classes.grow} />
                  <IconButton aria-haspopup="true" color="inherit">
                     <CreateIcon />
                  </IconButton>
               </div>

               {/* Render menus */}
               {renderMenu}

               {/* Display scrollable ontent */}
               <div className={classes.content}>
                  <div
                     className={classNames(
                        classes.sectionMobile,
                        classes.flexColumn
                     )}
                  >
                     {/* Tab content separated by value */}
                     {value === 0 && <TabContainer>{itemList}</TabContainer>}

                     {/* Additional space at the bottom of content */}
                     <div className={classes.bottomSpace} />
                  </div>
               </div>

               {/* Display fixed footer */}
               <div className={classes.footer}>
                  {/* Status tab display */}
                  <div className={classes.orderDetailsTabBar}>
                     <Tabs
                        value={value}
                        onChange={this.handleTabChange}
                        fullWidth
                     >
                        <Tab key={0} label="รายการสินค้า" />
                        <Tab key={1} label="การชำระเงิน" />
                        <Tab key={2} label="การขนส่ง" />
                     </Tabs>
                     <Paper className={classes.orderDetailsPaper}>
                        <div className={classes.orderSummaryGroup}>
                           <span className={classes.orderShippingSelect}>
                              <Badge
                                 color="primary"
                                 badgeContent={"!"}
                                 invisible={shippings.length !== 0}
                                 color="error"
                                 className={classes.alertBadge}
                              >
                                 <TextField
                                    id="order-shipping-select"
                                    select
                                    className={classes.textField}
                                    onChange={this.handleShippingSelect(
                                       "shipping"
                                    )}
                                    value={selectedShipping}
                                    SelectProps={{
                                       MenuProps: {
                                          className: classes.menu
                                       }
                                    }}
                                    margin="none"
                                    variant="outlined"
                                 >
                                    <MenuItem
                                       key={0}
                                       value="เลือกการส่ง"
                                       disabled
                                    >
                                       เลือกการส่ง
                                    </MenuItem>
                                    {shippings.map(shipping => (
                                       <MenuItem
                                          key={shipping.id}
                                          value={shipping.id}
                                       >
                                          {shipping.name}
                                       </MenuItem>
                                    ))}
                                    <MenuItem
                                       key={9999}
                                       value="เพิ่มการส่ง"
                                       className={classes.orderAddShipping}
                                    >
                                       <span
                                          className={
                                             classes.orderAddShippingButton
                                          }
                                          onClick={this.AddShipping}
                                       >
                                          <AddIcon />
                                          เพิ่มการส่ง
                                       </span>
                                    </MenuItem>
                                 </TextField>
                              </Badge>
                           </span>
                           <div className={classes.grow} />
                           <span className={classes.orderPriceInput}>
                              <TextField
                                 id="order-shipping-price"
                                 className={classNames(
                                    classes.margin,
                                    classes.textField
                                 )}
                                 variant="outlined"
                                 value={shippingCost}
                                 InputProps={{
                                    endAdornment: (
                                       <InputAdornment position="end">
                                          บาท
                                       </InputAdornment>
                                    )
                                 }}
                              />
                           </span>
                        </div>
                        <div className={classes.orderSummaryGroup}>
                           <span>
                              <Typography
                                 variant="h6"
                                 className={classes.orderLabel}
                              >
                                 ส่วนลด
                              </Typography>
                           </span>
                           <div className={classes.grow} />
                           <span className={classes.orderPriceInput}>
                              <TextField
                                 id="order-discount"
                                 className={classNames(
                                    classes.margin,
                                    classes.textField
                                 )}
                                 variant="outlined"
                                 defaultValue="0.00"
                                 InputProps={{
                                    endAdornment: (
                                       <InputAdornment position="end">
                                          บาท
                                       </InputAdornment>
                                    )
                                 }}
                              />
                           </span>
                        </div>
                        <div className={classes.orderSummaryGroup}>
                           <span>
                              <Typography
                                 variant="h6"
                                 className={classes.orderLabel}
                              >
                                 ยอดสุทธิ
                              </Typography>
                           </span>
                           <div className={classes.grow} />
                           <span className={classes.orderPriceInput}>
                              <TextField
                                 id="order-total"
                                 className={classNames(
                                    classes.margin,
                                    classes.textField
                                 )}
                                 variant="outlined"
                                 defaultValue="0.00"
                                 disabled
                                 InputProps={{
                                    endAdornment: (
                                       <InputAdornment position="end">
                                          บาท
                                       </InputAdornment>
                                    )
                                 }}
                              />
                           </span>
                        </div>
                     </Paper>
                  </div>
                  <AppBar position="fixed" className={classes.footerAppBar}>
                     <Toolbar className={classes.footerToolbar}>
                        <Button
                           className={classes.textButton}
                           component={toOrders}
                        >
                           {`< กลับ `}
                        </Button>
                        <Fab
                           aria-label="Add"
                           className={classes.footerFabButton}
                           component={newOrder}
                        >
                           <AddIcon />
                        </Fab>
                        <div className={classes.grow} />
                        <Button
                           disabled={cart.length === 0}
                           className={classes.regularButton}
                        >
                           เพิ่มสินค้า
                           <Badge
                              color="primary"
                              badgeContent={cart.length}
                              classes={{
                                 badge: classes.buttonWithBadge,
                                 colorPrimary: classes.buttonWithBadgeColor
                              }}
                              invisible={cart.length === 0}
                           />
                        </Button>
                     </Toolbar>
                  </AppBar>
               </div>

               {addShippingPopup}
            </main>
         </React.Fragment>
      );
   }
}

export default withStyles(styles)(Merchant);
