import { createMuiTheme } from "@material-ui/core/styles";
import red from "@material-ui/core/colors/red";
import pink from "@material-ui/core/colors/pink";
import { fade } from "@material-ui/core/styles/colorManipulator";

export default createMuiTheme({
	palette: {
		primary: pink,
		secondary: red,
	},
	typography: {
		useNextVariants: true,
		fontFamily: [
			"Mitr",
			"Roboto",
		].join(","),
	},
	overrides: {
		MuiToolbar: {
			regular: {
				minHeight: 72,
			},
		},
		MuiButton: {
			root: {
				fontSize: "0.875rem",
				color: "#fff",
				backgroundColor: "#03DAC6",
				"&:hover": {
					backgroundColor: fade("#03DAC6", 0.5),
				},
				"&:disabled": {
					color: fade("#fff", 0.5),
					backgroundColor: fade("#000", 0.08),
				}
			},
		},
		MuiButtonBase: {
			root: {
				"&:focus": {
					outline: "none",
				},
			},
		},
		MuiBadge: {
			badge: {
				fontSize: 14,
			},
			invisible: {
				display: "none",
			},
		},
		MuiFormControlLabel: {
			root: {
				marginBottom: 0,
			}
		},
		MuiStepLabel: {
			iconContainer: {
				paddingRight: 0,
			},
		},
		MuiStepIcon: {
			root: {
				color: "#999",
				"&$active": {
					color: pink[100],
				},
				"&$completed": {
					color: pink[500],
				},
				"&$error": {
					color: pink[100],
				}
			},
		},
		MuiIconButton: {
			root: {
				padding: 12,
			},
		},
	},
});
