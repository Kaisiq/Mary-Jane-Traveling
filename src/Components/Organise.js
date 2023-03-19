import React, { useState } from 'react';
import { useLocation, useNavigate } from "react-router-dom";
import defaultProfilePicture from "../media/default-profile-picture.jpg"
import firebase from "../firebase";

function Organise() {
    // const { state }= useLocation();
    // const uid = state.uid;
    const navigate = useNavigate();

    function handleTransfer() {
        navigate('/Logged');
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

    return (
        <div className="variants-page">
            <div className={"logout"}>
                <button onClick = {handleTransfer}>Назад</button>
                <button onClick={handleLogout}>Изход</button>
            </div>
            <h1>Твоите предизвикателства</h1>
            <div className={"variants-row"}>
            <div className="variant flexcol">
                <div className={"flexcol"}>
                    <h3>Вариант 1:</h3>
                    <ol type={"1"}>
                        <li>Разходи се от паметника на Васил Левски по римския път в Ловеч</li>
                        <li>Отиди в младежки дом в Ловеч</li>
                        <li>Посети Вароша</li>
                    </ol>
                    <button>Избери вариант 1</button>
                </div>
            </div>

            <div className="variant flexcol">
                    <div className={"flexcol"}>
                        <h3>Вариант 2:</h3>
                        <ol type={"1"}>
                            <li>Разходи се в парк Стратеш в Ловеч</li>
                            <li>Отиди на театър в центъра на Ловеч</li>
                            <li>Разходи се до река Осъм по алеята "Баш бунар"</li>
                        </ol>
                        <button>Избери вариант 2</button>
                    </div>
                </div>
            </div>
        </div>
    );
}



export default Organise;
