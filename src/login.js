import React, { useState } from 'react';
import './index.css';
import reportWebVitals from './reportWebVitals';
import firebase from './firebase';
import { getAuth, createUserWithEmailAndPassword, signInWithEmailAndPassword, FacebookAuthProvider, getRedirectResult } from "firebase/auth";
import { useAuthState } from 'react-firebase-hooks/auth';
import { useNavigate } from "react-router-dom";
import './login.css'
import fblogo from './media/facebook.webp'
import googlelogo from './media/google.png'



function LoginForm() {
  const provider = new FacebookAuthProvider();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isRegistering, setIsRegistering] = useState(false);
  const navigate = useNavigate();


  const handleEmailChange = (event) => {
    setEmail(event.target.value);
  }
  const handlePasswordChange = (event) => {
    setPassword(event.target.value);
  };
  function toggleRegister() {
    setIsRegistering(!isRegistering);
  }


  const handleSubmit = (event) => {
    event.preventDefault();
    const auth = getAuth();
    if (isRegistering) {
      firebase.auth().createUserWithEmailAndPassword(email, password)
        .then((userCredential) => {
          console.log(email);
          const user = userCredential.user;
          console.log('User registered:', user);

              firebase.auth().signInWithEmailAndPassword(email, password)
                .then((userLoggedInCredential) => {
                const user = userLoggedInCredential.user;
                console.log('User logged in:', user);
                navigate('/ChooseActivites')
              })
              .catch((error) => {
                console.error('Error logging in user:', error);
              });
             
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
                setTimeout(function() {navigate('/Logged')}, 500);
              })
              .catch((error) => {
                console.error('Error logging in user:', error);
              });


    }
  }

  const zoomin = () => {
    var myImg = document.getElementById("map");
    var currTransform = myImg.style.transform;
    if (currTransform) {
      myImg.style.transform = '';
    }
    else {
      myImg.style.transform = 'scale(5,5)';
    }
  }


  const [user, loading, error] = useAuthState(firebase.auth());
  const handleFacebook = async () => {
    try {
      const provider = new firebase.auth.FacebookAuthProvider();
      await firebase.auth().signInWithPopup(provider);

      navigate('/Logged')
    } catch (error) {
      console.error(error);
    }
  
    
  if (loading) {
    alert("Loading...");
  }

  if (error) {
    alert("An error occured while connecting to facebook.")
  };
  };

  return (
    <div className='login-form'>
      <div id="fb-root"></div>
      <script async defer crossOrigin="anonymous"
        src="https://connect.facebook.net/en_US/sdk.js#xfbml=1&version=v16.0" nonce="rqvBXiYe"></script>
      <div id={"map"} className={'background'}></div>
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
        <button onClick={zoomin} type="submit">{isRegistering ? 'Регистриране' : 'Влизане'}</button>
      </form>
      <div className={"flex"}>
        <button onClick={toggleRegister}>
          {isRegistering ? 'Вече имаш акаунт?' : 'Регистрация'}
        </button>
        <button>
          Админ
        </button>
      </div>
      <div className={"flex"}>
        <button onClick={handleFacebook} className={"small-img"}><img src={fblogo} alt={"fblogo"} /></button>
        <button className={"small-img"}><img src={googlelogo} alt={"googlelogo"} /></button>
      </div>
    </div>
  );
}
export default LoginForm;

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();