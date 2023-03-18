import '../App.css';
import { BrowserRouter as Router, Route, Routes, Link } from "react-router-dom";
import Register from "./Register";
import App from "./App";

function Header() {
    return(
        <header className="header">
            <div className="branding">
                <h1>Mary Jane</h1>
            </div>
            <Router>
            <nav>
                <ul>
                    <li>
                        <Link to="/index">Home</Link>
                    </li>
                    <li>
                        <Link to="index">Find Friends</Link>
                    </li>
                    <li>
                        <Link to="index">Profile</Link>
                    </li>
                    <li>
                        <Link to="register">Влизане</Link>
                    </li>
                </ul>
                <Routes>
                    <Route exact path="/" component={App}/>
                    <Route path="/index" component={App} />
                    <Route path="/register" component={Register} />
                </Routes>
            </nav>
            </Router>
        </header>
    )
}

export default Header;