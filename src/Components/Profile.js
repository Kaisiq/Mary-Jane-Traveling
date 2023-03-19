import React, { useState } from 'react';
import { useNavigate } from "react-router-dom";
import defaultProfilePicture from "../media/default-profile-picture.jpg"


function ProfilePage() {
  const [profilePicture, setProfilePicture] = useState('../default-profile-pic.jpg');
  const [bio, setBio] = useState('I am a software developer.');

  const navigate = useNavigate();

  function handleTransfer() {
    navigate('/Logged');
  }


  function handleProfilePictureChange(event) {
    setProfilePicture(event.target.value);
  }

  function handleBioChange(event) {
    setBio(event.target.value);
  }

  return (
    <div className="profile-page">
      <div className="profile-container">
      <div className="profile-regions-list">
    <ul>
      <li>List Item 1</li>
      <li>List Item 2</li>
      <li>List Item 3</li>
    </ul>
    </div>
    <div className="profile-info">
      <img src={defaultProfilePicture} alt="Profile picture" />
      <div className="profile-bio">
        <h2>Bio</h2>
        <textarea value={bio} onChange={handleBioChange} />
      </div>
      <div className="profile-actions">
        <label>
          Choose a profile picture:
          <input type="file" onChange={handleProfilePictureChange} />
        </label>
        <button>Save</button>

        <button onClick = {handleTransfer}>Back</button>
        </div>
        </div>
      </div>
    </div>
  );
}

export default ProfilePage;
