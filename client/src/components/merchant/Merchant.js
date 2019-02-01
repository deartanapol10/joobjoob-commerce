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
   Button,
   Card,
   CardContent,
   CardMedia,
   Checkbox,
   Drawer,
   Divider,
   FormControlLabel,
   IconButton,
   InputBase,
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

// Import Logo
import SALogo from "../../images/sa-logo.png";

// Import Mockup Data
import {
   orderStatus,
   paymentStatus,
   originalOrders,
   customerNamesList,
   productsList,
   optionsList
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
         //newBill
         customerNameField: ""
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

   componentDidMount() {
      this.filterOrders(this.state.value);
   }

   orderInfo(e, order) {
      console.log(order);
      this.props.history.push({
         pathname: "/order",
         state: {
            order
         }
      });
   }

   toggleBottomDrawer = open => {
      this.setState({
         isBottomDrawerOpened: open
      });
   };

   handleTextFieldChange = name => event => {
      this.setState({ customerNameField: event.target.value });
   };

   render() {
      const { classes } = this.props;
      const {
         statusAnchorEl,
         menuAnchorEl,
         checked,
         value,
         filteredOrders,
         term,
         results
      } = this.state;
      const isStatusMenuOpen = Boolean(statusAnchorEl);
      const isMenuOpen = Boolean(menuAnchorEl);

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

      // Render status change menu popup
      const renderStatusMenu = (
         <Menu
            anchorEl={statusAnchorEl}
            anchorOrigin={{ vertical: "top", horizontal: "right" }}
            transformOrigin={{ vertical: "top", horizontal: "right" }}
            open={isStatusMenuOpen}
            onClose={this.handleMenuClose}
         >
            {orderStatus.map(status => (
               <MenuItem
                  onClick={this.handleStatusChange.bind(this, status.id)}
                  key={status.id}
                  className={classes.menuList}
               >
                  {status.name.th}
               </MenuItem>
            ))}
         </Menu>
      );

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
               key="new_bill"
               className={classes.menuList}
               // component={newOrder}
               onClick={this.toggleBottomDrawer.bind(this, true)}
            >
               เปิดบิลใหม่
            </MenuItem>
            <MenuItem
               key="select_all"
               onClick={this.handleSelectAllCheckbox.bind(this)}
               className={classes.menuList}
            >
               เลือกทั้งหมด
            </MenuItem>
            <MenuItem key="print_selected" className={classes.menuList}>
               พิมพ์ที่เลือก
            </MenuItem>
         </Menu>
      );

      // Render search results from this.state.results
      const searchResults = (
         <React.Fragment>
            {results.map(result => (
               <Card
                  key="result.orderID"
                  className={classes.resultCard}
                  onClick={e => {
                     this.orderInfo(e, result);
                  }}
               >
                  <div>
                     <Button
                        variant="contained"
                        color="primary"
                        className={classNames(
                           orderStatusColor(result.status),
                           classes.orderStatusButton,
                           classes.textLeft
                        )}
                     >
                        <Typography
                           variant="body2"
                           className={classes.orderNumber}
                        >{`#${result.orderID}`}</Typography>
                     </Button>
                  </div>
                  <div className={classes.resultDetail}>
                     <Typography
                        variant="body2"
                        className={classes.orderClientName}
                     >
                        {result.name}
                     </Typography>
                     <Typography
                        variant="body1"
                        className={classNames(
                           classes.textRight,
                           classes.orderPrice
                        )}
                     >
                        {result.price} บาท
                     </Typography>
                  </div>
               </Card>
            ))}
         </React.Fragment>
      );

      // Render each order for current tab
      const orderCard = (
         <React.Fragment>
            {/* Sort orders before map, by compare updated time */}
            {filteredOrders
               .sort(
                  (a, b) =>
                     moment(b.updatedTime, "DDMMYYYYhhmm").format("X") -
                     moment(a.updatedTime, "DDMMYYYYhhmm").format("X")
               )
               .map(order => (
                  <Card
                     className={
                        checked.indexOf(order.orderID) === -1
                           ? classes.orderCard
                           : classNames(
                                classes.orderCard,
                                classes.orderCardActive
                             )
                     }
                     key={order.orderID}
                     onClick={e => {
                        this.orderInfo(e, order);
                     }}
                  >
                     <Checkbox
                        onChange={this.handleToggle(order.orderID)}
                        checked={checked.indexOf(order.orderID) !== -1}
                        value={order.orderID}
                        className={
                           checked.indexOf(order.orderID) === -1
                              ? classes.orderCheckbox
                              : classNames(
                                   classes.orderCheckbox,
                                   classes.orderCheckboxActive
                                )
                        }
                     />
                     <CardContent className={classes.orderCardContent}>
                        <div>
                           <Button
                              variant="contained"
                              color="primary"
                              className={classNames(
                                 orderStatusColor(order.status),
                                 classes.orderStatusButton,
                                 classes.textLeft
                              )}
                           >
                              <Typography
                                 variant="body2"
                                 className={classes.orderNumber}
                              >{`#${order.orderID}`}</Typography>
                           </Button>
                           <span>
                              <Typography
                                 variant="body1"
                                 className={classNames(
                                    orderStatusColor(order.status),
                                    classes.orderStatusText,
                                    classes.textLeft
                                 )}
                              >
                                 {` ${orderStatusText(order.status)}`}
                              </Typography>
                           </span>
                           <IconButton
                              aria-haspopup="true"
                              color="inherit"
                              className={classNames(
                                 classes.orderPrintButton,
                                 classes.floatRight
                              )}
                           >
                              <PrintIcon />
                           </IconButton>
                        </div>
                        <div className={classes.clearBoth} />
                        <div className={classes.orderDetail}>
                           <Typography
                              variant="body2"
                              className={classes.orderClientName}
                           >
                              {order.name}
                           </Typography>
                           <Typography
                              variant="body1"
                              className={classNames(
                                 classes.textRight,
                                 classes.orderPrice
                              )}
                           >
                              {order.price} บาท
                           </Typography>
                        </div>
                        <div className={classes.orderDetail}>
                           <Typography
                              variant="subheading"
                              className={classes.orderTimeStamp}
                           >
                              {calculateDate(order.updatedTime)}
                           </Typography>
                        </div>
                     </CardContent>
                  </Card>
               ))}
         </React.Fragment>
      );

      const addNewBillPopup = (
         <Drawer
            anchor="bottom"
            open={this.state.isBottomDrawerOpened}
            onClose={this.toggleBottomDrawer.bind(this, false)}
         >
            <div
               tabIndex={0}
               role="button"
               onClick={this.toggleBottomDrawer.bind(this, false)}
               onKeyDown={this.toggleBottomDrawer.bind(this, false)}
            />
            {
               <React.Fragment>
                  <div className={classes.container}>
                     <CloseIcon
                        className={classes.icon}
                        onClick={this.toggleBottomDrawer.bind(this, false)}
                     />
                     <Typography variant="h5">เปิดบิลใหม่</Typography>
                     <TextField
                        id="outlined-name"
                        label="ชื่อลูกค้า"
                        value={this.state.customerNameField}
                        className={classes.textField}
                        onChange={this.handleTextFieldChange("customerName")}
                        margin="normal"
                        variant="outlined"
                     />
                     <Typography variant="h6">ลูกค้าล่าสุด</Typography>
                     <Card className={classes.card}>
                        <CardContent
                           style={{
                              display: "flex",
                              flexDirection: "column",
                              marginLeft: "6px"
                           }}
                        >
                           {
                              // From const orderCard
                              <div>
                                 {filteredOrders
                                    .sort(
                                       (a, b) =>
                                          moment(
                                             b.updatedTime,
                                             "DDMMYYYYhhmm"
                                          ).format("X") -
                                          moment(
                                             a.updatedTime,
                                             "DDMMYYYYhhmm"
                                          ).format("X")
                                    )
                                    .map(order => (
                                       <Card
                                          className={
                                             checked.indexOf(order.orderID) ===
                                             -1
                                                ? classes.orderCard
                                                : classNames(
                                                     classes.orderCard,
                                                     classes.orderCardActive
                                                  )
                                          }
                                          key={order.orderID}
                                          onClick={e => {
                                             this.setState({
                                                customerNameField: order.name
                                             });
                                          }}
                                       >
                                          <CardContent
                                             className={
                                                classes.orderCardContent
                                             }
                                          >
                                             <div>
                                                <Button
                                                   variant="contained"
                                                   color="primary"
                                                   className={classNames(
                                                      orderStatusColor(
                                                         order.status
                                                      ),
                                                      classes.orderStatusButton,
                                                      classes.textLeft
                                                   )}
                                                >
                                                   <Typography
                                                      variant="body2"
                                                      className={
                                                         classes.orderNumber
                                                      }
                                                   >{`#${
                                                      order.orderID
                                                   }`}</Typography>
                                                </Button>
                                             </div>
                                             <div
                                                className={classes.clearBoth}
                                             />
                                             <div
                                                className={classes.orderDetail}
                                             >
                                                <Typography
                                                   variant="body2"
                                                   className={
                                                      classes.orderClientName
                                                   }
                                                >
                                                   {order.name}
                                                </Typography>
                                             </div>
                                          </CardContent>
                                       </Card>
                                    ))}
                              </div>
                           }
                        </CardContent>
                     </Card>

                     <Button
                        variant="contained"
                        color="primary"
                        className={classes.button}
                        component={newOrder}
                     >
                        ต่อไป
                     </Button>
                  </div>
               </React.Fragment>
            }
         </Drawer>
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
                     <Typography
                        className={classes.appBarShopTitle}
                        variant="body2"
                        color="inherit"
                        noWrap
                     >
                        Something Apparel
                     </Typography>

                     {/* Search input */}
                     <div className={classes.search}>
                        {/* If there's an input, display close button  */}
                        {/* Else display search button with focus input function  */}
                        {term !== "" ? (
                           <IconButton
                              aria-haspopup="true"
                              disableRipple
                              onClick={this.resetSearchTerm}
                              color="inherit"
                              className={classes.searchIcon}
                           >
                              <CloseIcon />
                           </IconButton>
                        ) : (
                           <IconButton
                              aria-haspopup="true"
                              disableRipple
                              color="inherit"
                              onClick={this.focusSearchInput}
                              className={classes.searchIcon}
                           >
                              <SearchIcon />
                           </IconButton>
                        )}
                        <InputBase
                           placeholder="ชื่อลูกค้า / เลขบิล"
                           classes={{
                              root: classes.inputRoot,
                              input: classes.inputInput
                           }}
                           autoFocus
                           inputRef={searchInput => (this.myRef = searchInput)}
                           onChange={this.handleInputChange}
                           value={term}
                        />
                     </div>

                     <div className={classes.grow} />

                     {/* Menu for desktop version */}
                     <div className={classes.sectionDesktop}>
                        <Button
                           aria-owns={isMenuOpen ? "material-appbar" : null}
                           aria-haspopup="true"
                           onClick={this.handleStatusMenuOpen}
                           color="inherit"
                           className={classes.appBarMenuButton}
                        >
                           <CreateIcon className={classes.appBarMenuIcon} />
                           <Typography variant="body1" color="inherit" noWrap>
                              เปลี่ยนสถานะ
                           </Typography>
                        </Button>
                        <Button
                           aria-haspopup="true"
                           color="inherit"
                           className={classNames(
                              classes.appBarMenuButton,
                              classes.appBarMenuLastItem
                           )}
                        >
                           <MenuIcon className={classes.appBarMenuIcon} />
                           <Typography variant="body1" color="inherit" noWrap>
                              เมนูเพิ่มเติม
                           </Typography>
                        </Button>
                     </div>
                     <div className={classes.sectionMobile}>
                        <IconButton
                           aria-haspopup="true"
                           onClick={this.handleStatusMenuOpen}
                           color="inherit"
                        >
                           <CreateIcon />
                        </IconButton>
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

               {/* Content Display */}
               <div
                  className={classNames(
                     classes.sectionMobile,
                     classes.flexColumn
                  )}
               >
                  {/* Search results display */}
                  {results.length > 0 && (
                     <div>
                        <Paper className={classes.resultPaper}>
                           <Typography
                              className={classes.resultTitle}
                              variant="h5"
                              color="inherit"
                              noWrap
                           >
                              ผลการค้นหา
                           </Typography>
                           {searchResults}
                        </Paper>
                     </div>
                  )}

                  {/* Status tab display */}
                  <div className={classes.tabBar}>
                     <Tabs
                        value={value}
                        onChange={this.handleTabChange}
                        fullWidth
                     >
                        {orderStatus.map(status => (
                           <Tab key={status.id} label={status.name.th} />
                        ))}
                     </Tabs>
                  </div>
               </div>

               {/* Order list display */}
               <Paper
                  className={classNames(
                     classes.selectAllPaper,
                     classes.sectionMobile,
                     classes.flexColumn
                  )}
               >
                  {/* If there's no orders in the tab, display "ไม่มีออเดอร์" text */}
                  {filteredOrders.length === 0 ? (
                     <div className={classes.orderBlank}>
                        <CancelIcon className={classes.orderBlankIcon} />
                        <Typography
                           variant="body1"
                           align="center"
                           color="inherit"
                        >
                           ไม่มีออเดอร์
                        </Typography>
                     </div>
                  ) : /* Else show select all checkbox with a condition */
                  /* If there's order checked, display "เลือก " with selected orders amount */
                  checked.length === 0 ? (
                     <div className={classes.selectAll}>
                        <FormControlLabel
                           control={
                              <Checkbox
                                 checked={
                                    checked.length === filteredOrders.length
                                 }
                                 onChange={this.handleSelectAll}
                                 className={classes.selectAllCheckbox}
                              />
                           }
                           label="เลือกทั้งหมด"
                           className={classes.selectAllLabel}
                        />
                     </div>
                  ) : (
                     <div
                        className={classNames(
                           classes.selectAll,
                           classes.selectAllActive
                        )}
                     >
                        <FormControlLabel
                           control={
                              <Checkbox
                                 checked={
                                    checked.length === filteredOrders.length
                                 }
                                 onChange={this.handleSelectAll}
                                 className={classNames(
                                    classes.selectAllCheckbox,
                                    classes.selectAllCheckboxActive
                                 )}
                              />
                           }
                           label={`เลือก ${checked.length}`}
                           className={classNames(
                              classes.selectAllLabel,
                              classes.selectAllLabelActive
                           )}
                        />
                     </div>
                  )}
               </Paper>

               {/* Render menus */}
               {renderStatusMenu}
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
                     {value === 0 && <TabContainer>{orderCard}</TabContainer>}
                     {value === 1 && <TabContainer>{orderCard}</TabContainer>}
                     {value === 2 && <TabContainer>{orderCard}</TabContainer>}
                     {value === 3 && <TabContainer>{orderCard}</TabContainer>}

                     {/* Additional space at the bottom of content */}
                     <div className={classes.bottomSpace} />
                  </div>
               </div>

               {/* Display fixed footer */}
               <div className={classes.footer}>
                  <AppBar position="fixed" className={classes.footerAppBar}>
                     <Toolbar className={classes.footerToolbar}>
                        <Fab
                           aria-label="Add"
                           className={classes.footerFabButton}
                           // component={newOrder}
                           onClick={this.toggleBottomDrawer.bind(this, true)}
                        >
                           <AddIcon />
                        </Fab>
                     </Toolbar>
                  </AppBar>
               </div>

               {addNewBillPopup}
            </main>
         </React.Fragment>
      );
   }
}

export default withStyles(styles)(Merchant);
