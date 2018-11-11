import React, { Component } from "react";

import { Button, withStyles } from "@material-ui/core";

const styles = theme => ({
   buttons: {
      display: "flex",
      justifyContent: "flex-end"
   },
   button: {
      marginLeft: theme.spacing.unit
   }
});

class TestButton extends Component {
   render() {
      const { classes } = this.props;
      return (
         <div className={classes.buttons}>
            <Button className={classes.button}>Back</Button>
            <Button className={classes.button}>Next</Button>
            <Button className={classes.button}>Test</Button>
         </div>
      );
   }
}

export default withStyles(styles, { withTheme: true })(TestButton);
