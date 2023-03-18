import '../App.css';
import firebase from '../firebase';


function Login() {
    return(
        <section>
            <form>
                <input type="email" placeholder="Your@Email.com"></input>
                <input type="password" placeholder="Password"></input>
                <button onClick="login()">Login</button>
            </form>
            <div>
                <p>Нямаш акаунт?</p>
                <button><a href="../register.js">Регистрация</a></button>
            </div>
        </section>
    );
}

export default Login;