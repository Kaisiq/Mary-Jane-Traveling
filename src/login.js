import './styles.css'
import React, { useState } from 'react'
import reportWebVitals from './reportWebVitals'
import firebase from './firebase'
import { getAuth, signInWithPopup, GoogleAuthProvider, FacebookAuthProvider} from "firebase/auth"
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

  const removeError = () => {
    var err = document.getElementById("error-msg");
    err.style.transform = "translateX(110%)";
  }
  const showError = (errorMsg) => {
    var err = document.getElementById("error-msg");
    err.style.transform = "translateX(0%)";
    var myImg = document.getElementById("map");
    myImg.style.transform = '';
    setTimeout(removeError, 5500);
  }

  const handleSubmit = (event) => {
    event.preventDefault();
    
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
              navigate('/ChooseActivities',{
                state: {uid: user.uid}})
            })
            .catch((error) => {
              showError();
              console.error('Error logging in user:', error);
            });

        })
        .catch((error) => {
          showError();
          console.error('Error registering user:', error);
        });
    } else {
      firebase.auth().signInWithEmailAndPassword(email, password)
        .then((userCredential) => {
          // User logged in successfully
          const user = userCredential.user;
          console.log('User logged in:', user);
          setTimeout(function () { navigate('/ChooseActivities',{
            state: {uid: user.uid}}) }, 500);
        })
        .catch((error) => {
          showError();
          console.error('Error logging in user:', error);
        });
    }
  }

  const handleSocialSubmit = async (provider) => {

    if (provider instanceof GoogleAuthProvider){
      provider.addScope('https://www.googleapis.com/auth/contacts.readonly');
    } 

    const auth = getAuth();
    signInWithPopup(auth, provider)
      .then((result) => {
        // This gives you a Google Access Token. You can use it to access the Google API.
        //const credential = provider.credentialFromResult(result);
        
        // The signed-in user info.
        const user = auth.currentUser;
        fetchUserData(user.uid)
        navigate('/ChooseActivities',{
          state: {uid: user.uid}})
            
      }).catch((error) => {
        showError(error);
      });
  }

  async function fetchUserData(userUid){
  const database = firebase.database();
    try{
      const userDataCatsRef = database.ref(`Users/${userUid}/cats`)
      const userDataRegsRef = database.ref(`Users/${userUid}/regs`)
      const catsSnapshot = await userDataCatsRef.once("value")
      const regsSnapshot = await userDataRegsRef.once("value")
      const userData = catsSnapshot.val()
      const userDatavtwo = regsSnapshot.val()
      console.log(userData,userDatavtwo)
     
    }
    catch (error)  {
        console.log("Error getting user data:", error);
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

  return (
    <div className='login-form'>
      <div id={"map"} className={'background'}></div>
      <div className={"error-message"} id={"error-msg"}>Не съществува акаунт с тези име и парола</div>
      <form onSubmit={handleSubmit}>
        <h2>{isRegistering ? 'Регистрация' : 'Влизане'}</h2>
        <label>
          Email:
        </label>
        <input type="email" value={email} placeholder={"your@email.com"} onChange={handleEmailChange} />
        <label>
          Password:
        </label>
        <input type="password" value={password} placeholder={"your password"} onChange={handlePasswordChange} />
        <button onClick={zoomin} type="submit">{isRegistering ? 'Регистриране' : 'Влизане'}</button>
        <div className={"flex"}>
          <button onClick={toggleRegister}>
            {isRegistering ? 'Вече имаш акаунт?' : 'Регистрация'}
          </button>
          <button>
            Админ
          </button>
        </div>
      </form>
        <div className={"flex"}>
          <button className={"small-img"}><img src={fblogo} alt={"fblogo"} onClick={function(){zoomin();handleSocialSubmit(new FacebookAuthProvider());}} /></button>
          <button className={"small-img"}><img src={googlelogo} alt={"googlelogo"} onClick={function(){zoomin();handleSocialSubmit(new GoogleAuthProvider());}} /></button>
        </div>
    </div>
  );
}
export default LoginForm;

reportWebVitals();