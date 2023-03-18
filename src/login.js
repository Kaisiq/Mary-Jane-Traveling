import React,{useState} from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import reportWebVitals from './reportWebVitals';
import firebase from './firebase';
import { getAuth, createUserWithEmailAndPassword,signInWithEmailAndPassword } from "firebase/auth";
import './login.css'


function LoginForm(){
    const [email,setEmail] = useState('');
    const [password,setPassword] = useState('');
    const [isRegistering, setIsRegistering] = useState(false);
  
    const handleEmailChange = (event) =>{
      setEmail(event.target.value);
    }
    const handlePasswordChange = (event) => {
      setPassword(event.target.value);
    };
    function toggleRegister(){
     setIsRegistering(!isRegistering);
          }

    const handleSubmit = (event) => {
        event.preventDefault();
        const auth = getAuth();
    if (isRegistering) {
         firebase.auth().createUserWithEmailAndPassword(email, password)
                       .then((userCredential) => {
                // User registered successfully
                console.log(email);
                const user = userCredential.user;
                console.log('User registered:', user);
                
              })
              .catch((error) => {
                console.error('Error registering user:', error);
              });
          } else {
            firebase.auth().signInWithEmailAndPassword(email, password)
              .then((userCredential) => {
                // User logged in successfully
                const user = userCredential.user;
                console.log('User logged in:', user);
              })
              .catch((error) => {
                console.error('Error logging in user:', error);
              });
          }
        }
    return (
    <div className='login-form'>
        <div className={'background'}></div>
        <h2>{isRegistering ? 'Регистрация' : 'Влизане'}</h2>
      <form onSubmit={handleSubmit}>
        <label>
          Email:
        </label>
          <input type="email" value={email} placeholder={"your@email.com"} onChange={handleEmailChange} />
        <label>
          Password:
        </label>
          <input type="password" value={password} placeholder={"your password"} onChange={handlePasswordChange} />
        <button type="submit">{isRegistering ? 'Регистриране' : 'Влизане'}</button>
      </form>
      <button onClick={toggleRegister}>
        {isRegistering ? 'Вече имаш акаунт?' : 'Регистрация'}
      </button>
      </div>
    );
  }
  export default LoginForm;

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();