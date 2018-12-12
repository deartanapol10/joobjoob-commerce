import React, { Component } from "react";

import classNames from "classnames";

import {
   AppBar,
   Toolbar,
   IconButton,
   Typography,
   MenuItem,
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
   Modal,
   TextField,
   MenuList
} from "@material-ui/core";

import CreateIcon from "@material-ui/icons/Create";

import { withStyles } from "@material-ui/core/styles";

import AddIcon from "@material-ui/icons/Add";
import AddCircleIcon from "@material-ui/icons/AddCircle";

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

function TabContainer(props) {
   return <React.Fragment>{props.children}</React.Fragment>;
}

class App extends Component {
   state = {
      anchorEl: null,
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
      newProduct: {}
   };

   getOrderStepContent = step => {
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
   };

   handleStatusMenuOpen = event => {
      this.setState({ anchorEl: event.currentTarget });
   };

   handleMenuClose = () => {
      this.setState({ anchorEl: null });
      this.handleMobileMenuClose();
   };

   handleMobileMenuOpen = event => {
      this.setState({ mobileMoreAnchorEl: event.currentTarget });
   };

   handleMobileMenuClose = () => {
      this.setState({ mobileMoreAnchorEl: null });
   };

   handleChange = (event, value) => {
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
         this.handleChange(null, this.state.value);
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

   filterOrders = statusIndex => {
      const { orders, filteredOrders } = this.state;
      const newOrder = orders.filter(
         order => order.status === orderStatus[statusIndex].name.en
      );
      this.setState({ filteredOrders: newOrder });
   };

   handleOrderPopupOpen = () => {
      this.setState({ orderPopup: true });
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

   render() {
      const { classes } = this.props;
      const {
         anchorEl,
         mobileMoreAnchorEl,
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
         newProduct
      } = this.state;
      const isMenuOpen = Boolean(anchorEl);
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

      const renderMenu = (
         <Menu
            anchorEl={anchorEl}
            anchorOrigin={{ vertical: "top", horizontal: "right" }}
            transformOrigin={{ vertical: "top", horizontal: "right" }}
            open={isMenuOpen}
            onClose={this.handleMenuClose}
         >
            {orderStatus.map(status => (
               <MenuItem
                  onClick={this.handleStatusChange.bind(this, status.id)}
                  key={status.id}
               >
                  {status.name.th}
               </MenuItem>
            ))}
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

      const table = (
         <React.Fragment>
            {filteredOrders.map(order => (
               <Card
                  className={classes.card}
                  key={order.orderID}
                  onClick={e => {
                     this.orderInfo(e, order);
                  }}
               >
                  <Checkbox
                     onChange={this.handleToggle(order.orderID)}
                     checked={this.state.checked.indexOf(order.orderID) !== -1}
                     value={order.orderID}
                     className={classes.checkbox}
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
                        {`#${order.orderID}`}
                        </Button>
                        <span><Typography variant="body1" className={classNames(
                              statusColor(order.status), classes.statusText, classes.textLeft)}>{` ${statusText(order.status)}`}</Typography></span>
                     </div>
                     <Button
                        variant="contained"
                        color="primary"
                        className={classNames(
                           paymentColor(order.status, order.paymentStatus),
                           classes.statusButton,
                           classes.paymentButton
                        )}
                     >
                        {paymentText(order.paymentStatus)}
                     </Button>
                     <div className={classes.receiptDetailLess}>
                        <Typography variant="body2">{order.name}</Typography>
                        <Typography
                           variant="body1"
                           className={classes.textRight}
                        >
                           {order.price} บาท
                        </Typography>
                     </div>
                  </CardContent>
               </Card>
            ))}
         </React.Fragment>
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
                        aria-label="Open drawer"
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
                        Shippee Shop Name
                     </Typography>

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
                           <AddCircleIcon className={classes.menuIcon} />
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
                           onClick={this.handleOrderPopupOpen}
                           color="inherit"
                        >
                           <AddCircleIcon />
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
                     <Tabs value={value} onChange={this.handleChange} fullWidth>
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
                  ) : (
                     <div className={classes.selectAll}>
                        <FormControlLabel
                           control={
                              <Checkbox
                                 checked={
                                    this.state.checked.length ===
                                    filteredOrders.length
                                 }
                                 onChange={this.handleSelectAll}
                              />
                           }
                           label={
                              this.state.checked.length === 0
                                 ? "เลือกทั้งหมด"
                                 : `เลือก ${this.state.checked.length}`
                           }
                           className={classes.formLabel}
                        />
                     </div>
                  )}
               </Paper>
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

                  <div
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

               <div className={classes.footer}></div>
            </main>
         </React.Fragment>
      );
   }
}

export default withStyles(styles)(App);
