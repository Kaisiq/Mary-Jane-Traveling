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
                        <a href="index.js">Home</a>
                    </li>
                    <li>
                        <a href="index.js">Find Friends</a>
                    </li>
                    <li>
                        <a href="index.js">Profile</a>
                    </li>
                    <li>
                        <a href="register.js">Влизане</a>
                    </li>
                </ul>
            </nav>
        </header>
    )
}

export default Header;