import './App.css';


function Header() {
    return(
        <header>
            <div className="branding">
                <h1>Mary Jane</h1>
            </div>
            <nav>
                <ul>
                    <li>
                        <a href="App">Home</a>
                    </li>
                    <li>
                        <a href="App">Find Friends</a>
                    </li>
                    <li>
                        <a href="App">Profile</a>
                    </li>
                    <li>
                        <a href="App">Settings</a>
                    </li>
                </ul>
            </nav>
        </header>
    )
}


function Footer() {
    return (
        <footer className="footer">
            <p>Copyright © 2023 Mary Jane Team</p>
            <p>Copyright © 2023 Mary Jane Team</p>
        </footer>
    );
}

export default Footer;
