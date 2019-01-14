import { fade } from "@material-ui/core/styles/colorManipulator";

const styles = theme => ({
   layout: {
      height: "100vh",
      display: "flex",
      flexDirection: "column"
   },
   header: {
      backgroundColor: theme.palette.primary[200]
   },
   footer: {
      backgroundColor: "#bf5f82",
      height: 56,
   },
   content: {
      flex: 1,
      overflow: "auto",
      background: "#f5f5f5",
      padding: theme.spacing.unit * 2,
   },
   grow: {
      flexGrow: 1
   },
   selectAllPaper: {},
   resultPaper: {
      position: "absolute",
      width: "100%",
      display: "flex",
      flex: "1 0 auto",
      flexDirection: "column",
      marginTop: theme.spacing.unit,
   },
   resultCard: {
      width: "100%",
      padding: theme.spacing.unit * 1.5,
      marginBottom: theme.spacing.unit,
   },
   resultDetailLess: {
      display: "flex",
      justifyContent: "space-between",
      paddingLeft: theme.spacing.unit,
   },
   cardSection: {
      backgroundColor: "#999999",
      padding: theme.spacing.unit,
      height: "100%"
   },
   card: {
      minWidth: 275,
      marginBottom: theme.spacing.unit,
      display: "flex",
      alignItems: "flex-start",
      cursor: "pointer",
      "&:hover": {
         backgroundColor: fade("#000", 0.02),
      },
      "&:focus": {
         backgroundColor: fade("#000", 0.02),
      },
   },
   cardActive: {
      backgroundColor: fade("#000", 0.05),
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
   search: {
      position: 'relative',
      borderRadius: theme.shape.borderRadius,
      border: "1px white solid",
      backgroundColor: fade(theme.palette.common.white, 0.15),
      '&:hover': {
         backgroundColor: fade(theme.palette.common.white, 0.25),
      },
      marginRight: theme.spacing.unit * 2,
      marginLeft: 0,
      width: '100%',
      [theme.breakpoints.up('sm')]: {
         marginLeft: theme.spacing.unit * 3,
         width: 'auto',
      },
   },
   searchIcon: {
      width: theme.spacing.unit * 5,
      height: '100%',
      right: 0,
      position: 'absolute',
      pointerEvents: 'none',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
   },
   inputRoot: {
      color: 'inherit',
      width: '100%',
   },
   inputInput: {
      paddingTop: theme.spacing.unit,
      paddingRight: theme.spacing.unit,
      paddingBottom: theme.spacing.unit,
      paddingLeft: theme.spacing.unit,
      transition: theme.transitions.create('width'),
      width: '100%',
      fontWeight: 300,
      [theme.breakpoints.up('md')]: {
         width: 200,
      },
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
      padding: "0 5px",
      float: "left",
      minWidth: 24,
      minHeight: 24,
      color: "white !important",
      width: 64,
   },
   printButton: {
      padding: 0,
   },
   statusText: {
      backgroundColor: "transparent !important",
      display: "inline-block",
      float: "left",
      fontSize: "0.750rem",
      marginLeft: theme.spacing.unit,
      marginTop: theme.spacing.unit / 2,
   },
   selectAll: {
      display: "flex",
      alignItems: "center",
      backgroundColor: "white",
   },
   selectAllActive: {
      backgroundColor: "#BF5F82",
   },
   selectAllCheckbox: {
      
   },
   selectAllCheckboxActive: {
      color: "white !important",
   },
   selectAllLabel: {
      paddingLeft: theme.spacing.unit * 2
   },
   selectAllLabelActive: {
      "& span": {
         color: "white !important",
      },
   },
   lastItem: {
      marginRight: 0
   },
   title: {
      display: "none",
      [theme.breakpoints.up("sm")]: {
         display: "block",
      }
   },
   titleMarginBottom: {
      marginBottom: theme.spacing.unit
   },
   titleMarginTop: {
      marginTop: theme.spacing.unit * 2
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
      color: fade("#FF1400", 0.7),
      backgroundColor: fade("#FF1400", 0.7),
      "&:hover": {
         backgroundColor: fade("#FF1400", 0.9)
      }
   },
   submitted: {
      color: fade("#FB8C00", 0.7),
      backgroundColor: fade("#FB8C00", 0.7),
      "&:hover": {
         backgroundColor: fade("#FB8C00", 0.55)
      }
   },
   shipped: {
      color: fade("#00BFA5", 0.7),
      backgroundColor: fade("#00BFA5", 0.7),
      "&:hover": {
         backgroundColor: fade("#00BFA5", 0.55)
      }
   },
   success: {
      color: fade("#90A4AE", 0.7),
      backgroundColor: fade("#90A4AE", 0.7),
      "&:hover": {
         backgroundColor: fade("#90A4AE", 0.55)
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
      marginLeft: theme.spacing.unit,
   },
   receiptDetailLess: {
      marginTop: theme.spacing.unit * 1.5,
      display: "flex",
      justifyContent: "space-between"
   },
   floatLefT: {
      float: "left",
   },
   floatRight: {
      float: "right",
   },
   clearBoth: {
      clear: "both",
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
   orderCheckbox: {
      paddingRight: 0
   },
   orderCheckboxActive: {
      color: "#747474 !important",
   },
   orderNumber: {
      fontWeight: "600",
      color: "white !important",
      fontSize: "0.750rem",
   },
   orderClientName: {
      fontWeight: "500",
      fontSize: "1rem",
   },
   orderPrice: {
      fontWeight: "400",
      color: fade("#000", 0.6),
   },
   orderTimeStamp: {
      fontWeight: "300",
      fontSize: "0.625rem",
      color: fade("#000", 0.6),
   },
   orderStatus: {
      fontWeight: "300",
      fontSize: "0.875rem",
   },
   textField: {},
   menuItem: {
      minWidth: theme.spacing.unit * 14,
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
   },
   footerAppBar: {
      top: 'auto',
      bottom: 0,
      backgroundColor: "#BF5F82",
   },
   footerToolBar: {
      alignItems: 'center',
      justifyContent: 'space-between',
   },
   footerFabButton: {
      position: 'absolute',
      zIndex: 1,
      top: -30,
      left: 0,
      right: 0,
      margin: '0 auto',
      color: "white",
      backgroundColor: theme.palette.primary[200],
      "&:hover": {
         backgroundColor: theme.palette.primary[300],
      }
   }
});

export default styles;
