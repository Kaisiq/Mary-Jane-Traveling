import React,{useState} from 'react';
import ReactDOM from 'react-dom/client';
import reportWebVitals from '../reportWebVitals';
import firebase from '../firebase';
import { useNavigate } from "react-router-dom";
import '../styles.css';


function ChooseActivities(){
    const [checkedItems, setCheckedItems] = useState({});
    const [isConfirmed, setConfirm] = useState(false);
    const navigate = useNavigate();
    const handleChange = (event) => {
      setCheckedItems({
        ...checkedItems,
        [event.target.name]: event.target.checked,
      });
    };
    const handleConfirmation = () =>{
      navigate('/Logged');
    }

    return (

      <div className={"content-activities"}>
        <h2>Избери любимите си занимания:</h2>
        <form className={'fav-entertainments'}>
          <label className={'hiking box'}>
            <input
              type="checkbox"
              name="hiking"
              checked={checkedItems.hiking}
              onChange={handleChange}
            />
            Hiking
          </label>
          <label className={'music box'}>
            <input
              type="checkbox"
              name="music"
              checked={checkedItems.music}
              onChange={handleChange}
            />
            Music
          </label>
          <label className={'theatre box'}>
            <input
              type="checkbox"
              name="theatre"
              checked={checkedItems.theatre}
              onChange={handleChange}
            />
            Theatre
          </label>
          <label className={'sport box'}>
            <input
              type="checkbox"
              name="sport"
              checked={checkedItems.sport}
              onChange={handleChange}
            />
            Sport
          </label>
            <label className={'museum box'}>
                <input
                    type="checkbox"
                    name="museum"
                    checked={checkedItems.museum}
                    onChange={handleChange}
                />
                Museum
            </label>
            <label className={'videogames box'}>
                <input
                    type="checkbox"
                    name="videogames"
                    checked={checkedItems.videogames}
                    onChange={handleChange}
                />
                Videogames
            </label>
            <label className={'art box'}>
                <input
                    type="checkbox"
                    name="art"
                    checked={checkedItems.art}
                    onChange={handleChange}
                />
                Art
            </label>
            <label className={'films box'}>
                <input
                    type="checkbox"
                    name="films"
                    checked={checkedItems.films}
                    onChange={handleChange}
                />
                Films
            </label>
            <label className={'sightseeing box'}>
                <input
                    type="checkbox"
                    name="sightseeing"
                    checked={checkedItems.sightseeing}
                    onChange={handleChange}
                />
                Sightseeing
            </label>
            <label className={'clubbing box'}>
                <input
                    type="checkbox"
                    name="clubbing"
                    checked={checkedItems.clubbing}
                    onChange={handleChange}
                />
                Clubbing
            </label>
            <button onClick={handleConfirmation}>Confirm Selection</button>
        </form>
      </div>
    );

}

export default ChooseActivities;