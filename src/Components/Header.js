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
                        <a href={"src/index.js"}>Home</a>
                    </li>
                    <li>
                        <a href="src/index.js">Find Friends</a>
                    </li>
                    <li>
                        <a href="src/index.js">Profile</a>
                    </li>
                    <li>
                        <a href="src/register.js">Влизане</a>
                    </li>
                </ul>
            </nav>
        </header>
    )
}

export default Header;