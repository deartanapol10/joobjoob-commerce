import _ from "lodash";
import React, { Component } from "react";
import moment from "moment";
import "moment/locale/th";

import classNames from "classnames";

import {
   AppBar,
   Toolbar,
   IconButton,
   InputBase,
   Typography,
   MenuItem,
   Fab,
   Menu,
   Button,
   Avatar,
   Tabs,
   Tab,
   Paper,
   Card,
   CardContent,
   CardMedia,
   Checkbox,
   FormControlLabel,
   ListItemText,
   ListSubheader,
   ListItemSecondaryAction,
   Modal,
   TextField,
   MenuList,
   Drawer
} from "@material-ui/core";

import List from "@material-ui/core/List";
import Divider from "@material-ui/core/Divider";
import ListItem from "@material-ui/core/ListItem";
import ListItemIcon from "@material-ui/core/ListItemIcon";
import InboxIcon from "@material-ui/icons/MoveToInbox";
import MailIcon from "@material-ui/icons/Mail";

import CreateIcon from "@material-ui/icons/Create";

import { withStyles } from "@material-ui/core/styles";

import AddIcon from "@material-ui/icons/Add";
import AddCircleIcon from "@material-ui/icons/AddCircle";
import PrintIcon from "@material-ui/icons/Print";
import MenuIcon from "@material-ui/icons/Menu";
import SearchIcon from "@material-ui/icons/Search";

import SALogo from "../../images/sa-logo.png";

import {
   orderStatus,
   paymentStatus,
   originalOrders,
   customerNamesList,
   productsList,
   optionsList
} from "./data";

import styles from "./styles";

const orderSteps = ["กรุณากรอกชื่อลูกค้า", "รถเข็น", "สรุปข้อมูล"];

moment.locale("th");

function TabContainer(props) {
   return <React.Fragment>{props.children}</React.Fragment>;
}

