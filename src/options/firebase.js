//to use firebase app
//import firebase from 'firebase/app'; //older version
//import firebase from 'firebase/compat/app'; //v9

import { initializeApp } from 'firebase/app';


const firebaseConfig = {
    apiKey: "AIzaSyCQswwSY8XZrKN6zq4hGLgzi-QRJxWoExY",
    authDomain: "kinetic-road-247823.firebaseapp.com",
    databaseURL: "https://kinetic-road-247823.firebaseio.com",
    projectId: "kinetic-road-247823",
    storageBucket: "kinetic-road-247823.appspot.com",
    messagingSenderId: "931981278408",
    appId: "1:931981278408:web:21d83f0f42788e86d0b9fd"
  };

  
  export const firebaseApp = initializeApp(firebaseConfig);

  