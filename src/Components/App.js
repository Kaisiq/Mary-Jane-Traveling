import logo from '../logo.svg';
import '../App.css';


 function App() {
   return (
     <div className="App">
        <Router>
            <Routes>
                <Route path = "/" element={<StartPage />}/>
            </Routes>
        </Router>
     </div>
   );
 }

//export default App;
