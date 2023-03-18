import React,{useState} from 'react';
import ReactDOM from 'react-dom/client';
import '../index.css';
import reportWebVitals from '../reportWebVitals';
import firebase from '../firebase';
import '../login.css'


function Logged(){
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
export default Logged;

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
