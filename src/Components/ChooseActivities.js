import React,{useState} from 'react';
import ReactDOM from 'react-dom/client';
import reportWebVitals from '../reportWebVitals';
import firebase from '../firebase';
import { useNavigate } from "react-router-dom";
import { useLocation } from "react-router-dom";
import '../styles.css';


function ChooseActivities(){
    const [checkedItems, setCheckedItems] = useState({});
    const [isConfirmed, setConfirm] = useState(false);
    const { state } = useLocation();
    const navigate = useNavigate();
    const handleChange = (event) => {
      setCheckedItems({
        ...checkedItems,
        [event.target.name]: event.target.checked,
      });
      var toDarken = document.querySelector("."+event.target.name);
      toDarken.classList.toggle('darken');
    };

    const handleConfirmation = () =>{
      const userRef = firebase.database().ref('Users/' + state.uid);
      const checkedCheckboxes = Object.entries(checkedItems)
    .filter(([name, isChecked]) => isChecked)
    .map(([name]) => name).join(',');

    userRef.update({
      cats: checkedCheckboxes
    })
    .then(() => {
      console.log('Categories updated successfully');
    })
    .catch((error) => {
      console.error('Error updating Categories:', error);
    });
      navigate('/Logged', {state: {uid: state.uid}});
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
            Катерене
          </label>
          <label className={'music box'}>
            <input
              type="checkbox"
              name="music"
              checked={checkedItems.music}
              onChange={handleChange}
            />
            Музика
          </label>
          <label className={'theatre box'}>
            <input
              type="checkbox"
              name="theatre"
              checked={checkedItems.theatre}
              onChange={handleChange}
            />
            Театър
          </label>
          <label className={'sport box'}>
            <input
              type="checkbox"
              name="sport"
              checked={checkedItems.sport}
              onChange={handleChange}
            />
            Спорт
          </label>
            <label className={'museum box'}>
                <input
                    type="checkbox"
                    name="museum"
                    checked={checkedItems.museum}
                    onChange={handleChange}
                />
                Музеи
            </label>
            <label className={'videogames box'}>
                <input
                    type="checkbox"
                    name="videogames"
                    checked={checkedItems.videogames}
                    onChange={handleChange}
                />
                Видеоигри
            </label>
            <label className={'art box'}>
                <input
                    type="checkbox"
                    name="art"
                    checked={checkedItems.art}
                    onChange={handleChange}
                />
                Изкуство
            </label>
            <label className={'films box'}>
                <input
                    type="checkbox"
                    name="films"
                    checked={checkedItems.films}
                    onChange={handleChange}
                />
                Филми
            </label>
            <label className={'sightseeing box'}>
                <input
                    type="checkbox"
                    name="sightseeing"
                    checked={checkedItems.sightseeing}
                    onChange={handleChange}
                />
                Гледки
            </label>
            <label className={'clubbing box'}>
                <input
                    type="checkbox"
                    name="clubbing"
                    checked={checkedItems.clubbing}
                    onChange={handleChange}
                />
                Клубове
            </label>
            <button onClick={handleConfirmation}>Запазване</button>
        </form>
      </div>
    );

}

export default ChooseActivities;