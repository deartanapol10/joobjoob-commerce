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

import { fade } from "@material-ui/core/styles/colorManipulator";
import { withStyles } from "@material-ui/core/styles";

import AddIcon from "@material-ui/icons/Add";
import AddCircleIcon from "@material-ui/icons/AddCircle";

import SALogo from "../../images/sa-logo.png";
import Item1 from "../../images/item-1.jpg";
import Item2 from "../../images/item-2.jpg";

const orderStatus = [
   {
      id: "001",
      name: {
         th: "ยังไม่จ่าย",
         en: "created"
      }
   },
   {
      id: "002",
      name: {
         th: "ที่ต้องจัดส่ง",
         en: "submitted"
      }
   },
   {
      id: "003",
      name: {
         th: "การจัดส่ง",
         en: "shipped"
      }
   },
   {
      id: "004",
      name: {
         th: "สำเร็จ",
         en: "success"
      }
   }
];

const paymentStatus = [
   {
      id: "001",
      name: {
         th: "ยังไม่ตรวจสอบยอด",
         en: "waitForConfirmation"
      }
   },
   {
      id: "002",
      name: {
         th: "ตรวจสอบยอดแล้ว",
         en: "comfirmed"
      }
   }
];

const originalOrders = [
   {
      orderID: "0001",
      url:
         "https://shippee.com/5b715fcf03656e1cf0beaaa6/5b8b631c0f611d2acc29f55f",
      status: "created",
      paymentStatus: "pending",
      name: "คุณแสด",
      customerName: "",
      address: {
         houseNo: "",
         road: "",
         subDistrict: "",
         district: "",
         province: "",
         postalCode: ""
      },
      additionalNote: "",
      phone: "",
      price: 1000,
      bankAccount: "SCB",
      shipping: "ALPHA",
      trackingNo: "",
      receipt: "",
      createdTime: "271020181325",
      updatedTime: "271020181325",
      submitTime: "",
      expiredAt: "031120181325",
      items: [
         {
            id: "1",
            name: "Lorem Ipsum",
            price: 250,
            amount: 2,
            image: Item2
         },
         {
            id: 2,
            name: "Something",
            price: 450,
            amount: 1,
            image: Item2
         }
      ]
   },
   {
      orderID: "0002",
      url:
         "https://shippee.com/5b715fcf03656e1cf0beaaa6/5b8b631c0f611d2acc29f55f",
      status: "created",
      paymentStatus: "waitForConfirmation",
      name: "คุณแดง",
      customerName: "แดง แด๊ง แดง",
      address: {
         houseNo: "111",
         road: "สุขุมวิท 55",
         subDistrict: "คลองตันเหนือ",
         district: "วัฒนา",
         province: "กทม.",
         postalCode: "10110"
      },
      additionalNote: "ถ้ากดกริ่งแล้วไม่มีคนออกมา ให้ฝากไว้ที่ป้อมยาม",
      phone: "0888888888",
      price: 300,
      bankAccount: "KBANK",
      shipping: "EMS",
      trackingNo: "",
      receipt: Item1,
      createdTime: "291020181105",
      updatedTime: "291020181545",
      submitTime: "291020181545",
      expiredAt: "061120181105",
      items: [
         {
            id: "1",
            name: "Trouser",
            price: 100,
            amount: 2,
            image: Item2
         },
         {
            id: 2,
            name: "T-Shirt",
            price: 100,
            amount: 1,
            image: Item2
         },
         {
            id: 3,
            name: "Skirt",
            price: 100,
            amount: 1,
            image: Item2
         }
      ]
   },
   {
      orderID: "0003",
      url:
         "https://shippee.com/5b715fcf03656e1cf0beaaa6/5b8b631c0f611d2acc29f55f",
      status: "shipped",
      paymentStatus: "confirmed",
      name: "คุณดำ",
      customerName: "ดำ ด๊ำ ดำ",
      address: {
         houseNo: "222",
         road: "สุขุมวิท 49",
         subDistrict: "คลองตันเหนือ",
         district: "วัฒนา",
         province: "กทม.",
         postalCode: "10110"
      },
      additionalNote: "ไม่ออกมารับคือไม่เอาแล้ว",
      phone: "0877777777",
      price: 100,
      bankAccount: "SCB",
      shipping: "ALPHA",
      trackingNo: "1234567890",
      receipt: Item1,
      createdTime: "011120181533",
      updatedTime: "011120181833",
      submitTime: "011120181633",
      expiredAt: "081120181533",
      items: [
         {
            id: "1",
            name: "Trouser",
            price: 100,
            amount: 2,
            image: Item2
         }
      ]
   },
   {
      orderID: "0004",
      url:
         "https://shippee.com/5b715fcf03656e1cf0beaaa6/5b8b631c0f611d2acc29f55f",
      status: "created",
      paymentStatus: "waitForConfirmation",
      name: "คุณม่วง",
      customerName: "แดง แด๊ง แดง",
      address: {
         houseNo: "111",
         road: "สุขุมวิท 55",
         subDistrict: "คลองตันเหนือ",
         district: "วัฒนา",
         province: "กทม.",
         postalCode: "10110"
      },
      additionalNote: "ถ้ากดกริ่งแล้วไม่มีคนออกมา ให้ฝากไว้ที่ป้อมยาม",
      phone: "0888888888",
      price: 300,
      bankAccount: "KBANK",
      shipping: "EMS",
      trackingNo: "",
      receipt: Item1,
      createdTime: "291020181105",
      updatedTime: "291020181545",
      submitTime: "291020181545",
      expiredAt: "061120181105",
      items: [
         {
            id: "1",
            name: "Trouser",
            price: 100,
            amount: 2,
            image: Item2
         },
         {
            id: 2,
            name: "T-Shirt",
            price: 100,
            amount: 1,
            image: Item2
         },
         {
            id: 3,
            name: "Skirt",
            price: 100,
            amount: 1,
            image: Item2
         }
      ]
   },
   {
      orderID: "0005",
      url:
         "https://shippee.com/5b715fcf03656e1cf0beaaa6/5b8b631c0f611d2acc29f55f",
      status: "created",
      paymentStatus: "waitForConfirmation",
      name: "คุณเหลือง",
      customerName: "แดง แด๊ง แดง",
      address: {
         houseNo: "111",
         road: "สุขุมวิท 55",
         subDistrict: "คลองตันเหนือ",
         district: "วัฒนา",
         province: "กทม.",
         postalCode: "10110"
      },
      additionalNote: "ถ้ากดกริ่งแล้วไม่มีคนออกมา ให้ฝากไว้ที่ป้อมยาม",
      phone: "0888888888",
      price: 300,
      bankAccount: "KBANK",
      shipping: "EMS",
      trackingNo: "",
      receipt: Item1,
      createdTime: "291020181105",
      updatedTime: "291020181545",
      submitTime: "291020181545",
      expiredAt: "061120181105",
      items: [
         {
            id: "1",
            name: "Trouser",
            price: 100,
            amount: 2,
            image: Item2
         },
         {
            id: 2,
            name: "T-Shirt",
            price: 100,
            amount: 1,
            image: Item2
         },
         {
            id: 3,
            name: "Skirt",
            price: 100,
            amount: 1,
            image: Item2
         }
      ]
   },
   {
      orderID: "0006",
      url:
         "https://shippee.com/5b715fcf03656e1cf0beaaa6/5b8b631c0f611d2acc29f55f",
      status: "created",
      paymentStatus: "waitForConfirmation",
      name: "คุณฟ้า",
      customerName: "แดง แด๊ง แดง",
      address: {
         houseNo: "111",
         road: "สุขุมวิท 55",
         subDistrict: "คลองตันเหนือ",
         district: "วัฒนา",
         province: "กทม.",
         postalCode: "10110"
      },
      additionalNote: "ถ้ากดกริ่งแล้วไม่มีคนออกมา ให้ฝากไว้ที่ป้อมยาม",
      phone: "0888888888",
      price: 300,
      bankAccount: "KBANK",
      shipping: "EMS",
      trackingNo: "",
      receipt: Item1,
      createdTime: "291020181105",
      updatedTime: "291020181545",
      submitTime: "291020181545",
      expiredAt: "061120181105",
      items: [
         {
            id: "1",
            name: "Trouser",
            price: 100,
            amount: 2,
            image: Item2
         },
         {
            id: 2,
            name: "T-Shirt",
            price: 100,
            amount: 1,
            image: Item2
         },
         {
            id: 3,
            name: "Skirt",
            price: 100,
            amount: 1,
            image: Item2
         }
      ]
   },
   {
      orderID: "0007",
      url:
         "https://shippee.com/5b715fcf03656e1cf0beaaa6/5b8b631c0f611d2acc29f55f",
      status: "created",
      paymentStatus: "waitForConfirmation",
      name: "คุณน้ำเงิน",
      customerName: "แดง แด๊ง แดง",
      address: {
         houseNo: "111",
         road: "สุขุมวิท 55",
         subDistrict: "คลองตันเหนือ",
         district: "วัฒนา",
         province: "กทม.",
         postalCode: "10110"
      },
      additionalNote: "ถ้ากดกริ่งแล้วไม่มีคนออกมา ให้ฝากไว้ที่ป้อมยาม",
      phone: "0888888888",
      price: 300,
      bankAccount: "KBANK",
      shipping: "EMS",
      trackingNo: "",
      receipt: Item1,
      createdTime: "291020181105",
      updatedTime: "291020181545",
      submitTime: "291020181545",
      expiredAt: "061120181105",
      items: [
         {
            id: "1",
            name: "Trouser",
            price: 100,
            amount: 2,
            image: Item2
         },
         {
            id: 2,
            name: "T-Shirt",
            price: 100,
            amount: 1,
            image: Item2
         },
         {
            id: 3,
            name: "Skirt",
            price: 100,
            amount: 1,
            image: Item2
         }
      ]
   },
   {
      orderID: "0008",
      url:
         "https://shippee.com/5b715fcf03656e1cf0beaaa6/5b8b631c0f611d2acc29f55f",
      status: "created",
      paymentStatus: "waitForConfirmation",
      name: "คุณเงิน",
      customerName: "แดง แด๊ง แดง",
      address: {
         houseNo: "111",
         road: "สุขุมวิท 55",
         subDistrict: "คลองตันเหนือ",
         district: "วัฒนา",
         province: "กทม.",
         postalCode: "10110"
      },
      additionalNote: "ถ้ากดกริ่งแล้วไม่มีคนออกมา ให้ฝากไว้ที่ป้อมยาม",
      phone: "0888888888",
      price: 300,
      bankAccount: "KBANK",
      shipping: "EMS",
      trackingNo: "",
      receipt: Item1,
      createdTime: "291020181105",
      updatedTime: "291020181545",
      submitTime: "291020181545",
      expiredAt: "061120181105",
      items: [
         {
            id: "1",
            name: "Trouser",
            price: 100,
            amount: 2,
            image: Item2
         },
         {
            id: 2,
            name: "T-Shirt",
            price: 100,
            amount: 1,
            image: Item2
         },
         {
            id: 3,
            name: "Skirt",
            price: 100,
            amount: 1,
            image: Item2
         }
      ]
   },
   {
      orderID: "0009",
      url:
         "https://shippee.com/5b715fcf03656e1cf0beaaa6/5b8b631c0f611d2acc29f55f",
      status: "created",
      paymentStatus: "waitForConfirmation",
      name: "คุณทอง",
      customerName: "แดง แด๊ง แดง",
      address: {
         houseNo: "111",
         road: "สุขุมวิท 55",
         subDistrict: "คลองตันเหนือ",
         district: "วัฒนา",
         province: "กทม.",
         postalCode: "10110"
      },
      additionalNote: "ถ้ากดกริ่งแล้วไม่มีคนออกมา ให้ฝากไว้ที่ป้อมยาม",
      phone: "0888888888",
      price: 300,
      bankAccount: "KBANK",
      shipping: "EMS",
      trackingNo: "",
      receipt: Item1,
      createdTime: "291020181105",
      updatedTime: "291020181545",
      submitTime: "291020181545",
      expiredAt: "061120181105",
      items: [
         {
            id: "1",
            name: "Trouser",
            price: 100,
            amount: 2,
            image: Item2
         },
         {
            id: 2,
            name: "T-Shirt",
            price: 100,
            amount: 1,
            image: Item2
         },
         {
            id: 3,
            name: "Skirt",
            price: 100,
            amount: 1,
            image: Item2
         }
      ]
   },
   {
      orderID: "0010",
      url:
         "https://shippee.com/5b715fcf03656e1cf0beaaa6/5b8b631c0f611d2acc29f55f",
      status: "created",
      paymentStatus: "waitForConfirmation",
      name: "คุณส้ม",
      customerName: "แดง แด๊ง แดง",
      address: {
         houseNo: "111",
         road: "สุขุมวิท 55",
         subDistrict: "คลองตันเหนือ",
         district: "วัฒนา",
         province: "กทม.",
         postalCode: "10110"
      },
      additionalNote: "ถ้ากดกริ่งแล้วไม่มีคนออกมา ให้ฝากไว้ที่ป้อมยาม",
      phone: "0888888888",
      price: 300,
      bankAccount: "KBANK",
      shipping: "EMS",
      trackingNo: "",
      receipt: Item1,
      createdTime: "291020181105",
      updatedTime: "291020181545",
      submitTime: "291020181545",
      expiredAt: "061120181105",
      items: [
         {
            id: "1",
            name: "Trouser",
            price: 100,
            amount: 2,
            image: Item2
         },
         {
            id: 2,
            name: "T-Shirt",
            price: 100,
            amount: 1,
            image: Item2
         },
         {
            id: 3,
            name: "Skirt",
            price: 100,
            amount: 1,
            image: Item2
         }
      ]
   }
];

