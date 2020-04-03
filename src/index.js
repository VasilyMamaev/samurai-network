import React from 'react'
import ReactDOM from 'react-dom';
import './index.css';
import store from './redux/redux-store'
import { HashRouter } from 'react-router-dom';
import App from './App';
import { Provider } from 'react-redux';
 
  ReactDOM.render( 
    <HashRouter>
      <Provider store={store}>
        <App/>
      </Provider>
    </HashRouter>, document.getElementById('root'));

