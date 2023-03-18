import React, { useState } from 'react';

function ProfilePage() {
  const [profilePicture, setProfilePicture] = useState('../default-profile-pic.jpg');
  const [bio, setBio] = useState('I am a software developer.');

  function handleProfilePictureChange(event) {
    setProfilePicture(event.target.value);
  }

  function handleBioChange(event) {
    setBio(event.target.value);
  }

  return (
    <div className="profile-page">
      <img src={profilePicture} alt="Profile picture" />
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
      </div>
    </div>
  );
}
