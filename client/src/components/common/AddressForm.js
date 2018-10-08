import React, { Component } from "react";

import {
   Grid,
   Typography,
   TextField,
   Button,
   FormControl
} from "@material-ui/core";

import NumberFormat from "react-number-format";

function NumberFormatCustom(props) {
   const { inputRef, onChange, ...other } = props;

   return (
      <NumberFormat
         {...other}
         getInputRef={inputRef}
         onValueChange={values => {
            onChange({
               target: {
                  value: values.value
               }
            });
         }}
         format="###-###-####"
      />
   );
}

class AddressForm extends Component {
   render() {
      const { classes } = this.props;
      return (
         <React.Fragment>
            <Typography
               variant="title"
               gutterBottom
               className={classes.titleSecondary}
            >
               ที่อยู่สำหรับจัดส่ง
            </Typography>
            <Grid container spacing={16}>
               <Grid item xs={12} sm={6}>
                  <FormControl className={classes.formControl} margin="normal">
                     <TextField
                        required
                        id="name-first-input"
                        label="ชื่อ"
                        onChange={this.props.handleUserFirstName}
                     />
                  </FormControl>
               </Grid>
               <Grid item xs={12} sm={6}>
                  <FormControl className={classes.formControl} margin="normal">
                     <TextField
                        required
                        id="name-last-input"
                        label="นามสกุล"
                        onChange={this.props.handleUserLastName}
                     />
                  </FormControl>
               </Grid>
               <Grid item xs={12}>
                  <FormControl className={classes.formControl} margin="dense">
                     <TextField
                        required
                        label="เบอร์โทรติดต่อ"
                        id="number-input"
                        onChange={this.props.handleUserNumber}
                        InputProps={{
                           inputComponent: NumberFormatCustom
                        }}
                     />
                  </FormControl>
               </Grid>
               <Grid item xs={12}>
                  <FormControl className={classes.formControl} margin="dense">
                     <TextField
                        id="address-input"
                        label="ที่อยู่"
                        multiline
                        rows="4"
                        onChange={this.props.handleUserAddress}
                     />
                  </FormControl>
               </Grid>
               <Grid item xs={12} sm={6}>
                  <FormControl className={classes.formControl} margin="dense">
                     <TextField
                        required
                        id="province-input"
                        label="จังหวัด"
                        onChange={this.props.handleUserProvince}
                     />
                  </FormControl>
               </Grid>
               <Grid item xs={12} sm={6}>
                  <FormControl className={classes.formControl} margin="dense">
                     <TextField
                        required
                        id="postal-code-input"
                        label="รหัสไปรษณีย์"
                        onChange={this.props.handleUserPostalCode}
                     />
                  </FormControl>
               </Grid>
               <Grid item xs={12} className={classes.centerButton}>
                  <Button
                     fullWidth
                     onClick={this.props.handleNext}
                     className={classes.nextButton}
                  >
                     ทำต่อ
                  </Button>
                  <Button
                     disableRipple
                     variant="text"
                     size="small"
                     onClick={this.props.handleBack}
                     className={classes.cancelButton}
                  >
                     ย้อนกลับ
                  </Button>
               </Grid>
            </Grid>
         </React.Fragment>
      );
   }
}

export default AddressForm;
