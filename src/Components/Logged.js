import React,{useState} from 'react';
import ReactDOM from 'react-dom/client';
import '../index.css';
import reportWebVitals from '../reportWebVitals';
import firebase from '../firebase';
import '../logged.css';
import { useRef, useEffect } from 'react';
import { register } from 'swiper/element/bundle';

register();



function Logged(){
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
            <div className='small-info'>
                <h2>Sofia</h2>
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

