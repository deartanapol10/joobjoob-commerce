import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';

import { MuiThemeProvider } from '@material-ui/core/styles';
import theme from './themes/sa-theme';

import registerServiceWorker from './registerServiceWorker';

ReactDOM.render(<MuiThemeProvider theme={theme}><App /></MuiThemeProvider>, document.getElementById('root'));
registerServiceWorker();
