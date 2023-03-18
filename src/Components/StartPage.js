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

    // const handleSubmit = (event) => {
        // event.preventDefault();
        // const auth = getAuth();
        // if (isRegistering) {
        //     firebase.auth().createUserWithEmailAndPassword(email, password)
        //         .then((userCredential) => {
        //             // User registered successfully
        //             console.log(email);
        //             const user = userCredential.user;
        //             console.log('User registered:', user);
        //             firebase.auth().signInWithEmailAndPassword(email, password)
        //                 .then((userLoggedInCredential) => {
        //                     // User logged in successfully
        //                     const user = userLoggedInCredential.user;
        //                     console.log('User logged in:', user);
        //                 })
        //                 .catch((error) => {
        //                     console.error('Error logging in user:', error);
        //                 });
        //         })
        //         .catch((error) => {
        //             console.error('Error registering user:', error);
        //         });
        // } else {
        //     firebase.auth().signInWithEmailAndPassword(email, password)
        //         .then((userCredential) => {
        //             // User logged in successfully
        //             const user = userCredential.user;
        //             console.log('User logged in:', user);
        //         })
        //         .catch((error) => {
        //             console.error('Error logging in user:', error);
        //         });
        // }
    // }
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