const customerNamesList = [
   {
      id: "00001",
      lastUsed: "201811050525",
      name: "คุณขาว"
   },
   {
      id: "00002",
      lastUsed: "201811050847",
      name: "คุณแดง"
   },
   {
      id: "00003",
      lastUsed: "201811051122",
      name: "คุณดำ"
   },
   {
      id: "00004",
      lastUsed: "201811050247",
      name: "คุณม่วง"
   },
   {
      id: "00005",
      lastUsed: "201811052244",
      name: "คุณเหลือง"
   },
   {
      id: "00006",
      lastUsed: "201811051807",
      name: "คุณฟ้า"
   },
   {
      id: "00007",
      lastUsed: "201811050659",
      name: "คุณน้ำเงิน"
   },
   {
      id: "00008",
      lastUsed: "201811051535",
      name: "คุณเงิน"
   },
   {
      id: "00009",
      lastUsed: "201811051755",
      name: "คุณทอง"
   },
   {
      id: "00010",
      lastUsed: "201811051200",
      name: "คุณส้ม"
   }
];

const productsList = [
   {
      id: 1,
      name: "เสื้อผ้ามือสอง",
      price: 559,
      amount: 1,
      image: Item1,
      option: [
         {
            id: 1,
            name: "S",
            price: 559
         },
         {
            id: 2,
            name: "M",
            price: 579
         },
         {
            id: 3,
            name: "L",
            price: 599
         }
      ]
   },
   {
      id: 2,
      name: "เสื้อผ้ามือหนึ่ง",
      price: 899,
      amount: 1,
      image: Item2,
      option: []
   },
   {
      id: 3,
      name: "เสื้อผ้ามือสาม ชื่อยาวนิดหน่อย",
      price: 499,
      amount: 1,
      image: Item2,
      option: []
   },
   {
      id: 4,
      name: "เสื้อผ้ามือสี่ ชื่อยาวขึ้นมาอีกนิด",
      price: 399,
      amount: 1,
      image: Item2,
      option: []
   },
   {
      id: 5,
      name: "เสื้อผ้ามือห้า ชื่อยาวมากๆๆๆๆๆๆๆๆๆๆๆๆๆ",
      price: 299,
      amount: 1,
      image: Item2,
      option: []
   },
   {
      id: 6,
      name: "เสื้อผ้ามือหก ชื่อยาวกว่านี้มีอีกไหม ขอให้ส่งมา",
      price: 199,
      amount: 1,
      image: Item2,
      option: []
   },
   {
      id: 7,
      name: "เสื้อผ้ามือเจ็ด ชื่อสินค้าถ้าจะยาวขนาดนี้ ไปแต่งนิยายขายเถอะ",
      price: 99,
      amount: 1,
      image: Item2,
      option: []
   }
];

