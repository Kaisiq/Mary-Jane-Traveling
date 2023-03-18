import React,{useState} from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import reportWebVitals from './reportWebVitals';
import Login from "./Components/Login";
import Header from "./Components/Header";
import Footer from "./Components/Footer";
import firebase from './firebase';
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
    
    const handleSubmit = (event) => {
        event.preventDefault();
        firebase.auth().signInWithEmailAndPassword(email, password)
          .then((userCredential) => {
            
            firebase.firestore().collection('users').doc(userCredential.user.uid).set({
              email: userCredential.user.email,
              displayName: userCredential.user.displayName,
              photoURL: userCredential.user.photoURL,
            });
          })
          .catch((error) => {
            console.log(error.message);
          });
      };
      function toggleRegister(){
        setIsRegistering(!isRegistering);
      }
    return (
    <div className='login-form'>
        <h2>{isRegistering ? 'Register' : 'Login'}</h2>
      <form onSubmit={handleSubmit}>
        <label>
          Email:
          <input type="email" value={email} onChange={handleEmailChange} />
        </label>
        <label>
          Password:
          <input type="password" value={password} onChange={handlePasswordChange} />
        </label>
        <button type="submit">{isRegistering ? 'Register' : 'Login'}</button>
      </form>
      <button onClick={toggleRegister}>
        {isRegistering ? 'Already have an account?' : 'Register'}
      </button>
      </div>
    );
  }
  export default LoginForm;

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