class App extends Component {
   state = {
      statusAnchorEl: null,
      menuAnchorEl: null,
      mobileMoreAnchorEl: null,
      value: 0,
      checked: [],
      orders: originalOrders,
      filteredOrders: [],
      orderPopup: false,
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

   /*getOrderStepContent = step => {
      switch (step) {
         case 0:
            return (
               <React.Fragment>
                  <TextField
                     required
                     id="customer-name-field"
                     label="ชื่อลูกค้า"
                     value={this.state.newCustomerName}
                     className={this.props.classes.textField}
                     margin="normal"
                     variant="outlined"
                     onChange={this.handleNewName}
                     fullWidth
                  />
                  <Typography
                     variant="body2"
                     className={classNames(
                        this.props.classes.titleMarginBottom,
                        this.props.classes.titleMarginTop
                     )}
                  >
                     ลูกค้าเดิม
                  </Typography>
                  <Paper className={this.props.classes.prevCustomerPaper}>
                     <MenuList>
                        {this.state.customerNames.map(customer => (
                           <MenuItem
                              className={this.props.classes.menuItem}
                              key={customer.id}
                              onClick={this.handlePrevName.bind(
                                 this,
                                 customer.name
                              )}
                           >
                              <ListItemText
                                 classes={{
                                    primary: this.props.classes.primary
                                 }}
                                 primary={customer.name}
                              />
                           </MenuItem>
                        ))}
                     </MenuList>
                  </Paper>
                  {this.state.newCustomerName === "" ? (
                     <Button
                        variant="contained"
                        color="secondary"
                        className={classNames(
                           this.props.classes.orderPopupButton
                        )}
                        disabled
                        fullWidth
                     >
                        ต่อไป
                     </Button>
                  ) : (
                     <Button
                        variant="contained"
                        color="secondary"
                        className={classNames(
                           this.props.classes.orderPopupButton
                        )}
                        fullWidth
                        onClick={this.handleNextStep}
                     >
                        ต่อไป
                     </Button>
                  )}
               </React.Fragment>
            );
         case 1:
            return (
               <React.Fragment>
                  <Paper className={this.props.classes.productsPaper}>
                     {this.state.cart.length > 0 &&
                        this.state.cart.map(item => (
                           <Card
                              key={item.id}
                              className={classNames(
                                 this.props.classes.popupCard,
                                 this.props.classes.itemCard
                              )}
                           >
                              <CardMedia
                                 className={this.props.classes.popupCardImage}
                                 image={item.image}
                                 title={item.name}
                              />
                              <div
                                 className={this.props.classes.popupCardDetails}
                              >
                                 <CardContent
                                    className={
                                       this.props.classes.popupCardContent
                                    }
                                 >
                                    <Typography variant="body2" noWrap>
                                       {item.name}
                                    </Typography>
                                    <Typography variant="body1">
                                       {item.price} บาท
                                    </Typography>
                                 </CardContent>
                              </div>
                           </Card>
                        ))}
                  </Paper>
                  <Button
                     variant="fab"
                     mini
                     color="secondary"
                     aria-label="Add"
                     className={this.props.classes.newOrderButton}
                     onClick={this.handleAddProductOpen}
                  >
                     <AddIcon />
                  </Button>
                  <Typography
                     variant="body2"
                     className={classNames(
                        this.props.classes.titleMarginBottom
                     )}
                  >
                     เพิ่มสินค้า
                  </Typography>
                  {this.state.cart.length === 0 ? (
                     <Button
                        variant="contained"
                        color="secondary"
                        className={classNames(
                           this.props.classes.orderPopupButton
                        )}
                        disabled
                        fullWidth
                     >
                        ต่อไป
                     </Button>
                  ) : (
                     <Button
                        variant="contained"
                        color="secondary"
                        className={classNames(
                           this.props.classes.orderPopupButton
                        )}
                        fullWidth
                        onClick={this.handleNextStep}
                     >
                        ต่อไป
                     </Button>
                  )}
               </React.Fragment>
            );
         case 2:
            return (
               <React.Fragment>
                  <div>step 3</div>
                  <Button
                     variant="contained"
                     color="secondary"
                     className={classNames(this.props.classes.orderPopupButton)}
                     fullWidth
                     onClick={this.handleOrderSubmit}
                  >
                     ต่อไป
                  </Button>
               </React.Fragment>
            );
         default:
            return (
               <React.Fragment>
                  <Typography variant="body2">
                     ระบบขัดข้อง กรุณาลองใหม่อีกครั้ง
                  </Typography>
               </React.Fragment>
            );
      }
   };*/

   handleStatusMenuOpen = event => {
      this.setState({ statusAnchorEl: event.currentTarget });
   };
   
   handleMenuOpen = event => {
      this.setState({ menuAnchorEl: event.currentTarget });
   };

   handleMenuClose = () => {
      this.setState({ statusAnchorEl: null });
      this.setState({ menuAnchorEl: null });
      this.handleMobileMenuClose();
   };

   handleMobileMenuOpen = event => {
      this.setState({ mobileMoreAnchorEl: event.currentTarget });
   };

   handleMobileMenuClose = () => {
      this.setState({ mobileMoreAnchorEl: null });
   };

   handleTabChange = (event, value) => {
      this.setState({ filteredOrders: [] });
      this.setState({ value });
      this.filterOrders(value);
      this.setState({ checked: [] });
      this.handleMenuClose();
   };

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
                  //this.filterOrders(this.state.value);
               }
            );
         }
         this.handleTabChange(null, this.state.value);
      } else {
         this.handleMenuClose();
      }
   }

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

   handleSelectAll = event => {
      const { checked } = this.state;
      if (event.target.checked) {
         this.setState(state => ({
            checked: this.state.filteredOrders.map(o => o.orderID)
         }));
         return;
      }
      this.setState({ checked: [] });
   };

   handleSelectAllCheckbox = () => {
      this.setState(state => ({
         checked: this.state.filteredOrders.map(o => o.orderID)
      }));
      this.handleMenuClose();
   };

   filterOrders = statusIndex => {
      const { orders, filteredOrders } = this.state;
      const newOrder = orders.filter(
         order => order.status === orderStatus[statusIndex].name.en
      );
      this.setState({ filteredOrders: newOrder });
   };

   handleOrderPopupOpen = () => {
      this.setState({ orderPopup: true });
      this.handleMenuClose();
   };

   handleOrderPopupClose = () => {
      this.setState({
         orderPopup: false
         /*activeOrderStep: 0,*/
      });
   };

   handleAddProductOpen = () => {
      this.setState({ addProductPopup: true });
   };

   handleAddProductClose = () => {
      this.setState({ addProductPopup: false });
   };

   handleProductOptionOpen = () => {
      this.setState({ productOptionPopup: true });
   };

   handleProductOptionClose = () => {
      this.setState({ productOptionPopup: false });
   };

   handleNewName = event => {
      this.setState({ newCustomerName: event.target.value });
   };

   handlePrevName = name => {
      this.setState({ newCustomerName: name });
   };

   handleNextStep = () => {
      let { activeOrderStep } = this.state;
      activeOrderStep += 1;
      this.setState({ activeOrderStep });
   };

   handleSelectProduct = productID => {
      const { products } = this.state;
      const selectedProduct = products.filter(
         product => product.id === productID
      );
      this.setState(
         {
            selectedProduct: selectedProduct[0]
         },
         () => {
            if (this.state.selectedProduct.option.length > 0) {
               this.handleAddProductClose();
               this.handleProductOptionOpen();
            } else {
               this.setState(
                  prevState => ({
                     cart: [...prevState.cart, this.state.selectedProduct],
                     cartTotal:
                        prevState.cartTotal + this.state.selectedProduct.price
                  }),
                  () => {
                     this.handleAddProductClose();
                  }
               );
            }
         }
      );
   };

   handleOrderSubmit = () => {
      const { cart, cartTotal, newCustomerName, orders } = this.state;
      const newOrder = {
         status: "created",
         name: newCustomerName,
         items: cart,
         price: cartTotal
      };

      this.setState(
         prevState => ({
            orders: [...prevState.orders, newOrder]
         }),
         () => {
            this.handleOrderPopupClose();
            this.resetState();
            this.filterOrders(this.state.value);
         }
      );
   };

   resetSearchTerm = () => {
      this.setState({
         term: "",
         results: [],
      })
   }

   handleInputChange = event => {
      this.setState({
         term: event.target.value
      }, () => {
         setTimeout(() => {
            if(this.state.term.length < 1) return this.resetSearchTerm();

            const results = _.filter(this.state.orders, _.flow(_.identity, _.values, _.join, _.toLower, _.partialRight(_.includes, this.state.term)));

            this.setState({
               results
            })
         }, 300)
      });
   };

   resetState = () => {
      this.setState({
         newCustomerName: "",
         activeOrderStep: 0,
         cart: [],
         cartTotal: 0,
         selectedProduct: {},
         newProduct: {}
      });
   };

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
         mobileMoreAnchorEl,
         checked,
         value,
         orders,
         filteredOrders,
         customerNames,
         newCustomerName,
         activeOrderStep,
         products,
         options,
         selectedProduct,
         cart,
         newProduct,
         results,
      } = this.state;
      const isStatusMenuOpen = Boolean(statusAnchorEl);
      const isMenuOpen = Boolean(menuAnchorEl);
      const isMobileMenuOpen = Boolean(mobileMoreAnchorEl);

      function statusColor(status) {
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

      function statusText(status) {
         const alternateStatus = orderStatus.filter(
            thaiStatus => thaiStatus.name.en === status
         );
         return alternateStatus[0].name.th;
      }

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

      function calculateDate(startDate) {
         const time = moment(startDate, "DDMMYYYYhhmm").fromNow();
         return time;
      }

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
                  className={classes.menuItem}
               >
                  {status.name.th}
               </MenuItem>
            ))}
         </Menu>
      );

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
               onClick={this.handleOrderPopupOpen.bind(this)}
               className={classes.menuItem}
            >
               เปิดบิลใหม่
            </MenuItem>
            <MenuItem 
               key="select_all"
               onClick={this.handleSelectAllCheckbox.bind(this)}
               className={classes.menuItem}
            >
               เลือกทั้งหมด
            </MenuItem>
            <MenuItem 
               key="print_selected"
               className={classes.menuItem}
            >
               พิมพ์ที่เลือก
            </MenuItem>
         </Menu>
      );

      // const renderMobileMenu = (
      // 	<Menu
      // 		anchorEl={mobileMoreAnchorEl}
      // 		anchorOrigin={{ vertical: 'top', horizontal: 'right' }}
      // 		transformOrigin={{ vertical: 'top', horizontal: 'right' }}
      // 		open={isMobileMenuOpen}
      // 		onClose={this.handleMobileMenuClose}
      // 		>
      // 		<MenuItem onClick={this.handleStatusMenuOpen}>
      // 			<CreateIcon className={classes.menuIcon} />
      // 			<p>เปลี่ยนสถานะ</p>
      // 		</MenuItem>
      // 	</Menu>
      // );

      const searchResults = (
         <React.Fragment>
            <div className={classes.resultPaper}>
               {results.map(result => (
                   <Card key="result.orderID" className={classes.resultCard}>
                     <div className={classes.receiptDetailLess2}>
                        <Button
                           variant="contained"
                           color="primary"
                           className={classNames(
                              statusColor(result.status),
                              classes.statusButton,
                              classes.textLeft
                           )}
                        >
                        <Typography variant="body2" className={classes.orderNumber}>{`#${result.orderID}`}</Typography>
                        </Button>
                     </div>
                     <div className={classes.resultDetailLess}>
                        <Typography variant="body2" className={classes.orderClientName}>{result.name}</Typography>
                        <Typography
                           variant="body1"
                           className={classNames(classes.textRight, classes.orderPrice)}
                        >
                           {result.price} บาท
                        </Typography>
                     </div>
                  </Card>
               ))}
            </div>
         </React.Fragment>
      );

      const table = (
         <React.Fragment>
            {filteredOrders
               .sort((a, b) => moment(b.updatedTime, "DDMMYYYYhhmm").format("X") - moment(a.updatedTime, "DDMMYYYYhhmm").format("X"))
               .map(order => (
               <Card
                  className={
                     checked.indexOf(order.orderID) === -1
                     ?
                     classes.card
                     :
                     classNames(classes.card, classes.cardActive)
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
                     className={checked.indexOf(order.orderID) === -1
                        ?
                        classes.orderCheckbox
                        :
                        classNames(classes.orderCheckbox, classes.orderCheckboxActive)
                     }
                  />
                  <CardContent className={classes.cardContent}>
                     <div className={classes.receiptDetailLess2}>
                        <Button
                           variant="contained"
                           color="primary"
                           className={classNames(
                              statusColor(order.status),
                              classes.statusButton,
                              classes.textLeft
                           )}
                        >
                        <Typography variant="body2" className={classes.orderNumber}>{`#${order.orderID}`}</Typography>
                        </Button>
                        <span>
                           <Typography 
                              variant="body1" 
                              className={classNames(statusColor(order.status), classes.statusText, classes.textLeft)}
                           >
                                 {` ${statusText(order.status)}`}
                           </Typography>
                        </span>
                        <IconButton
                           aria-haspopup="true"
                           color="inherit"
                           className={classNames(classes.printButton, classes.floatRight)}
                        >
                           <PrintIcon />
                        </IconButton>
                     </div>
                     <div className={classes.clearBoth}></div>
                     <div className={classes.receiptDetailLess}>
                        <Typography variant="body2" className={classes.orderClientName}>{order.name}</Typography>
                        <Typography
                           variant="body1"
                           className={classNames(classes.textRight, classes.orderPrice)}
                        >
                           {order.price} บาท
                        </Typography>
                     </div>
                     <div className={classes.receiptDetailLess}>
                           <Typography variant="subheading" className={classes.orderTimeStamp}>
                              {calculateDate(order.updatedTime)}
                           </Typography>
                     </div>
                  </CardContent>
               </Card>
            ))}
         </React.Fragment>
      );

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
            <main className={classes.layout}>
               <AppBar
                  position="relative"
                  color="secondary"
                  className={classes.header}
               >
                  <Toolbar>
                     <IconButton
                        className={classes.menuButton}
                        color="inherit"
                        onClick={this.toggleMenuDrawer.bind(this, true)}
                     >
                        <Avatar
                           alt="Something Apparel"
                           src={SALogo}
                           className={classes.avatar}
                        />
                     </IconButton>
                     <Typography
                        className={classes.title}
                        variant="body2"
                        color="inherit"
                        noWrap
                     >
                        Something Apparel
                     </Typography>
                     <div className={classes.search}>
                        <div className={classes.searchIcon}>
                           <SearchIcon />
                        </div>
                        <InputBase
                           placeholder="ชื่อลูกค้า / เลขบิล"
                           classes={{
                              root: classes.inputRoot,
                              input: classes.inputInput,
                           }}
                           onChange={this.handleInputChange}
                        />
                        <div className={classes.searchResult}>
                           {searchResults}
                        </div>
                     </div>
                     <div className={classes.grow} />
                     <div className={classes.sectionDesktop}>
                        <Button
                           aria-owns={isMenuOpen ? "material-appbar" : null}
                           aria-haspopup="true"
                           onClick={this.handleStatusMenuOpen}
                           color="inherit"
                           className={classes.appBarButton}
                        >
                           <CreateIcon className={classes.menuIcon} />
                           <Typography
                              className={classes.title}
                              variant="body1"
                              color="inherit"
                              noWrap
                           >
                              เปลี่ยนสถานะ
                           </Typography>
                        </Button>
                        <Button
                           aria-haspopup="true"
                           color="inherit"
                           className={classNames(
                              classes.appBarButton,
                              classes.lastItem
                           )}
                        >
                           <MenuIcon className={classes.menuIcon} />
                           <Typography
                              className={classes.title}
                              variant="body1"
                              color="inherit"
                              noWrap
                           >
                              เพิ่มออเดอร์
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
               <div
                  className={classNames(
                     classes.sectionMobile,
                     classes.flexColumn
                  )}
               >
                  <div className={classes.tabBar}>
                     <Tabs value={value} onChange={this.handleTabChange} fullWidth>
                        {orderStatus.map(status => (
                           <Tab key={status.id} label={status.name.th} />
                        ))}
                     </Tabs>
                  </div>
               </div>
               <Paper
                  className={classNames(
                     classes.selectAllPaper,
                     classes.sectionMobile,
                     classes.flexColumn
                  )}
               >
                  {filteredOrders.length === 0 ? (
                     <Typography
                        variant="body2"
                        className={classes.titleMarginBottom}
                        align="center"
                        className={classes.blankOrder}
                     >
                        ไม่มีออเดอร์
                     </Typography>
                  )
                  :
                  ( 
                     checked.length === 0
                     ?
                     <div className={classes.selectAll}>
                        <FormControlLabel
                           control={
                              <Checkbox
                                 checked={
                                    checked.length ===
                                    filteredOrders.length
                                 }
                                 onChange={this.handleSelectAll}
                                 className={classes.selectAllCheckbox}
                              />
                           }
                           label="เลือกทั้งหมด"
                           className={classes.selectAllLabel}
                        />
                     </div>
                     :
                     <div className={classNames(classes.selectAll, classes.selectAllActive)}>
                        <FormControlLabel
                           control={
                              <Checkbox
                                 checked={
                                    checked.length ===
                                    filteredOrders.length
                                 }
                                 onChange={this.handleSelectAll}
                                 className={classNames(classes.selectAllCheckbox,classes.selectAllCheckboxActive)}
                              />
                           }
                           label={`เลือก ${checked.length}`}
                           className={classNames(classes.selectAllLabel, classes.selectAllLabelActive)}
                        />
                     </div>
                  )
               }
               </Paper>
               {renderStatusMenu}
               {renderMenu}
               {/*renderMobileMenu*/}
               <div className={classes.content}>
                  <div
                     className={classNames(
                        classes.sectionMobile,
                        classes.flexColumn
                     )}
                  >
                     {value === 0 && <TabContainer>{table}</TabContainer>}
                     {value === 1 && <TabContainer>{table}</TabContainer>}
                     {value === 2 && <TabContainer>{table}</TabContainer>}
                     {value === 3 && <TabContainer>{table}</TabContainer>}
                  </div>

                  {/*<div
                     className={classNames(
                        classes.sectionMobile,
                        classes.newOrder
                     )}
                  >
                     <Modal
                        aria-labelledby="new-order-popup"
                        aria-describedby="add-new-order"
                        open={this.state.orderPopup}
                        onClose={this.handleOrderPopupClose}
                     >
                        <Paper className={classes.orderPopup}>
                           {activeOrderStep < orderSteps.length && (
                              <Typography
                                 variant="title"
                                 className={classes.titleMarginBottom}
                              >
                                 {orderSteps[activeOrderStep]}
                              </Typography>
                           )}
                           {this.getOrderStepContent(activeOrderStep)}
                        </Paper>
                     </Modal>
                  </div>
                  */}

                  <div
                     className={classNames(
                        classes.sectionMobile,
                        classes.addProduct
                     )}
                  >
                     <Modal
                        aria-labelledby="add-product-to-cart"
                        aria-describedby="add-existing-product-or-create-new-product"
                        open={this.state.addProductPopup}
                        onClose={this.handleAddProductClose}
                     >
                        <Paper
                           className={classNames(
                              classes.orderPopup,
                              classes.addProductPopup
                           )}
                        >
                           <Typography
                              variant="title"
                              className={classes.titleMarginBottom}
                           >
                              กรุณาเลือกสินค้า
                           </Typography>
                           <Paper className={classes.productsPaper}>
                              {products.length > 0 &&
                                 products.map(product => (
                                    <Button
                                       key={product.id}
                                       className={classes.cardButton}
                                       fullWidth
                                       onClick={this.handleSelectProduct.bind(
                                          this,
                                          product.id
                                       )}
                                    >
                                       <Card className={classes.popupCard}>
                                          <CardMedia
                                             className={classes.popupCardImage}
                                             image={product.image}
                                             title={product.name}
                                          />
                                          <div
                                             className={
                                                classes.popupCardDetails
                                             }
                                          >
                                             <CardContent
                                                className={
                                                   classes.popupCardContent
                                                }
                                             >
                                                <Typography
                                                   variant="body2"
                                                   noWrap
                                                >
                                                   {product.name}
                                                </Typography>
                                                <Typography variant="body1">
                                                   {product.price} บาท
                                                </Typography>
                                             </CardContent>
                                          </div>
                                       </Card>
                                    </Button>
                                 ))}
                           </Paper>
                           <Button
                              variant="fab"
                              mini
                              color="secondary"
                              aria-label="Add"
                              className={this.props.classes.newOrderButton}
                              onClick={this.handleCreateProductOpen}
                           >
                              <AddIcon />
                           </Button>
                           <Typography
                              variant="body2"
                              className={classNames(
                                 this.props.classes.titleMarginBottom
                              )}
                           >
                              สร้างสินค้าใหม่
                           </Typography>
                        </Paper>
                     </Modal>
                  </div>

                  <div
                     className={classNames(
                        classes.sectionMobile,
                        classes.productOption
                     )}
                  >
                     <Modal
                        aria-labelledby="select-product-option"
                        aria-describedby="select-product-option"
                        open={this.state.productOptionPopup}
                        onClose={this.handleProductOptionClose}
                     >
                        <Paper
                           className={classNames(
                              classes.orderPopup,
                              classes.productOptionPopup
                           )}
                        >
                           <Typography
                              variant="title"
                              className={classes.titleMarginBottom}
                           >
                              กรุณาเลือกตัวเลือกของสินค้า
                           </Typography>
                           <Paper className={classes.productsPaper} />
                           <Button
                              variant="contained"
                              color="secondary"
                              className={classNames(
                                 this.props.classes.orderPopupButton
                              )}
                              fullWidth
                              onClick={this.handleNextStep}
                           >
                              ต่อไป
                           </Button>
                        </Paper>
                     </Modal>
                  </div>
               </div>

               <div className={classes.footer}>
                  <AppBar position="fixed" className={classes.footerAppBar}>
                     <Toolbar className={classes.footerToolbar}>
                        <Fab aria-label="Add" className={classes.footerFabButton} onClick={this.handleOrderPopupOpen}>
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

export default withStyles(styles)(App);
