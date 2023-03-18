import React, { useState ,Component} from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './Components/App';
import reportWebVitals from './reportWebVitals';
import LoginForm from './login';
import Logged from "./Components/Logged";
import './login.css'
import firebaseConfig from './firebase';
import firebase from './firebase';
import StartPage from "./Components/StartPage";

const isLogged = false;
const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <Logged />
  </React.StrictMode>
)
// export default placeHolderName;
// root.render(
//   <React.StrictMode>
//     <App />
//   </React.StrictMode>
// ); 
// something like this should be for the displaying of the login form
/*ReactDOM.hydrate(
  <React.StrictMode>
    <placeHolderName/>
  </React.StrictMode>,
  document.getElementById('root')
);*/
// or this
/*root.render(
  <React.StrictMode>
    <placeHolderName/>
  </React.StrictMode>
);*/
// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
