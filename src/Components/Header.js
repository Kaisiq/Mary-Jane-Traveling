import '../App.css';


function Header() {
    return(
        <header className="header">
            <div className="branding">
                <h1>Mary Jane</h1>
            </div>
            <nav>
                <ul>
                    <li>
                        <a href="src/Components/App">Home</a>
                    </li>
                    <li>
                        <a href="src/Components/App">Find Friends</a>
                    </li>
                    <li>
                        <a href="src/Components/App">Profile</a>
                    </li>
                    <li>
                        <a href="src/Components/App">Settings</a>
                    </li>
                </ul>
            </nav>
        </header>
    )
}

export default Header;