const styles = theme => ({
  layout: {
    width: "auto",
    marginLeft: theme.spacing.unit * 2,
    marginRight: theme.spacing.unit * 2,
    marginBottom: theme.spacing.unit * 6,
    [theme.breakpoints.up(1280 + theme.spacing.unit * 2 * 2)]: {
      width: 1280,
      marginLeft: "auto",
      marginRight: "auto"
    }
  },
  grid: {
    marginTop: theme.spacing.unit * 3,
    marginBottom: theme.spacing.unit,
    padding: theme.spacing.unit,
    [theme.breakpoints.up(1280 + theme.spacing.unit * 3 * 2)]: {
      marginTop: theme.spacing.unit * 6,
      marginBottom: theme.spacing.unit,
      padding: theme.spacing.unit * 2
    }
  },
  gridsm: {
    [theme.breakpoints.up(600)]: {
      flexBasis: "100%",
      maxWidth: "100%"
    },
    [theme.breakpoints.up(960)]: {
      flexBasis: "50%",
      maxWidth: "50%"
    }
  },
  stepper: {
    width: `${80}%`,
    padding: `${theme.spacing.unit * 3}px 0 ${theme.spacing.unit * 5}px`,
    [theme.breakpoints.up(600)]: {
      width: `${100}%`
    }
  },
  paper: {
    padding: `${theme.spacing.unit * 5}px ${theme.spacing.unit * 3}px`,
    margin: 0
  },
  listItem: {
    padding: `${theme.spacing.unit}px 0`
  },
  title: {
    marginTop: theme.spacing.unit * 2
  },
  titleSecondary: {
    color: theme.palette.secondary[400]
  },
  total: {
    fontWeight: 500,
    fontSize: "1.2rem",
    "& span": {
      fontSize: "1.2rem",
      fontWeight: 500
    }
  },
  shippingCost: {
    fontWeight: 500,
    "& span": {
      fontWeight: 500
    }
  },
  expiryDate: {
    color: theme.palette.secondary[400],
    "& span": {
      color: theme.palette.secondary[400]
    }
  },
  divider: {
    margin: `${theme.spacing.unit}px 0`
  },
  formControl: {
    width: "100%"
  },
  input: {
    display: "none"
  },
  card: {
    display: "flex",
    marginBottom: theme.spacing.unit
  },
  content: {
    flex: "1 0 auto",
    width: 0
  },
  cardMedia: {
    width: "5rem",
    height: "5rem",
    [theme.breakpoints.up(480)]: {
      width: "7rem",
      height: "7rem"
    },
    [theme.breakpoints.up(600)]: {
      width: "9rem",
      height: "9rem"
    },
    [theme.breakpoints.up(960)]: {
      width: "9rem",
      height: "9rem"
    }
  },
  centerCard: {
    textAlign: "center",
    width: "100%",
    "&:last-child": {
      paddingBottom: 16
    },
    "&.processing": {
      backgroundColor: theme.palette.primary[100]
    },
    "&.confirm": {
      backgroundColor: theme.palette.primary[300]
    },
    "&.shipped": {
      backgroundColor: theme.palette.primary[700]
    }
  },
  bankCard: {
    display: "flex",
    marginBottom: theme.spacing.unit,
    alignItems: "center"
  },
  bankMedia: {
    width: 50,
    height: 50,
    margin: 20
  },
  bankContent: {
    "&:last-child": {
      paddingBottom: 16
    }
  },
  bankRadio: {
    "& input": {
      display: "none"
    },
    "& label": {
      position: "relative",
      cursor: "pointer"
    },
    "& input:checked": {
      "& + label": {
        "& $bankCard": {
          backgroundColor: theme.palette.primary[100],
          boxShadow:
            "0px 1px 5px 0px rgba(0, 0, 0, 0.2), 0px 1px 3px 0px rgba(0, 0, 0, 0.14), 0px 5px 3px -1px rgba(0, 0, 0, 0.12)"
        }
      }
    }
  },
  itemName: {
    fontSize: "1.1rem"
  },
  itemPriceLabel: {
    fontSize: "0.8rem"
  },
  itemPrice: {
    fontSize: "1rem"
  },
  itemAmount: {
    fontSize: "0.8rem"
  },
  nextButton: {
    color: "white",
    backgroundColor: theme.palette.primary[200],
    "&:hover": {
      backgroundColor: theme.palette.primary[300]
    }
  },
  uploadButton: {
    fontSize: "0.8rem",
    marginBottom: theme.spacing.unit * 2
  },
  centerButton: {
    textAlign: "center",
    marginTop: 16
  },
  cancelButton: {
    marginTop: theme.spacing.unit
  },
  hide: {
    display: "none"
  },
  loading: {
    marginTop: 350,
    display: "block",
    margin: "0 auto"
  }
});

export default styles;
