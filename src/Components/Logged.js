import React,{useState} from 'react';
import ReactDOM from 'react-dom/client';
import '../index.css';
import reportWebVitals from '../reportWebVitals';
import firebase from '../firebase';
import '../logged.css'


function Logged(){
    return (
        <div className='main-screen'>
            <div className='small-info'>
                <h2>Sofia</h2>
                {/*<img />*/}
                <div className={'buttons'}>
                    <button>video</button>
                    <button>info</button>
                </div>
                <p>Lorem ipsum dolor sit amet</p>
                <button>reserve</button>
            </div>
        </div>
    );
}
export default Logged;

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
