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
    err.textContent = errorMsg;
    setTimeout(removeError, 2000);
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
              addUserToDB(user.uid)
              console.log('User logged in:', user);
              navigate('/ChooseActivities',{
                state: {uid: user.uid}})
            })
            .catch((error) => {
              showError(error);
              console.error('Error logging in user:', error);
            });

        })
        .catch((error) => {
          showError(error);
          console.error('Error registering user:', error);
        });
    } else {
      firebase.auth().signInWithEmailAndPassword(email, password)
        .then((userCredential) => {
          // User logged in successfully
          const user = userCredential.user;
          console.log('User logged in:', user);
          setTimeout(function () { navigate('/Logged',{state: {uid: user.uid}}) }, 500);
        })
        .catch((error) => {
          showError(error);
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
        if(isUserInDB(user.uid) === false){
          addUserToDB(user.uid)
          navigate('/ChooseActivities',{
            state: {uid: user.uid}})
        }
        else{
          navigate('/ChooseActivities',{
            state: {uid: user.uid}})
        }
            
      }).catch((error) => {
        showError(error);
      });
  }

  async function addUserToDB(userUid){
    const databaseRef = firebase.database()
    databaseRef.ref('Users/' + userUid).set({
      cats: "",
      regs: ""
    })
    .then(() => {
      console.log('New user added to database');
    })
    .catch((error) => {
      showError(error);
      console.error('Error adding new user to database:', error);
    });
}

  async function isUserInDB(userUid){
      const database = firebase.database()
      const userDataRef = database.ref(`Users/${userUid}`);
      try{
        const snapshot = await userDataRef.once("value");
        const userData = snapshot.val();
        if(!userData.cats){
          return false;
        }
        return true;
      }
      catch(error){
        showError(error);
        console.log("Error getting user data:", error);
        return false;
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
      <div className={"space"}></div>
      <div id={"map"} className={'background'}></div>
      <div className={"error-message"} id={"error-msg"}></div>
      <form onSubmit={handleSubmit}>
          <h1>Mary Jane</h1>
        <h2>{isRegistering ? 'Регистрация' : 'Влизане'}</h2>
        <label>
          Имейл:
        </label>
        <input type="email" value={email} placeholder={"вашият@имейл.com"} onChange={handleEmailChange} />
        <label>
          Парола:
        </label>
        <input type="password" value={password} placeholder={"вашата парола"} onChange={handlePasswordChange} />
        <button onClick={zoomin} type="submit">{isRegistering ? 'Регистриране' : 'Влизане'}</button>
        <div className={"flex"}>
        </div>
      </form>
          <button onClick={toggleRegister}>
            {isRegistering ? 'Вече имаш акаунт?' : 'Към регистрацията'}
          </button>
          <button>
            Админ
          </button>
        <div className={"flex"}>
          <button className={"small-img"}><img src={fblogo} alt={"fblogo"} onClick={function(){zoomin();handleSocialSubmit(new FacebookAuthProvider());}} /></button>
          <button className={"small-img"}><img src={googlelogo} alt={"googlelogo"} onClick={function(){zoomin();handleSocialSubmit(new GoogleAuthProvider());}} /></button>
        </div>
    </div>
  );
}
export default LoginForm;

reportWebVitals();