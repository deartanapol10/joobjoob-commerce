import React, { Component } from "react";

import {
   Grid,
   Typography,
   TextField,
   Button,
   List,
   ListItem,
   ListItemText,
   FormControl,
   Card,
   CardContent
} from "@material-ui/core";

class Success extends Component {
   state = {
      editing: 0
   };

   handleEditing = event => {
      let { editing } = this.state;

      if (editing === 0) {
         editing = 1;
      } else {
         editing = 0;
      }

      this.setState({
         editing
      });
   };

   displayInput = edit => {
      switch (edit) {
         case 0:
            return (
               <Typography variant="body1" gutterBottom>
                  {`${this.props.userAddress} ${this.props.userProvince} ${
                     this.props.userPostalCode
                  }`}
               </Typography>
            );
         case 1:
            return (
               <Grid container spacing={16}>
                  <Grid item xs={12}>
                     <FormControl
                        className={this.props.classes.formControl}
                        margin="dense"
                     >
                        <TextField
                           id="address-input"
                           label="ที่อยู่"
                           multiline
                           rows="4"
                           defaultValue={this.props.userAddress}
                           onChange={this.props.handleUserAddress}
                        />
                     </FormControl>
                  </Grid>
                  <Grid item xs={12} sm={6}>
                     <FormControl
                        className={this.props.classes.formControl}
                        margin="dense"
                     >
                        <TextField
                           required
                           id="province-input"
                           label="จังหวัด"
                           defaultValue={this.props.userProvince}
                           onChange={this.props.handleUserProvince}
                        />
                     </FormControl>
                  </Grid>
                  <Grid item xs={12} sm={6}>
                     <FormControl
                        className={this.props.classes.formControl}
                        margin="dense"
                     >
                        <TextField
                           required
                           id="postal-code-input"
                           label="รหัสไปรษณีย์"
                           defaultValue={this.props.userPostalCode}
                           onChange={this.props.handleUserPostalCode}
                        />
                     </FormControl>
                  </Grid>
                  <Grid
                     item
                     xs={12}
                     className={this.props.classes.centerButton}
                  >
                     <Button
                        variant="text"
                        size="small"
                        onClick={this.handleEditing}
                     >
                        ตกลง
                     </Button>
                  </Grid>
               </Grid>
            );
      }
   };

   render() {
      const { classes } = this.props;
      return (
         <React.Fragment>
            <Typography
               variant="title"
               gutterBottom
               className={classes.titleSecondary}
            >
               สถานะ
            </Typography>
            <Card className={classes.card}>
               <CardContent className={`${classes.centerCard} processing`}>
                  <Typography variant="title">
                     แจ้งโอนแล้ว รอร้านค้าเช็คยอด
                  </Typography>
                  <Typography variant="body1">
                     กรุณากลับมาเช็คสถานะภายหลัง
                  </Typography>
               </CardContent>
            </Card>
            <List disablePadding>
               <ListItem className={classes.listItem}>
                  <ListItemText primary="ยอดที่โอน" />
                  <Typography variant="body1">{this.props.total}</Typography>
               </ListItem>
               <ListItem className={classes.listItem}>
                  <ListItemText primary="ธนาคาร" />
                  <Typography variant="body1">{this.props.bank}</Typography>
               </ListItem>
               <ListItem className={classes.listItem}>
                  <ListItemText primary="วันที่โอน" />
                  <Typography variant="body1">{this.props.userDate}</Typography>
               </ListItem>
               <ListItem className={classes.listItem}>
                  <ListItemText primary="เวลาที่โอน" />
                  <Typography variant="body1">{this.props.userTime}</Typography>
               </ListItem>
               <ListItem className={classes.listItem}>
                  <ListItemText primary="ที่อยู่จัดส่ง" />
                  <Button
                     disableRipple
                     variant="text"
                     size="small"
                     onClick={this.handleEditing}
                  >
                     แก้ไข
                  </Button>
               </ListItem>
            </List>
            {this.displayInput(this.state.editing)}
         </React.Fragment>
      );
   }
}

export default Success;
