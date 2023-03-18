import '../App.css';
import firebase from '../firebase';

function Register() {
    return(
        <form>
            <input type="email" placeholder="Your@Email.com"></input>
            <input type="password" placeholder="Password"></input>
            <button><a href="../register.js">Регистрация</a></button>
        </form>
    );
}

export default Register;