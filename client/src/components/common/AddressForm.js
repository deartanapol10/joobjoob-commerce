import React, { Component } from "react";
// import { actions } from 'react-redux-form';
// import validator from 'validator';
// import { Textbox } from 'react-inputs-validation';
import { FormErrors } from './FormErrors';

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
  constructor(props) {
    super(props);
    this.state = {
      name: '',
      last_name: '',
      // phone_number: '',
      address: '',
      province: '',
      zip_code: '',
      formErrors: { name: '', last_name: '', address: '', province: '', zip_code: '' },
      nameValid: false,
      last_nameValid: false,
      // phone_numberValid: false,
      addressValid: false,
      provinceValid: false,
      zip_codeValid: false,
      formValid: false
    }
  }

  handleUserInput = (e) => {
    const name = e.target.name;
    const value = e.target.value;
    this.setState({ [name]: value },
      () => { this.validateField(name, value) });
  }

  validateField(fieldName, value) {
    let fieldValidationErrors = this.state.formErrors;
    let nameValid = this.state.nameValid;
    let last_nameValid = this.state.last_nameValid;
    // let phone_numberValid = this.state.phone_numberValid;
    let addressValid = this.state.addressValid;
    let provinceValid = this.state.provinceValid;
    let zip_codeValid = this.state.zip_codeValid;

    switch (fieldName) {
      case 'name':
        //   emailValid = value.match(/^([\w.%+-]+)@([\w-]+\.)+([\w]{2,})$/i);
        nameValid = value.match(/^[a-zA-Z]+(([',. -][a-zA-Z ])?[a-zA-Z]*)*$/)
        fieldValidationErrors.name = nameValid ? '' : ' is invalid';
        break;
      case 'last_name':
        last_nameValid = value.match(/^[a-zA-Z]+(([',. -][a-zA-Z ])?[a-zA-Z]*)*$/)
        fieldValidationErrors.last_name = last_nameValid ? '' : ' is invalid';
        break;
      // case 'phone_number':
      //   phone_numberValid = value.length >= 6;
      //   fieldValidationErrors.phone_number = phone_numberValid ? '' : ' is too short';
      //   break;
      case 'address':
        addressValid = value.match(/^\d+[\/\?+\s[A-z]/);
        fieldValidationErrors.address = addressValid ? '' : ' is invalid';
        break;
      case 'province':
      provinceValid = value.match(/^[A-z]/);
        fieldValidationErrors.province = provinceValid ? '' : ' is invalid';
        break;
      case 'zip_code':
      zip_codeValid = value.match(/^\d/);
        fieldValidationErrors.zip_code = zip_codeValid ? '' : ' is invalid';
        break;


      default:
        break;
    }
    this.setState({
      formErrors: fieldValidationErrors,
      nameValid: nameValid,
      last_nameValid: last_nameValid,
      // phone_numberValid: phone_numberValid,
      addressValid: addressValid,
      provinceValid: provinceValid,
      zip_codeValid: zip_codeValid
    }, this.validateForm);
  }

  validateForm() {
    this.setState({
      formValid: this.state.nameValid && this.state.last_nameValid &&
        this.state.addressValid &&  this.state.provinceValid &&  this.state.zip_codeValid
    }); 
  }

  errorClass(error) {
    return (error.length === 0 ? '' : 'has-error');
  }

  render() {
    const { classes } = this.props;
    return (
      <React.Fragment>
        <Typography
          variant="title"
          gutterBottom
          className={classes.titleSecondary}
        >
          ที่อยู่สำหรับจัดส่งแบบ2
              </Typography>

        <Grid container spacing={16}>
          <Grid item xs={12} sm={6}>
            <div className="panel panel-default">
              <FormErrors formErrors={this.state.formErrors} />
            </div>
            <div className={`form-group ${this.errorClass(this.state.formErrors.name)}`} margin="normal">
              <TextField type="name" required className="form-control" name="name"
                label="ชื่อ"
                placeholder="ชื่อ"
                value={this.state.name}
                onChange={this.handleUserInput} />
            </div>
          </Grid>
          <Grid item xs={12} sm={6}>
            <div className={`form-group ${this.errorClass(this.state.formErrors.last_name)}`} margin="normal">
              <TextField type="last_name" required className="form-control" name="last_name"
                label="นามสกุล"
                placeholder="นามสกุล"
                value={this.state.last_name}
                onChange={this.handleUserInput}
              />
            </div>
          </Grid>
          <Grid item xs={12}>
            <div margin="dense">
              <TextField
                required
                label="เบอร์โทรติดต่อ"
                id="number-input"
                // value={this.state.phone_number}
                onChange={this.handleUserInput}
                InputProps={{
                  inputComponent: NumberFormatCustom
                }}
              />
            </div>
          </Grid>
          <Grid item xs={12}>
            <div className={`form-group ${this.errorClass(this.state.formErrors.address)}`} margin="dense">
              <TextField type="address" required className="form-control" name="address"
                id="address-input"
                label="ที่อยู่"
                multiline
                rows="4"
                value={this.state.address}
                onChange={this.handleUserInput}
              />
            </div>
          </Grid>
          <Grid item xs={12} sm={6}>
            <div className={`form-group ${this.errorClass(this.state.formErrors.province)}`} margin="dense">
              <TextField type="province" className="form-control" name="province"
                required
                id="province-input"
                label="จังหวัด"
                value={this.state.province}
                onChange={this.handleUserInput}
              />
            </div>
          </Grid>
          <Grid item xs={12} sm={6}>
            <div className={`form-group ${this.errorClass(this.state.formErrors.zip_code)}`} margin="dense">
              <TextField type="zip_code" className="form-control" name="zip_code"
                required
                id="postal-code-input"
                label="รหัสไปรษณีย์"
                value={this.state.zip_code}
                onChange={this.handleUserInput}
              />
            </div>
          </Grid>
          <Grid item xs={12} className={classes.centerButton}>
            <Button disabled={!this.state.formValid}
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
//--------------------------
//   constructor(props) {
//     super(props);
//     this.state = {
//       email: '',
//       password: '',
//       formErrors: { email: '', password: '' },
//       emailValid: false,
//       passwordValid: false,
//       formValid: false
//     }
//   }

//   handleUserInput = (e) => {
//     const name = e.target.name;
//     const value = e.target.value;
//     this.setState({ [name]: value },
//       () => { this.validateField(name, value) });
//   }

//   validateField(fieldName, value) {
//     let fieldValidationErrors = this.state.formErrors;
//     let emailValid = this.state.emailValid;
//     let passwordValid = this.state.passwordValid;

//     switch (fieldName) {
//       case 'email':
//         emailValid = value.match(/^([\w.%+-]+)@([\w-]+\.)+([\w]{2,})$/i);
//         fieldValidationErrors.email = emailValid ? '' : ' is invalid';
//         break;
//       case 'password':
//         passwordValid = value.length >= 6;
//         fieldValidationErrors.password = passwordValid ? '' : ' is too short';
//         break;
//       default:
//         break;
//     }
//     this.setState({
//       formErrors: fieldValidationErrors,
//       emailValid: emailValid,
//       passwordValid: passwordValid
//     }, this.validateForm);
//   }

//   validateForm() {
//     this.setState({ formValid: this.state.emailValid && this.state.passwordValid });

//   }

//   errorClass(error) {
//     return (error.length === 0 ? '' : 'has-error');
//   }

//   render() {
//     return (
//       <form className="demoForm">
//         <h2>Sign up</h2>
//         <div className="panel panel-default">
//           <FormErrors formErrors={this.state.formErrors} />
//         </div>
//         <div className={`form-group ${this.errorClass(this.state.formErrors.email)}`}>
//           <label htmlFor="email">Email address</label>
//           <input type="email" required className="form-control" name="email"
//             placeholder="Email"
//             value={this.state.email}
//             onChange={this.handleUserInput} />
//         </div>
//         <div className={`form-group ${this.errorClass(this.state.formErrors.password)}`}>
//           <label htmlFor="password">Password</label>
//           <input type="password" className="form-control" name="password"
//             placeholder="Password"
//             value={this.state.password}
//             onChange={this.handleUserInput} />
//         </div>
//         <Button disabled={!this.state.formValid}
//           fullWidth
//           onClick={this.props.handleNext}
//         // className={classes.nextButton}
//         >
//           ทำต่อ
//                   </Button>
//         <button type="submit" className="btn btn-primary" disabled={!this.state.formValid}>Sign up</button>
//       </form>
//     )
//   }
// }
export default AddressForm;
