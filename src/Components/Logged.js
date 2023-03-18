import React, {useEffect, useRef} from 'react';
import '../index.css';
import reportWebVitals from '../reportWebVitals';
import firebase from '../firebase';
import '../logged.css';
import {register} from 'swiper/element/bundle';
import {useNavigate} from "react-router-dom";


register();



function Logged(){
// Get a reference to the Firebase database
    const database = firebase.database();
    const navigate = useNavigate();

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
        navigate('/Info');
    }

    function goToBooking(Location){
        const bookingSearchUrl = `https://www.booking.com/search?location=${Location}`;
        window.location.href = bookingSearchUrl;
    }


// Function to fetch data from Firebase and return as JSON
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

    async function testFetch(){
        handleFetch("Lovech");
    }






    const swiperElRef = useRef(null);

    useEffect(() => {
        // listen for Swiper events using addEventListener
        swiperElRef.current.addEventListener('progress', (e) => {
            const [swiper, progress] = e.detail;
            console.log(progress);
        });
        const params = {
            // array with CSS styles
            injectStyles: [
                `
      :host(.red) .swiper-wrapper {
        background-color: red;
      }
      `,
            ],

            // array with CSS urls
            injectStylesUrls: ['logged.css'],
        };

        swiperElRef.current.addEventListener('slidechange', (e) => {
            console.log('slide changed');
        });
    }, []);
    return (
        <div className='main-screen'>
            <header className={"header-nav"}>
                <button onClick = {goToProfile}>
                    Profile
                </button>
                <button onClick = {handleLogout}>
                    Logout
                </button>
            </header>
            <div className='small-info'>
                <h2 className={"city_name"}>Sofia</h2>
                <swiper-container
                    ref={swiperElRef}
                    slides-per-view="1"
                    navigation="true"
                    pagination="true"
                >
                    <swiper-slide>Slide 1</swiper-slide>
                    <swiper-slide>Slide 2</swiper-slide>
                    <swiper-slide>Slide 3</swiper-slide>
                </swiper-container>
                <div className={'buttons'}>
                    <button>video</button>
                    <button onClick={goToInfo}>info</button>
                </div>
                <p className={"descr"}>Lorem ipsum dolor sit amet</p>
                <div>
                    <button  onClick = {goToBooking("Sofia")}>reserve</button>
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

