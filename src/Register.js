import './App.css';


function Register() {
    return(
        <form>
            <input type="email" placeholder="Your@Email.com"></input>
            <input type="password" placeholder="Password"></input>
            <button onClick="login()">Регистрация</button>
        </form>
    );
}

export default Register;