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
      alignItems: "flex-start",
      cursor: "pointer"
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
      minHeight: 24,
      color: 'white !important',
      width: 64,
   },
   statusText: {
      backgroundColor: 'transparent !important',
      display: 'inline',
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
         display: "block",
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
      color: "#FF1400",
      backgroundColor: "#FF1400",
      "&:hover": {
         backgroundColor: fade("#FF1400", 0.5)
      }
   },
   submitted: {
      color: "red",
      backgroundColor: "red",
      "&:hover": {
         backgroundColor: fade("#ff0000", 0.55)
      }
   },
   shipped: {
      color: "green",
      backgroundColor: "green",
      "&:hover": {
         backgroundColor: fade("#00ff00", 0.55)
      }
   },
   success: {
      color: "grey",
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

export default styles;
