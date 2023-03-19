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
                        <li>Отиди на плаж в Бургас</li>
                        <li>Отиди на опера в Бургас</li>
                        <li>Разгледай стария град на Несебър</li>
                    </ol>
                    <button>Избери вариант 1</button>
                </div>
            </div>

            <div className="variant flexcol">
                    <div className={"flexcol"}>
                        <h3>Вариант 2:</h3>
                        <ol type={"1"}>
                            <li>Разходи се в морската градина на Бургас</li>
                            <li>Отиди на театър в Бургас</li>
                            <li>Посети стария град на Созопол</li>
                        </ol>
                        <button>Избери вариант 2</button>
                    </div>
                </div>
            </div>
        </div>
    );
}



export default Organise;
