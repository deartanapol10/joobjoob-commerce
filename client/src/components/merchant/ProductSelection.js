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
   CardActionArea,
   CardContent,
   CardMedia,
   Checkbox,
   Drawer,
   Divider,
   FormControlLabel,
   Grid,
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
import CheckIcon from "@material-ui/icons/CheckCircle";
import CheckIconOutline from "@material-ui/icons/CheckCircleOutline";
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
         badge: false,
         products: productsList,
         options: optionsList,
         selectedProduct: {},
         newProduct: {},
         print: {},
         term: "",
         results: [],
         isNewProductPopup: false,
         isEditProductPopup: false,
         isCustomizeProductPopup: false,
         productInfo: null,
         //editProductPopup
         productName: "",
         productPrice: "",
         productOption: "",
         //newProductPopup
         n: 1,
         //customizeProductPopup
         productType: "",
         productCategory: ""
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
                  this.state.products,
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

   handleProductSelect = value => () => {
      const { cart, badge } = this.state;
      const currentIndex = cart.indexOf(value);
      const newCart = [...cart];

      if (currentIndex === -1) {
         newCart.push(value);
      } else {
         newCart.splice(currentIndex, 1);
      }

      this.setState({
         cart: newCart
      });
   };

   componentDidMount() {
      const newArray = Object.values(this.state.products);
      this.setState({
         products: newArray
      });
   }

   newProductPopupDrawer = open => {
      this.setState({ isNewProductPopup: open });
   };

   editProductPopupDrawer = (open, product) => {
      this.setState({
         isEditProductPopup: open,
         productInfo: product
      });
   };

   customizeProductPopupDrawer = open => {
      this.setState({ isCustomizeProductPopup: open });
   };

   handleTextFieldChange = name => event => {
      if (name == "productOption" && event.target.value === 0) {
         this.editProductPopupDrawer(false);
         this.customizeProductPopupDrawer(true);
      } else {
         this.setState({ [name]: event.target.value });
      }
   };

   fileSelectedHandler = e => {
      console.log(e.target.files[0]);
   };

   render() {
      const { classes } = this.props;
      const {
         statusAnchorEl,
         menuAnchorEl,
         checked,
         value,
         filteredOrders,
         cart,
         badge,
         products,
         term,
         results
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

      const productDisplay = (
         <React.Fragment>
            {products.map(product => (
               <Grid key={product.id} item xs={6} sm={4} md={3} lg={2} xl={1}>
                  <Card className={classes.productResultCard}>
                     <CardActionArea
                        onClick={this.handleProductSelect(product.id)}
                     >
                        <CardMedia
                           className={classes.productResultMedia}
                           image={product.image}
                           title={product.name}
                        />
                        <CardContent>
                           <div className={classes.productResultTitleTruncate}>
                              <Typography
                                 variant="h5"
                                 component="h2"
                                 className={classes.productResultTitle}
                              >
                                 {product.name}
                              </Typography>
                           </div>
                           <Typography
                              component="p"
                              className={classes.productResultPrice}
                           >
                              {product.price} บาท
                           </Typography>
                        </CardContent>
                        <div
                           className={
                              cart.indexOf(product.id) === -1
                                 ? classes.productResultCheck
                                 : classNames(
                                      classes.productResultCheck,
                                      classes.productResultCheckActive
                                   )
                           }
                        >
                           <Checkbox
                              checked={cart.indexOf(product.id) !== -1}
                              value={product.id}
                              classes={{
                                 root: classes.productResultRoot,
                                 checked: classes.productResultChecked
                              }}
                              icon={<CheckIconOutline />}
                              checkedIcon={<CheckIcon />}
                           />
                        </div>
                     </CardActionArea>
                     <CardActions className={classes.productResultActions}>
                        <Button
                           size="small"
                           className={classes.productResultEditButton}
                           onClick={this.editProductPopupDrawer.bind(
                              this,
                              true,
                              product
                           )}
                        >
                           <CreateIcon
                              className={classNames(
                                 classes.iconLeft,
                                 classes.iconSmall
                              )}
                           />
                           แก้ไขสินค้า
                        </Button>
                     </CardActions>
                  </Card>
               </Grid>
            ))}
         </React.Fragment>
      );

      // Render search results from this.state.results
      const productSearchResults = (
         <React.Fragment>
            {results.map(result => (
               <Grid item xs={6} sm={4} md={3} lg={2} xl={1}>
                  <Card key={result.id} className={classes.productResultCard}>
                     <CardActionArea
                        onClick={this.handleProductSelect(result.id)}
                     >
                        <CardMedia
                           className={classes.productResultMedia}
                           image={result.image}
                           title={result.name}
                        />
                        <CardContent>
                           <Typography
                              variant="h5"
                              component="h2"
                              className={classes.productResultTitle}
                           >
                              {result.name}
                           </Typography>
                           <Typography
                              component="p"
                              className={classes.productResultPrice}
                           >
                              {result.price} บาท
                           </Typography>
                        </CardContent>
                        <div
                           className={
                              cart.indexOf(result.id) === -1
                                 ? classes.productResultCheck
                                 : classNames(
                                      classes.productResultCheck,
                                      classes.productResultCheckActive
                                   )
                           }
                        >
                           <Checkbox
                              checked={cart.indexOf(result.id) !== -1}
                              value={result.id}
                              classes={{
                                 root: classes.productResultRoot,
                                 checked: classes.productResultChecked
                              }}
                              icon={<CheckIconOutline />}
                              checkedIcon={<CheckIcon />}
                           />
                        </div>
                     </CardActionArea>
                     <CardActions className={classes.productResultActions}>
                        <Button
                           size="small"
                           className={classes.productResultEditButton}
                        >
                           <CreateIcon
                              className={classNames(
                                 classes.iconLeft,
                                 classes.iconSmall
                              )}
                           />
                           แก้ไขสินค้า
                        </Button>
                     </CardActions>
                  </Card>
               </Grid>
            ))}
         </React.Fragment>
      );

      function NewProductField(props) {
         let fields = [];

         for (let i = 0; i < props.n; i++) {
            fields.push(
               <React.Fragment key={i}>
                  <div style={{ display: "flex" }}>
                     <img
                        src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTdovB83ce6JNsKorhNyALxRBI8jG07JOxqld-Hb5D0BiJnlVwu"
                        width="150"
                        height="150"
                        alt=""
                     />
                     <div
                        style={{
                           display: "flex",
                           flexDirection: "column",
                           flexGrow: "2"
                        }}
                     >
                        <TextField
                           id="outlined-name"
                           label="ชื่อสินค้า"
                           // value={this.state.productName}
                           className={classes.textField}
                           // onChange={this.handleChange("productName")}
                           margin="normal"
                           variant="outlined"
                        />
                        <div
                           style={{
                              display: "flex"
                           }}
                        >
                           <TextField
                              id="outlined-name"
                              label="ราคา"
                              // value={this.state.productInfo.price}
                              className={classes.textField}
                              // onChange={this.handleTextFieldChange(
                              //    "productPrice"
                              // )}
                              margin="normal"
                              variant="outlined"
                              InputProps={{
                                 endAdornment: (
                                    <InputAdornment position="end">
                                       บาท
                                    </InputAdornment>
                                 )
                              }}
                           />
                        </div>
                     </div>
                  </div>
                  <Divider />
               </React.Fragment>
            );
         }
         return <React.Fragment>{fields}</React.Fragment>;
      }

      const newProductPopup = (
         <React.Fragment>
            <Drawer
               anchor="bottom"
               open={this.state.isNewProductPopup}
               onClose={this.newProductPopupDrawer.bind(this, false)}
            >
               <div
                  tabIndex={0}
                  role="button"
                  onClick={this.newProductPopupDrawer.bind(this, false)}
                  onKeyDown={this.newProductPopupDrawer.bind(this, false)}
               />
               {
                  <div className={classes.drawerContainer}>
                     <div style={{ textAlign: "right" }}>
                        <CloseIcon
                           style={{ cursor: "pointer" }}
                           onClick={this.newProductPopupDrawer.bind(
                              this,
                              false
                           )}
                        />
                     </div>

                     <Typography variant="h5">เพิ่มสินค้าใหม่</Typography>
                     <NewProductField n={this.state.n} />

                     <Fab
                        style={{ margin: "50px auto" }}
                        aria-label="Add"
                        className={classes.footerFabButton}
                        onClick={() => {
                           this.setState(prevState => ({ n: prevState.n + 1 }));
                        }}
                     >
                        <AddIcon />
                     </Fab>
                     <Button
                        variant="contained"
                        color="primary"
                        className={classes.button}
                        fullWidth
                     >
                        {`เพิ่มสินค้า (${this.state.n})`}
                     </Button>
                  </div>
               }
            </Drawer>
         </React.Fragment>
      );

      const tempOptions = [
         {
            label: "ขนาด",
            type: "size",
            category: [
               { cat: "s", price: 100.0 },
               { cat: "m", price: 200.0 },
               { cat: "l", price: 300.0 },
               { cat: "xl", price: 400.0 }
            ]
         },
         {
            label: "สี",
            type: "color",
            category: [
               { cat: "แดง", price: 399.0 },
               { cat: "ขาว", price: 499.0 },
               { cat: "เหลือง", price: 599.0 }
            ]
         },
         {
            label: "iPhone",
            type: "iphone",
            category: [
               { cat: "iPhone 6", price: 599.0 },
               { cat: "iPhone 6s", price: 699.0 },
               { cat: "iPhone 7", price: 799.0 },
               { cat: "iPhone 8", price: 799.0 }
            ]
         },
         ,
      ];

      const editProductPopup = this.state.productInfo && (
         <React.Fragment>
            <Drawer
               anchor="bottom"
               open={this.state.isEditProductPopup}
               onClose={this.editProductPopupDrawer.bind(this, false)}
            >
               <div
                  tabIndex={0}
                  role="button"
                  onClick={this.editProductPopupDrawer.bind(this, false)}
                  onKeyDown={this.editProductPopupDrawer.bind(this, false)}
               />
               {
                  <React.Fragment>
                     <div className={classes.drawerContainer}>
                        <div style={{ textAlign: "right" }}>
                           <CloseIcon
                              style={{ cursor: "pointer" }}
                              onClick={this.editProductPopupDrawer.bind(
                                 this,
                                 false
                              )}
                           />
                        </div>
                        <Typography variant="h5">แก้ไขสินค้า</Typography>

                        <input
                           accept="image/*"
                           className={classes.input}
                           type="file"
                           ref={fileInput => (this.fileInput = fileInput)}
                           onChange={this.fileSelectedHandler}
                        />

                        <CardMedia
                           className={classes.productResultMedia}
                           image={this.state.productInfo.image}
                           title={this.state.productInfo.name}
                           style={{
                              width: "40%",
                              margin: "auto",
                              cursor: "pointer"
                           }}
                           onClick={() => this.fileInput.click()}
                        />

                        <div
                           style={{
                              display: "flex",
                              flexDirection: "column",
                              flexGrow: "2"
                           }}
                        >
                           <TextField
                              id="outlined-name"
                              label="ชื่อสินค้า"
                              value={this.state.productInfo.name}
                              className={classes.textField}
                              onChange={this.handleTextFieldChange(
                                 "productName"
                              )}
                              margin="normal"
                              variant="outlined"
                           />
                           <div
                              style={{
                                 display: "flex",
                                 justifyContent: "space-between"
                              }}
                           >
                              <TextField
                                 id="outlined-name"
                                 label="ราคา"
                                 value={this.state.productInfo.price}
                                 className={classes.textField}
                                 onChange={this.handleTextFieldChange(
                                    "productPrice"
                                 )}
                                 margin="normal"
                                 variant="outlined"
                                 InputProps={{
                                    endAdornment: (
                                       <InputAdornment position="end">
                                          บาท
                                       </InputAdornment>
                                    )
                                 }}
                                 style={{ marginRight: "15px" }}
                              />
                              <TextField
                                 id="outlined-name"
                                 select
                                 label="ไม่ระบุแบบสินค้า"
                                 value={this.state.productOption}
                                 className={classes.textField}
                                 onChange={this.handleTextFieldChange(
                                    "productOption"
                                 )}
                                 SelectProps={{
                                    MenuProps: {
                                       className: classes.menu
                                    }
                                 }}
                                 margin="normal"
                                 variant="outlined"
                                 fullWidth
                              >
                                 {tempOptions.map((option, index) => (
                                    <MenuItem key={index} value={option.type}>
                                       {option.label}
                                    </MenuItem>
                                 ))}
                                 <Divider />
                                 <MenuItem value={0}>
                                    {"+ จัดการแบบสินค้า"}
                                 </MenuItem>
                              </TextField>
                           </div>
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
                  </React.Fragment>
               }
            </Drawer>
         </React.Fragment>
      );

      const customizeProductPopup = (
         <React.Fragment>
            <Drawer
               anchor="bottom"
               open={this.state.isCustomizeProductPopup}
               onClose={this.customizeProductPopupDrawer.bind(this, false)}
            >
               <div
                  tabIndex={0}
                  role="button"
                  onClick={this.customizeProductPopupDrawer.bind(this, false)}
                  onKeyDown={this.customizeProductPopupDrawer.bind(this, false)}
               />
               {
                  <React.Fragment>
                     <div className={classes.drawerContainer}>
                        <div style={{ textAlign: "right" }}>
                           <CloseIcon
                              style={{ cursor: "pointer" }}
                              onClick={this.customizeProductPopupDrawer.bind(
                                 this,
                                 false
                              )}
                           />
                        </div>

                        <Typography variant="h5">จัดการแบบสินค้า</Typography>
                        <Typography variant="p">
                           กรุณาเลือกรูปแบบสินค้าที่ต้องการหรือสร้างใหม่
                        </Typography>
                        {tempOptions.map((option, index) => (
                           <React.Fragment>
                              <Card>
                                 <CardActionArea
                                    style={{
                                       display: "flex",
                                       justifyContent: "space-between",
                                       padding: "10px 30px"
                                    }}
                                    onClick={e => {
                                       this.setState({
                                          productType: option.type,
                                          productCategory: option.category
                                       });
                                    }}
                                 >
                                    <Typography variant="h5">
                                       {option.type}
                                    </Typography>
                                    <div style={{ display: "flex" }}>
                                       {option.category.map(each => (
                                          <Typography variant="p">
                                             {" " + each.cat + ","}
                                          </Typography>
                                       ))}
                                    </div>
                                 </CardActionArea>
                              </Card>
                           </React.Fragment>
                        ))}
                        <Card style={{ margin: "20px 5px", padding: "20px" }}>
                           <div
                              style={{ textAlign: "left", marginLeft: "15px" }}
                           >
                              <TextField
                                 id="standard-name"
                                 label="ชื่อรูปแบบสินค้า"
                                 className={classes.textField}
                                 value={this.state.productType || null}
                                 //   onChange={handleChange('name')}
                                 margin="normal"
                                 style={{ marginBottom: "-1px" }}
                              />
                           </div>

                           <Divider />

                           {this.state.productCategory ? (
                              this.state.productCategory.map(each => (
                                 <div
                                    style={{
                                       display: "flex"
                                    }}
                                 >
                                    <TextField
                                       id="outlined-name"
                                       label="รูปแบบสินค้า"
                                       value={each.cat}
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
                                       value={each.price}
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
                                    label="รูปแบบสินค้า"
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

                           {this.state.productCategory ? (
                              <Button
                                 variant="contained"
                                 color="primary"
                                 className={classes.button}
                              >
                                 แก้ไขแบบสินค้า
                              </Button>
                           ) : (
                              <Button
                                 variant="contained"
                                 color="primary"
                                 className={classes.button}
                              >
                                 เพิ่มแบบสินค้าใหม่
                              </Button>
                           )}
                        </Card>

                        <Button
                           variant="contained"
                           color="primary"
                           className={classes.button}
                           fullWidth
                        >
                           เสร็จสิ้น
                        </Button>
                     </div>
                  </React.Fragment>
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
                  {/* Search input */}
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
                           input: classes.inputInput
                        }}
                        autoFocus
                        inputRef={searchInput => (this.myRef = searchInput)}
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
                  {results.length > 0 ? (
                     <Grid
                        container
                        spacing={16}
                        className={classes.productResultGrid}
                     >
                        {productSearchResults}
                     </Grid>
                  ) : term !== "" ? (
                     <div className={classes.orderBlank}>
                        <CancelIcon className={classes.orderBlankIcon} />
                        <Typography
                           variant="body1"
                           align="center"
                           color="inherit"
                        >
                           ไม่พบสินค้า
                        </Typography>
                     </div>
                  ) : (
                     <Grid
                        container
                        spacing={16}
                        className={classes.productResultGrid}
                     >
                        {productDisplay}
                     </Grid>
                  )}
               </div>

               {/* Display fixed footer */}
               <div className={classes.footer}>
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
                           onClick={this.newProductPopupDrawer.bind(this, true)}
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

               {newProductPopup}
               {editProductPopup}
               {customizeProductPopup}
            </main>
         </React.Fragment>
      );
   }
}

export default withStyles(styles)(Merchant);
