import logo from '../logo.svg';
import '../App.css';
import Footer from "./Footer";
import Header from "./Header"

function App() {
  return (
    <div className="App">
        <Header />
      <section className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <p>
          Edit <code>src/App.js</code> and save to reload.
        </p>
        <a
          className="App-link"
          href="https://reactjs.org"
          target="_blank"
          rel="noopener noreferrer"
        >
          Learn React
        </a>
      </section>
      <Footer />
    </div>
  );
}

export default App;