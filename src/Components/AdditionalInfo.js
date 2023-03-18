import firebase from '../firebase';
import '../info.css';
import {useNavigate} from "react-router-dom";
import doge from '../media/default-profile-picture.jpg';
import {useState, useEffect} from "react";



function Info(){ //TODO: Region read
    const [data,setData] = useState(null);
    const [loading,setLoading] = useState(true);
    const [error, setError] = useState(null);
    const database = firebase.database();
    const navigate = useNavigate();
    function handleLogout(){
        firebase.auth().signOut()
            .then(() => {
                console.log("Sign out successful.");
            })
            .catch((error) => {
                console.log("Sign out unsuccessful");
            })
        navigate('/');
    }
    function goBack(){
        navigate('/Logged');
    }
    async function fetchDataFromFirebase(region) {
        try {
            // Query the Firebase database for the desired data
            // const dataRef = database.ref(`RegionData/${region}`);
            const dataDescr = database.ref(`RegionData/${region}/Desc`);


            // Wait for the query to complete and get the data snapshot
            // const snapshot = await dataRef.once("value");
            const snapshot = await dataDescr.once("value");
            // Get the data from the snapshot and return as JSON
            const data = snapshot.val();
            return JSON.stringify(data);
        } catch (error) {
            console.error("Error fetching data from Firebase:", error);
        }
    }

    useEffect(() => {
        fetchDataFromFirebase("Lovech")// TODO: Region add in place of lovech
            .then(res => {
                setData(res);
            })
            .catch(error => {
                console.error("Error fetching! ", error);
                setError(error);
            })
            .finally(() => {
                setLoading(false);
            });
    }, []);

    function goToBooking(){
        var Location = "Sofia";
        window.location.href = `https://www.booking.com/search?location=${Location}`;
    }

    if (loading) return "Loading...";
    if (error) return "Error!";
    return(
      <div className={"flexcol"}>
          <header className={"header-nav"}>
              <button onClick = {goBack}>
                Back
              </button>
              <button onClick = {handleLogout}>
                  Logout
              </button>
          </header>
          <h1 className={"city_name"}></h1>
          <div className={"flex"}>
              <p>{JSON.stringify(data,null,2)}</p>
              <img src={doge} alt={"dog"}/>
          </div>
          <button onClick={goToBooking}>Reserve</button>
      </div>
    );




}

export default Info;