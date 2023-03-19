import firebase from '../firebase';
import '../styles.css';
import {useNavigate} from "react-router-dom";
import cityPic from '../media/lovech.jpg';
import {useState, useEffect} from "react";
import { useLocation } from 'react-router-dom';



function Info(){
    const [data,setData] = useState(null);
    const [image,setImage] = useState(null);
    const [loading,setLoading] = useState(true);
    const [error, setError] = useState(null);
    const { state } = useLocation();
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
        navigate('/Logged', {state: { uid: state.uid}});
    }
    async function fetchDataFromFirebase(region) {
        try {
            // const dataRef = database.ref(`RegionData/${region}`);
            const dataDescr = database.ref(`RegionData/${region}/Desc`);

            // const snapshot = await dataRef.once("value");
            const snapshot = await dataDescr.once("value");
            const data = snapshot.val();
            return JSON.stringify(data);
        } catch (error) {
            console.error("Error fetching data from Firebase:", error);
        }
    }


    async function fetchImgFromFirebase(region) {
        try {
            const dataDescr = database.ref(`RegionData/${region}/url`);

            const snapshot = await dataDescr.once("value");
            const data = snapshot.val();
            return JSON.stringify(data);
        } catch (error) {
            console.error("Error fetching data from Firebase:", error);
        }
    }

    useEffect(() => {
        fetchDataFromFirebase(state.location)
            .then(res => {
                setData(res);
            })
            .catch(error => {
                console.error("Error fetching! ", error);
                setError(error);
            })
            .finally(() => {
                fetchImgFromFirebase(state.location)
                    .then(res => {
                        setImage(res.replace(/"/g, ""));
                    })
                    .catch(error => {
                        console.error("Error fetc ", error);
                        setError(error);
                    })
                    .finally(() => {
                        setLoading(false);
                    })
                setLoading(false);
            });
    }, []);

    function goToBooking(){
        window.location.href = `https://www.booking.com/searchresults.bg.html?ss=${state.location}`;
    }

    if (loading) return "Loading...";
    if (error) return "Error!";
    return(
      <div className={"flexcol eighty"}>
          <header className={"header-nav"}>
              <button onClick = {goBack}>
                Назад
              </button>
              <button onClick = {handleLogout}>
                  Изход
              </button>
          </header>
          <h1 className={"city_name"}>{state.location}</h1>
          <div className={"flex-info"}>
              <div>
              <p>{JSON.stringify(data,null,2)}</p>
                  <button className={"reserve"} onClick={goToBooking}>Резервирай</button>
              </div>
              <img src={image} alt={"cityPicture"}/>
          </div>
      </div>
    );

}

export default Info;