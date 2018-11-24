import React, { Component } from 'react';
import { FormErrors } from './FormErrors';

import {
	Grid,
	Typography,
	TextField,
	Button,
	FormControl,
	Divider,
	Input,
	InputLabel,
	InputAdornment,
	Card,
	CardContent,
	CardMedia
} from "@material-ui/core";

const banks = [
	{
		id: 1,
		name: 'ธนาคาร กสิกรไทย',
		account: '720-2-96785-6',
		owner: 'สุตาภัทร ชนะพันธ์',
		image: 'https://lh3.googleusercontent.com/D6EekiR7JCBJKBoIhU2QxiXvMsTAzNY6yk42esaRBJNouAlBSqmh1Vk8k9xSRMwg71Q',
	},
	{
		id: 2,
		name: 'ธนาคาร ไทยพานิชย์',
		account: '406-3-08163-3',
		owner: 'ฉันชนก วุฒิอังสโวทัย',
		image: 'https://apprecs.org/gp/images/app-icons/300/ed/com.scb.phone.jpg',
	},
]

class PaymentForm extends Component {
	constructor(props) {
		super(props);
		this.state = {
			money: '',
			formErrors: { money: '' },
			moneyValid: false,
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
		let moneyValid = this.state.moneyValid;

		switch (fieldName) {
			case 'money':
				// moneyValid = value.match(/^\d/)
				moneyValid = value.match(this.props.total)
				fieldValidationErrors.money = moneyValid ? '' : ' is invalid';
				break;
			default:
				break;
		}
		this.setState({
			formErrors: fieldValidationErrors,
			moneyValid: moneyValid,
		}, this.validateForm);
	}

	validateForm() {
		this.setState({
			formValid: this.state.moneyValid
		});
	}

	errorClass(error) {
		return (error.length === 0 ? '' : 'has-error');
	}
	render() {
		const { classes } = this.props;
		return (
			<React.Fragment>
				<Typography variant="title" gutterBottom className={classes.titleSecondary}>
					วิธีการชำระเงิน
				</Typography>
				<Grid container spacing={16}>
					<Grid item xs={12}>
						<FormControl className={classes.formControl}>
							<div className={classes.bankRadio}>
								<div>
									<input type="radio" name="bank-radio" id="kbank" value="ธนาคาร กสิกรไทย" onChange={this.props.handleBank} />
									<label htmlFor="kbank">
										<Card className={classes.bankCard} key={banks[0].id}>
											<CardMedia
												className={classes.bankMedia}
												image={banks[0].image}
												title={banks[0].name}
											/>
											<CardContent className={classes.bankContent}>
												<Typography variant="headline" className={classes.itemName}>{banks[0].account}</Typography>
												<Typography variant="body1" color="textSecondary">{banks[0].name}</Typography>
												<Typography variant="body1" color="textSecondary">{banks[0].owner}</Typography>
											</CardContent>
										</Card>
									</label>
								</div>
								<div>
									<input type="radio" name="bank-radio" id="scb" value="ธนาคาร ไทยพาณิชย์" onChange={this.props.handleBank} />
									<label htmlFor="scb">
										<Card className={classes.bankCard} key={banks[1].id}>
											<CardMedia
												className={classes.bankMedia}
												image={banks[1].image}
												title={banks[1].name}
											/>
											<CardContent className={classes.bankContent}>
												<Typography variant="headline" className={classes.itemName}>{banks[1].account}</Typography>
												<Typography variant="body1" color="textSecondary">{banks[1].name}</Typography>
												<Typography variant="body1" color="textSecondary">{banks[1].owner}</Typography>
											</CardContent>
										</Card>
									</label>
								</div>
							</div>
						</FormControl>
						<Divider className={classes.divider} />
						<div className="panel panel-default">
							<FormErrors formErrors={this.state.formErrors} />
						</div>
						<div className={`form-group ${this.errorClass(this.state.formErrors.money)}`} margin="normal">
							<InputLabel  htmlFor="transfered-amount">เงินที่โอน</InputLabel>
							<Input margin="normal" type="money" required className="form-control" name="money"
								required
								id="transfered-amount"
								placeholder={this.props.total}
								type="number"
								value={this.state.money}
								onChange={this.handleUserInput}
								endAdornment={<InputAdornment position="end">บาท</InputAdornment>}
							/>
						</div>
					</Grid>
					<Grid item xs={12} sm={6}>
						<FormControl className={classes.formControl} margin="normal">
							<TextField
								required
								id="transfered-date"
								label="วันที่โอน"
								type="date"
								defaultValue="2018-09-26"
								onChange={this.props.handleUserDate}
								InputLabelProps={{
									shrink: true,
								}}
							/>
						</FormControl>
					</Grid>
					<Grid item xs={12} sm={6}>
						<FormControl className={classes.formControl} margin="normal">
							<TextField
								required
								id="transfered-time"
								label="เวลาที่โอน"
								type="time"
								defaultValue="08:00"
								onChange={this.props.handleUserTime}
								InputLabelProps={{
									shrink: true,
								}}
								inputProps={{
									step: 300,
								}}
							/>
						</FormControl>
					</Grid>
					<Grid item xs={12}>
						<FormControl className={classes.formControl} margin="normal">
							<label htmlFor="transfered-file">
								<Button variant="outlined" component="span" className={classes.uploadButton}>
									แนบหลักฐาน
								</Button>
							</label>
							<input
								accept="image/*"
								className={classes.input}
								id="transfered-file"
								multiple
								type="file"
								onChange={this.props.handleUserFile}
							/>
							<Input
								id="transfered-file-display"
								type="text"
								className={classes.fileDisplayInput}
								value={this.props.userFile}
							/>
						</FormControl>
					</Grid>
					<Grid item xs={12} className={classes.centerButton}>
						<Button disabled={!this.state.formValid} fullWidth onClick={this.props.handleNext} className={classes.nextButton}>ทำต่อ</Button>
					</Grid>
				</Grid>
			</React.Fragment>
		);
	}

}

export default PaymentForm;
