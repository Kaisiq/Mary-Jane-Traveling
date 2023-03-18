import React,{useState} from 'react';
import ReactDOM from 'react-dom/client';
import '../index.css';
import reportWebVitals from '../reportWebVitals';
import firebase from '../firebase';
import { getAuth, createUserWithEmailAndPassword,signInWithEmailAndPassword } from "firebase/auth";
import '../login.css'
import Logged from "./Logged";
import LoginForm from "../login";


function StartPage(){
    const [isLogged, setIsLogged] = useState(false);

    function toggleLogged(){
        setIsLogged(!isLogged);
    }

    return (
        <div className='login-box-container'>
            {isLogged ? <Logged/> : <LoginForm/>}
        </div>
    );
}
export default StartPage;

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();