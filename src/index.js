import React from 'react';
import ReactDOM from 'react-dom';
import {Provider} from 'react-redux';
import './index.css';
import Payout from './containers/Payout';
import rootStore from './reducers/index';
import * as serviceWorker from './serviceWorker';
import { Route, BrowserRouter as Router, Switch} from 'react-router-dom';

ReactDOM.render(
	<Provider store={rootStore}>
	  <Router>
		<Switch>
		  <Route exact path="/:id" component={Payout} />
		</Switch>
	  </Router>		
	</Provider>, 
	document.getElementById('root'));

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();