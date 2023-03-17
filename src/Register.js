import './App.css';


function Login() {
    return(
        <form>
            <input type="email" placeholder="Your@Email.com"></input>
            <input type="password" placeholder="Password"></input>
            <button onClick="login()">Регистрация</button>
        </form>
    );
}

export default Login;