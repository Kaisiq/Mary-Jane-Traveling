import React, {useEffect, useRef} from 'react';
import '../styles.css';
import reportWebVitals from '../reportWebVitals';
import firebase from '../firebase';
import { useNavigate } from "react-router-dom";
import { useLocation } from "react-router-dom";



function Logged(){
// Get a reference to the Firebase database
    const { state } = useLocation();
    const database = firebase.database();
    const navigate = useNavigate();
    var currentRegion = "";

    function goToProfile(){
        navigate('/Profile');
    }

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

    function goToInfo(){
        navigate('/Info', {
            state: {location: currentRegion}});
    }

    function goToBooking(){
        window.location.href = `https://www.booking.com/searchresults.bg.html?ss=${currentRegion}`;
    }


// Function to fetch data from Firebase and return as JSON
    async function fetchDataFromFirebase(region) {
        try {
            // Query the Firebase database for the desired data
            // const dataRef = database.ref(`RegionData/${region}`);
            const dataDescr = database.ref(`RegionData/${region}`);

            // const snapshot = await dataRef.once("value");
            const snapshot = await dataDescr.once("value");
            // Get the data from the snapshot and return as JSON
            const data = snapshot.val();
            return JSON.stringify(data);
        } catch (error) {
            console.error("Error fetching data from Firebase:", error);
        }
    }

    async function addLiToUl(ulist, region, from){
        var data = await fetchDataFromFirebase(region + `/Activities/${from}/name`);
        var li = document.createElement("li");
        var checkbox = document.createElement("input");
        checkbox.setAttribute("type", "checkbox");
        li.textContent = JSON.parse(data);
        li.appendChild(checkbox);
        if(li.textContent !== "") {
            ulist.appendChild(li);
        }
    }
    async function handleFetch(region){
        currentRegion = region;
        const ulist = document.querySelector(".list_activities");
        const city_name = document.querySelector(".city_name");

        addLiToUl(ulist, region, "films");
        addLiToUl(ulist, region, "art");
        addLiToUl(ulist, region, "clubbing");
        addLiToUl(ulist, region, "games");
        addLiToUl(ulist, region, "hiking");
        addLiToUl(ulist, region, "museums");
        addLiToUl(ulist, region, "music");
        addLiToUl(ulist, region, "sightseeing");
        addLiToUl(ulist, region, "sport");
        addLiToUl(ulist, region, "theatre");

        // ulist.textContent = JSON.parse(descData);
        city_name.textContent = region;
    }

    async function testFetch() {
        handleFetch("Lovech");
    }

    return (
        <div className='main-screen'>
            <header className={"header-nav"}>
                <button onClick = {goToProfile}>
                    Профил
                </button>
                <button onClick = {handleLogout}>
                    Изход
                </button>
            </header>
            <canvas id={"canvas"}>

            </canvas>
            <div className='small-info'>
                <h2 className={"city_name"}></h2>
                <img src={""} alt={""}/>
                <div className={'buttons'}>
                    <button onClick={testFetch}>Видео(кур)</button>
                    <button onClick={goToInfo}>Информация</button>
                </div>
                <ul className={"list_activities"}>
                </ul>
                {/*<p className={"descr"}>Lorem ipsum dolor sit amet</p>*/}
                <div className={'buttons'}>
                    <button onClick={goToBooking}>Резервирай</button>
                </div>
            </div>
        </div>
    );
}
export default Logged;
// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();

