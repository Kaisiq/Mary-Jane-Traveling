import './login.css'
import './index.css'

import React, { useState } from 'react'
import reportWebVitals from './reportWebVitals'
import firebase from './firebase'
import { getAuth, createUserWithEmailAndPassword, signInWithEmailAndPassword, signInWithPopup, GoogleAuthProvider,FacebookAuthProvider } from "firebase/auth"
import { useNavigate } from "react-router-dom"
import fblogo from './media/facebook.webp'
import googlelogo from './media/google.png'

function LoginForm() {
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
          setTimeout(function () { navigate('/Logged') }, 500);
        })
        .catch((error) => {
          console.error('Error logging in user:', error);
        });
    }
  }

  const handleGoogleSubmit = async () => {
    const provider = new GoogleAuthProvider();
    provider.addScope('https://www.googleapis.com/auth/contacts.readonly');

    const auth = getAuth();
    signInWithPopup(auth, provider)
      .then((result) => {
        // This gives you a Google Access Token. You can use it to access the Google API.
        const credential = GoogleAuthProvider.credentialFromResult(result);
        const token = credential.accessToken;
        // The signed-in user info.
        const user = result.user;
        // IdP data available using getAdditionalUserInfo(result)
        // ...

        navigate('/Logged')
      }).catch((error) => {
        // Handle Errors here.
        const errorCode = error.code;
        const errorMessage = error.message;
        // The email of the user's account used.
        const email = error.customData.email;
        // The AuthCredential type that was used.
        const credential = GoogleAuthProvider.credentialFromError(error);
        // ...
      });
  }

  const handleFacebookSubmit = async () => {
    const provider = new FacebookAuthProvider();
    const auth = getAuth();

    signInWithPopup(auth, provider)
      .then((result) => {
        const credential = FacebookAuthProvider.credentialFromResult(result);
        const token = credential.accessToken;
        const user = result.user;

        navigate('/Logged')
      }).catch((error) => {
        // Handle Errors here.
        const errorCode = error.code;
        const errorMessage = error.message;
        // The email of the user's account used.
        const email = error.customData.email;
        // The AuthCredential type that was used.
        const credential = FacebookAuthProvider.credentialFromError(error);
        // ...
      });
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
        <button className={"small-img"}><img src={fblogo} alt={"fblogo"} onClick={handleFacebookSubmit}/></button>
        <button className={"small-img"}><img src={googlelogo} alt={"googlelogo"} onClick={handleGoogleSubmit} /></button>
      </div>
    </div>
  );
}
export default LoginForm;

reportWebVitals();