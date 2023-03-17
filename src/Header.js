import './App.css';


function Header() {
    return(
        <header className="header">
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

export default Header;