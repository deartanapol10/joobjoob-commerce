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
   CardActions,
   CardActionArea,
   CardContent,
   CardMedia,
   Checkbox,
   Drawer,
   Divider,
   Fab,
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
   withStyles,
} from "@material-ui/core";

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
      const newOrder = orders.filter(
         order => order.status === orderStatus[statusIndex].name.en
      );
      this.setState({ filteredOrders: newOrder });
   };

   //// **** END FILTER ORDERS FUNCTIONS **** ////


   //// ---- SEARCH FUNCTIONS ---- ///

   // Reset search term and results
   resetSearchTerm = () => {
      this.setState({
         term: "",
         results: [],
      })
   };

   // Focus on search input
   focusSearchInput = () => {
      this.myRef.focus();
   };

   // Search - set term > filter results from orders in 300ms delay
   handleInputChange = event => {
      this.setState({
         term: event.target.value
      }, () => {
         setTimeout(() => {
            if(this.state.term.length < 1) return this.resetSearchTerm();

            const results = _.filter(this.state.products, _.flow(_.identity, _.values, _.join, _.toLower, _.partialRight(_.includes, this.state.term)));

            this.setState({
               results
            })
         }, 300)
      });
   };

   //// **** END SEARCH FUNCTIONS **** ////

   componentDidMount() {
      this.filterOrders(this.state.value);
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
      const {
         statusAnchorEl,
         menuAnchorEl,
         checked,
         value,
         filteredOrders,
         term,
         results,
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

      // Render search results from this.state.results
      const productSearchResults = (
         <React.Fragment>
               {results.map(result => (
                   <Card 
                     key="result.orderID" 
                     className={classes.productResultCard}
                  >
                     <CardActionArea>
                        <CardMedia
                           className={classes.productResultMedia}
                           image={result.image}
                           title="Contemplative Reptile"
                        />
                        <CardContent>
                           <Typography gutterBottom variant="h5" component="h2">
                              {result.name}
                           </Typography>
                           <Typography component="p">
                              {result.price}
                           </Typography>
                        </CardContent>
                     </CardActionArea>
                  </Card>
               ))}
         </React.Fragment>
      );

      
      // Render left drawer menu
      const sideList = (
         <div className={classes.list}>
            <List>
               {["เปิดบิลใหม่", "เพิ่มสินค้าใหม่", "เพิ่ม/แก้ไขการส่งใหม่"].map(
                  (text, index) => (
                     <ListItem button key={text}>
                        <ListItemIcon>
                           {index % 2 === 0 ? <InboxIcon /> : <MailIcon />}
                        </ListItemIcon>
                        <ListItemText primary={text} />
                     </ListItem>
                  )
               )}
            </List>
         </div>
      );


      const fullList = (
         <div className={classes.fullList}>
            <Typography>heeeeeeeeeeeeey</Typography>
         </div>
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
                        onClick={this.toggleMenuDrawer.bind(this, true)}
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
                           #0001
                        </Typography>
                        <Typography
                           className={classes.appBarOrderCustomerName}
                           variant="body1"
                           color="inherit"
                           noWrap
                        >
                           คุณมิ
                        </Typography>
                     </div>
                     <div className={classes.grow} />
                     <div className={classes.sectionMobile}>
                        <Typography
                           className={classes.appBarOrderProcess}
                           variant="h6"
                           color="inherit"
                        >
                           เลือกสินค้า
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

               {/* Content Display */}
               <div
                  className={classNames(
                     classes.sectionMobile,
                     classes.flexColumn
                  )}
               >
                  {/* Search input */ }
                  <div className={classes.productSearch}>
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
                        placeholder="ชื่อสินค้า / ราคา"
                        classes={{
                           root: classes.inputRoot,
                           input: classes.inputInput,
                        }}
                        autoFocus
                        inputRef={(searchInput) => this.myRef = searchInput}
                        onChange={this.handleInputChange}
                        value={term}
                     />
                  </div>
               </div>

               {/* Render menus */}
               {renderMenu}

               {/* Display scrollable ontent */}
               <div className={classes.content}>
                  {/* Search results display */}
                  {results.length > 0
                  && (
                     <div>
                        {productSearchResults}
                     </div>
                  )}     
               </div>

               {/* Display fixed footer */}
               <div className={classes.footer}>
                  <AppBar position="fixed" className={classes.footerAppBar}>
                     <Toolbar className={classes.footerToolbar}>
                        <Fab 
                           aria-label="Add" 
                           className={classes.footerFabButton}
                           component={newOrder}
                        >
                           <AddIcon />
                        </Fab>
                     </Toolbar>
                  </AppBar>
               </div>

               <Drawer
                  open={this.state.isMenuDrawerOpened}
                  onClose={this.toggleMenuDrawer.bind(this, false)}
               >
                  <div
                     tabIndex={0}
                     role="button"
                     onClick={this.toggleBottomDrawer.bind(this, true)}
                     onKeyDown={this.toggleMenuDrawer.bind(this, false)}
                  >
                     {sideList}
                  </div>
               </Drawer>

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
                  >
                     {fullList}
                  </div>
               </Drawer>
            </main>
         </React.Fragment>
      );
   }
}

export default withStyles(styles)(Merchant);
