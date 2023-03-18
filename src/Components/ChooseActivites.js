import React,{useState} from 'react';
import ReactDOM from 'react-dom/client';
import reportWebVitals from '../reportWebVitals';
import { useNavigate,Router } from 'react-router-dom';
import firebase from '../firebase';

function ChooseActivites(){
    const [checkedItems, setCheckedItems] = useState({});

    const handleChange = (event) => {
      setCheckedItems({
        ...checkedItems,
        [event.target.name]: event.target.checked,
      });
    };
  
    return (
    
      <div>
        <h2>Choose Activities:</h2>
        <form>
          <label>
            <input
              type="checkbox"
              name="hiking"
              checked={checkedItems.hiking}
              onChange={handleChange}
            />
            Hiking
          </label>
          <label>
            <input
              type="checkbox"
              name="swimming"
              checked={checkedItems.swimming}
              onChange={handleChange}
            />
            Swimming
          </label>
          <label>
            <input
              type="checkbox"
              name="biking"
              checked={checkedItems.biking}
              onChange={handleChange}
            />
            Biking
          </label>
          <label>
            <input
              type="checkbox"
              name="kayaking"
              checked={checkedItems.kayaking}
              onChange={handleChange}
            />
            Kayaking
          </label>
        </form>
      </div>
    );
  

}