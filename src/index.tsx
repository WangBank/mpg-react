import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter } from 'react-router-dom';
import './index.css';
import { Provider as StoreProvider, observer } from 'mobx-react';
import App from './App';
import reportWebVitals from './reportWebVitals';
import BaseStore from './stores/BaseStore';

const config = {
  BaseAPIURL:'https://staging.mapleplan.com.au:8083/api/'
};
const rootStore = new BaseStore(config);



const ObserverContainer = observer(() => (
  <BrowserRouter>
      <App />
  </BrowserRouter>
));

const containerDiv=document.getElementById('root');

ReactDOM.render(
  <StoreProvider
      rootStore={rootStore} 
      SupportItemService={rootStore.SupportItemService}
      SupportItemStore={rootStore.SupportItemStore}
      LoginService={rootStore.LoginService}
      LoginStore={rootStore.LoginStore}
      StaffStore={rootStore.StaffStore}
      StaffService={rootStore.StaffService}
  >
      <ObserverContainer />
  </StoreProvider>,containerDiv );
// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