const optionsList = [
   {
      id: 1,
      name: "ขนาด",
      option: [
         {
            id: 1,
            name: "S",
            price: "0"
         },
         {
            id: 2,
            name: "M",
            price: "0"
         },
         {
            id: 3,
            name: "L",
            price: "0"
         }
      ]
   },
   {
      id: 2,
      name: "สี",
      option: [
         {
            id: 1,
            name: "แดง",
            price: "0"
         },
         {
            id: 2,
            name: "ดำ",
            price: "0"
         },
         {
            id: 3,
            name: "ขาว",
            price: "0"
         }
      ]
   }
];

const styles = theme => ({
   layout: {
      height: "100vh",
      display: "flex",
      flexDirection: "column"
   },
   header: {
      backgroundColor: theme.palette.primary[100]
   },
   footer: {
      backgroundColor: theme.palette.primary[200]
   },
   content: {
      flex: 1,
      overflow: "auto",
      background: "#f5f5f5",
      padding: theme.spacing.unit * 2
   },
   grow: {
      flexGrow: 1
   },
   selectAllPaper: {},
   cardSection: {
      backgroundColor: "#999999",
      padding: theme.spacing.unit,
      height: "100%"
   },
   card: {
      minWidth: 275,
      marginBottom: theme.spacing.unit,
      display: "flex",
      alignItems: "flex-start"
   },
   cardContent: {
      width: "100%"
   },
   rowCheckbox: {
      paddingTop: 0,
      paddingLeft: 0
   },
   menuButton: {
      marginLeft: -12,
      marginRight: theme.spacing.unit * 2
   },
   avatar: {
      backgroundColor: fade(theme.palette.common.white, 0.85)
   },
   menuIcon: {
      paddingLeft: 0,
      paddingRight: 8
   },
   appBarButton: {
      padding: "0 12px",
      marginRight: theme.spacing.unit * 2
   },
   statusButton: {
      fontSize: "0.675rem",
      fontWeight: "300",
      padding: "0 5px",
      minWidth: 24,
      minHeight: 24
   },
   checkbox: {
      paddingRight: 0
   },
   formLabel: {
      paddingLeft: theme.spacing.unit * 2
   },
   lastItem: {
      marginRight: 0
   },
   title: {
      display: "none",
      [theme.breakpoints.up("sm")]: {
         display: "block"
      }
   },
   titleMarginBottom: {
      marginBottom: theme.spacing.unit
   },
   titleMarginTop: {
      marginTop: theme.spacing.unit * 2
   },
   search: {
      position: "relative",
      borderRadius: theme.shape.borderRadius,
      backgroundColor: fade(theme.palette.common.white, 0.35),
      "&:hover": {
         backgroundColor: fade(theme.palette.common.white, 0.55)
      },
      marginRight: theme.spacing.unit * 2,
      marginLeft: 0,
      width: "100%",
      [theme.breakpoints.up("sm")]: {
         marginLeft: theme.spacing.unit * 3,
         width: "auto"
      }
   },
   searchIcon: {
      width: 40,
      height: "100%",
      position: "absolute",
      pointerEvents: "none",
      display: "flex",
      alignItems: "center",
      justifyContent: "center"
   },
   inputRoot: {
      color: "inherit",
      width: "100%"
   },
   inputInput: {
      paddingTop: theme.spacing.unit,
      paddingRight: theme.spacing.unit,
      paddingBottom: theme.spacing.unit,
      paddingLeft: theme.spacing.unit * 5,
      transition: theme.transitions.create("width"),
      fontWeight: 300,
      fontSize: "0.875rem",
      width: "100%",
      [theme.breakpoints.up("md")]: {
         width: 200
      }
   },
   sectionDesktop: {
      display: "none",
      [theme.breakpoints.up("md")]: {
         display: "flex"
      }
   },
   sectionMobile: {
      display: "flex",
      [theme.breakpoints.up("md")]: {
         display: "none"
      }
   },
   flexColumn: {
      flexDirection: "column"
   },
   created: {
      backgroundColor: "#555",
      "&:hover": {
         backgroundColor: fade("#555555", 0.55)
      }
   },
   submitted: {
      backgroundColor: "red",
      "&:hover": {
         backgroundColor: fade("#ff0000", 0.55)
      }
   },
   shipped: {
      backgroundColor: "green",
      "&:hover": {
         backgroundColor: fade("#00ff00", 0.55)
      }
   },
   success: {
      backgroundColor: "grey",
      "&:hover": {
         backgroundColor: fade("#999999", 0.55)
      }
   },
   pending: {
      display: "none"
   },
   wait: {
      backgroundColor: "blue",
      "&:hover": {
         backgroundColor: fade("#0000ff", 0.55)
      }
   },
   confirmed: {
      backgroundColor: "green",
      "&:hover": {
         backgroundColor: fade("#00ff00", 0.55)
      }
   },
   paymentButton: {
      marginLeft: theme.spacing.unit
   },
   receiptDetailLess: {
      marginTop: theme.spacing.unit,
      display: "flex",
      justifyContent: "space-between"
   },
   textLeft: {
      textAlign: "left"
   },
   textRight: {
      textAlign: "right"
   },
   marginLeft: {
      marginLeft: theme.spacing.unit * 2
   },
   marginRight: {
      marginRight: theme.spacing.unit * 2
   },
   selectAll: {
      display: "flex",
      alignItems: "center"
   },
   orderPopup: {
      position: "absolute",
      width: "80%",
      boxShadow: theme.shadows[5],
      padding: theme.spacing.unit * 2,
      top: "50%",
      left: "50%",
      transform: "translate(-50%, -50%)",
      "&:focus": {
         outline: "none"
      },
      textAlign: "center"
   },
   orderPopupButton: {
      padding: "0 12px",
      marginTop: theme.spacing.unit * 3
   },
   textField: {},
   menuItem: {
      "&:focus": {
         backgroundColor: theme.palette.secondary[300],
         "& $primary, & $icon": {
            color: theme.palette.common.white
         }
      }
   },
   primary: {},
   icon: {},
   prevCustomerPaper: {
      height: "30vh",
      overflow: "scroll"
   },
   blankOrder: {
      marginTop: theme.spacing.unit * 2,
      marginBottom: theme.spacing.unit * 2
   },
   newOrderButton: {
      marginTop: theme.spacing.unit * 2
   },
   cardButton: {
      backgroundColor: "white",
      color: "inherit",
      padding: 0,
      marginBottom: theme.spacing.unit
   },
   popupCard: {
      display: "flex",
      width: "100%",
      boxShadow: theme.shadows[2]
   },
   itemCard: {
      marginBottom: theme.spacing.unit
   },
   popupCardContent: {
      flex: "1 0 auto",
      textAlign: "left",
      width: 160
   },
   popupCardDetails: {
      display: "flex",
      flexDirection: "column"
   },
   popupCardImage: {
      width: 85
   },
   productsPaper: {
      boxShadow: "none",
      maxHeight: "40vh",
      overflow: "scroll",
      padding: 2,
      marginTop: theme.spacing.unit * 2
   }
});

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
               <Card className={classes.card} key={order.orderID}>
                  <Checkbox
                     onChange={this.handleToggle(order.orderID)}
                     checked={this.state.checked.indexOf(order.orderID) !== -1}
                     value={order.orderID}
                     className={classes.checkbox}
                  />
                  <CardContent className={classes.cardContent}>
                     <Button
                        variant="contained"
                        color="primary"
                        className={classNames(
                           statusColor(order.status),
                           classes.statusButton
                        )}
                     >
                        {statusText(order.status)}
                     </Button>
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
                     {/*
								<div className={classes.search}>
								<div className={classes.searchIcon}>
								<SearchIcon />
								</div>
								<InputBase
								placeholder="ค้นหาบิล..."
								classes={{
								root: classes.inputRoot,
								input: classes.inputInput,
								}}
								/>
								</div>
								*/}
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

               <div className={classes.footer}>Footer</div>
            </main>
         </React.Fragment>
      );
   }
}

export default withStyles(styles)(App);
