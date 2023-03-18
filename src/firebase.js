import firebase from 'firebase/compat/app';
import 'firebase/compat/auth';
import { getAuth } from '@firebase/auth';


const firebaseConfig = {
    apiKey: "AIzaSyBzTXmNmi95ntSByO4IEk4vMx8DMku7ATQ",
    authDomain: "maryjanetravelling-e0334.firebaseapp.com",
    projectId: "maryjanetravelling-e0334",
    storageBucket: "maryjanetravelling-e0334.appspot.com",
    messagingSenderId: "577179775073",
    appId: "1:577179775073:web:1b1c06c5a7f0ae58627a20",
    measurementId: "G-J1GKGQT23L"
};

const app = firebase.initializeApp(firebaseConfig);
const auth = getAuth(app);



export default firebase;