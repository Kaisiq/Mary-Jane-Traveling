import React, {useEffect, useRef} from 'react';
import '../index.css';
import reportWebVitals from '../reportWebVitals';
import firebase from '../firebase';
import '../info.css';
import {useNavigate} from "react-router-dom";
import doge from '../media/default-profile-picture.jpg';

function Info(){
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

    async function handleFetch(region){
        const pDescr = document.querySelector(".descr");
        const city_name = document.querySelector(".city_name");
        const descData = await fetchDataFromFirebase(region);
        pDescr.textContent = JSON.parse(descData);
        city_name.textContent = region;
    }

    const goToBooking = () => {

    }

    return(
      <div className={"flexcol"}>
          <header className={"header-nav"}>
              <button onClick = {handleLogout}>
                  Logout
              </button>
          </header>
          <h1 className={"city_name"}></h1>
          <div className={"flex"}>
              <p>
                Lorem ipsum dolor sit amet
              </p>
              <img src={doge} alt={"dog"}/>
          </div>
          <div className={"flex"}>
              <img src={doge} alt={"dog"} />
              <p>
                  Lorem ipsum dolor sit amet
              </p>
          </div>
          <button onClick={goToBooking}>Reserve</button>
      </div>
    );




}

export default Info;