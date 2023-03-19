import React, { useState } from 'react';
import { useNavigate } from "react-router-dom";
import defaultProfilePicture from "../media/default-profile-picture.jpg"
import firebase from "../firebase";


function ProfilePage() {
  const [profilePicture, setProfilePicture] = useState('../default-profile-pic.jpg');
  const [bio, setBio] = useState('Аз съм софтуерен инженер.');

  const navigate = useNavigate();

  function handleTransfer() {
    navigate('/Logged');
  }

  function handleEdit(){
      navigate('/ChooseActivities');//,
          // {state: {uid: user.uid}});
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


  function handleProfilePictureChange(event) {
    setProfilePicture(event.target.value);
  }

  function handleBioChange(event) {
    setBio(event.target.value);
  }

  return (
    <div className="profile-page">
      <div className="profile-regions-list">
          <div className={"flexcol"}>
              <h3>Посетени области:</h3>
              <ul>
                <li>Добрич</li>
                <li>Ямбол</li>
                <li>Велико Търново</li>
              </ul>
          </div>
      </div>

      <div className="profile-info">
      <img src={defaultProfilePicture} alt="Profile picture" />
      <div className="profile-bio">
        <h2>Информация</h2>
        <textarea value={bio} onChange={handleBioChange} />
      </div>
        <div className="profile-actions">
            <label>
                Избери профилна снимка:
                <button>Снимка</button>
            </label>
            <div className={"flex"}>
                <button>Запазване</button>
                <button onClick = {handleTransfer}>Назад</button>
            </div>
        </div>
      </div>

        <button onClick={handleLogout} className={"logout"}>Изход</button>
        <div className={"profile-review"}>
            <button>Напиши ревю</button>
            <button onClick={handleEdit}>Промяна на любими занимания</button>
        </div>
    </div>
  );
}

export default ProfilePage;
