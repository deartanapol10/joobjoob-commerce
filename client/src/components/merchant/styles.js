import { fade } from "@material-ui/core/styles/colorManipulator";

const styles = theme => ({


   //// ---- COMMON CLASSES ---- ////

      flexColumn: {
         flexDirection: "column"
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
      iconLeft: {
         marginRight: theme.spacing.unit,
      },
      iconRight: {
         marginLeft: theme.spacing.unit,
      },
      iconSmall: {
         fontSize: 20,
      },
      buttonBadgeRight: {
         marginLeft: theme.spacing.unit,
         marginRight: theme.spacing.unit,
      },
      buttonWithBadge: {
         position: "relative",
         top: 0,
         left: 0,
         marginLeft: theme.spacing.unit,
      },
      buttonWithBadgeColor: {
			color: "#fff",
			backgroundColor: "#009577",
      },
      textButton: {
         backgroundColor: "transparent",
         color: fade("#fff", 0.5),
         "&:hover": {
            color: "#fff",
            backgroundColor: "transparent",
         },
      },

   //// **** END COMMON CLASSES **** ////


   //// ---- LAYOUT ---- ////

      layout: {
         height: "100vh",
         display: "flex",
         flexDirection: "column",
      },
      header: {
         backgroundColor: theme.palette.primary[200],
      },
      footer: {
      },
      content: {
         flex: 1,
         overflow: "auto",
         background: "#f5f5f5",
         padding: theme.spacing.unit * 2,
      },
      grow: {
         flexGrow: 1,
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

   //// **** END LAYOUT **** ////


   //// ---- APP BAR ---- ////

      appBarMenuIcon: {
         paddingLeft: 0,
         paddingRight: 8
      },
      appBarMenuButton: {
         padding: "0 12px",
         marginRight: theme.spacing.unit * 2
      },
      appBarMenuLastItem: {
         marginRight: 0
      },
      appBarShopTitle: {
         display: "none",
         [theme.breakpoints.up("sm")]: {
            display: "block",
         }
      },
      appBarOrderTitle: {
         textAlign: "left",
         marginTop: -0.5 * theme.spacing.unit,
      },
      appBarOrderNumber: {

      },
      appBarOrderCustomerName: {
         fontSize: "0.875rem",
         marginTop: -1 * theme.spacing.unit,
      },
      appBarOrderProcess: {
         padding: theme.spacing.unit - 2,
      },

   //// **** END APP BAR **** ////


   //// ---- AVATAR ---- ////

      avatar: {
         backgroundColor: fade(theme.palette.common.white, 0.85)
      },
      avatarMenuButton: {
         /*marginLeft: -12,*/
         marginRight: theme.spacing.unit * 1.5,
      },

   //// **** END AVATAR **** ////


   //// ---- SEARCH INPUT ---- ////

      search: {
         position: "relative",
         borderRadius: theme.shape.borderRadius,
         border: "1px white solid",
         backgroundColor: fade(theme.palette.common.white, 0.15),
         "&:hover": {
            backgroundColor: fade(theme.palette.common.white, 0.25),
         },
         marginRight: theme.spacing.unit * 2,
         marginLeft: 0,
         width: "100%",
         [theme.breakpoints.up("sm")]: {
            marginLeft: theme.spacing.unit * 3,
            width: "auto",
         },
      },
      searchIcon: {
         width: theme.spacing.unit * 5.25,
         height: "100%",
         right: 0,
         position: "absolute",
         display: "flex",
         alignItems: "center",
         justifyContent: "center",
      },
      inputRoot: {
         color: "inherit",
         width: "100%",
      },
      inputInput: {
         paddingTop: theme.spacing.unit * 1.5,
         paddingRight: theme.spacing.unit,
         paddingBottom: theme.spacing.unit * 1.5,
         paddingLeft: theme.spacing.unit,
         transition: theme.transitions.create("width"),
         width: "100%",
         fontWeight: 300,
         [theme.breakpoints.up("md")]: {
            width: 200,
         },
      },
      productSearch: {
         border: "2px rgba(0,0,0,0.4) solid",
         position: "relative", 
         borderRadius: 4,
         margin: theme.spacing.unit * 2,
      },

   //// **** END SEARCH INPUT **** ////


   //// ---- SEARCH RESULTS ---- ////

      resultPaper: {
         position: "absolute",
         width: "100%",
         height: "auto",
         paddingLeft: theme.spacing.unit * 3,
         paddingRight: theme.spacing.unit * 3,
         paddingTop: theme.spacing.unit * 5,
         paddingBottom: theme.spacing.unit * 8,
         display: "flex",
         flex: "1 0 auto",
         flexDirection: "column",
         marginTop: theme.spacing.unit,
         background: "#ffeeee",
         zIndex: 9999,
      },
      resultCard: {
         width: "80%",
         margin: "0 auto",
         padding: theme.spacing.unit * 1.5,
         marginBottom: theme.spacing.unit,
         cursor: "pointer",
         "&:hover": {
            backgroundColor: fade("#000", 0.02),
         },
         "&:focus": {
            backgroundColor: fade("#000", 0.02),
         },
      },
      resultTitle: {
         textAlign: "center",
         marginBottom: theme.spacing.unit * 3,
      },
      resultDetail: {
         display: "flex",
         justifyContent: "space-between",
         paddingLeft: theme.spacing.unit,
      },
      productResultCard: {
         minWidth: theme.spacing.unit * 20,
         minHeight: theme.spacing.unit * 30,
      },
      productResultMedia: {
         width: "100%",
         "&::before": {
            content: "''",
            display: "inline-block",
            width: 1,
            height: 0,
            paddingBottom: "calc(100% / 1/1)",
         },
      },
      productResultTitleTruncate: {
         maxHeight: theme.spacing.unit * 3,
         overflow: "hidden",
         position: "relative",
         display: "block",
         lineHeight: "1rem",
         "&::before": {
            background: "linear-gradient(to right, rgba(255, 255, 255, 0) 0%, white 50%)",
            content: "'\\200C'",
            display: "block",
            position: "absolute",
            right: 0,
            top: 0,
            width: "25%",
            textAlign: "center",
         },
      },
      productResultTitle: {
         fontSize: "1rem",
      },
      productResultPrice: {
         fontSize: "0.75rem",
         color: fade("#000", 0.6),
      },
      productResultActions: {
         height: theme.spacing.unit * 5,
         borderTop: "1px #eee solid",
         justifyContent: "center",
         padding: 0,
      },
      productResultEditButton: {
         width: "100%",
         height: "100%",
         margin: 0,
         borderRadius: "0 0 4px 4px",
         color: "inherit",
         backgroundColor: "inherit",
         "&:hover": {
            backgroundColor: fade("#000", 0.08),
         },
      },
      productResultCheck: {
         position: "absolute",
         top: 0,
         width: "100%",
         height: "100%",
         backgroundColor: "transparent",
      },
      productResultCheckActive: {
         backgroundColor: fade("#03DAC6", 0.3),
      },
      productResultRoot: {
         float: "right",
         color: fade("#999", 0.5),
         "&$productResultChecked": {
            color: "#009577",
         },
      },
      productResultChecked: {

      },
      productResultGrid: {
         marginBottom: theme.spacing.unit * 5,
      },

   //// **** END SEARCH RESULTS **** ////


   //// ---- MENU ---- ////

      menuList: {
         minWidth: theme.spacing.unit * 14,
      },

   //// **** END MENU **** ////
   

   //// ---- SELECT ALL CHECKBOX ---- ////
   
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

   //// **** END SELECT ALL CHECKBOXE **** ////


   //// ---- STATUS COLORS ---- ////

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

   //// **** END STATUS COLORS **** ////


   //// ---- ORDER LIST ---- ////

      orderCard: {
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
      orderCardActive: {
         backgroundColor: fade("#000", 0.05),
      },
      orderCardContent: {
         width: "100%"
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
      orderStatus: {
         fontWeight: "300",
         fontSize: "0.875rem",
      },
      orderStatusButton: {
         padding: "0 5px",
         float: "left",
         minWidth: 24,
         minHeight: 24,
         color: "white !important",
         width: 64,
      },
      orderStatusText: {
         backgroundColor: "transparent !important",
         display: "inline-block",
         float: "left",
         fontSize: "0.750rem",
         marginLeft: theme.spacing.unit,
         marginTop: theme.spacing.unit / 2,
      },
      orderPrintButton: {
         padding: 0,
      },
      orderDetail: {
         marginTop: theme.spacing.unit * 1.5,
         display: "flex",
         justifyContent: "space-between"
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
      orderBlank: {
         paddingTop: theme.spacing.unit * 2,
         paddingBottom: theme.spacing.unit * 2,
         paddingLeft: theme.spacing.unit * 2,
         paddingRight: theme.spacing.unit * 2,
         textAlign: "center",
         color: fade("#000", 0.4),
      },
      orderBlankIcon: {
         width: theme.spacing.unit * 4,
         height: theme.spacing.unit * 4,
      },

   //// **** END ORDER LIST **** ////


   //// ---- FOOTER ---- ////

      bottomSpace: {
         height: theme.spacing.unit * 5,
      },
      footerAppBar: {
         top: "auto",
         bottom: 0,
         backgroundColor: "#BF5F82",
      },
      footerToolBar: {
         alignItems: "center",
         justifyContent: "space-between",
      },
      footerFabButton: {
         position: "absolute",
         zIndex: 1,
         top: -30,
         left: 0,
         right: 0,
         margin: "0 auto",
         color: "white",
         backgroundColor: theme.palette.primary[200],
         "&:hover": {
            backgroundColor: theme.palette.primary[300],
         }
      ,}

   //// **** FOOTER **** ////


});

export default styles;
