//to use firebase app
//import firebase from 'firebase/app'; //older version
//import firebase from 'firebase/compat/app'; //v9

import { initializeApp } from 'firebase/app';


const firebaseConfig = {
    apiKey: "your-api-key",
    authDomain: "yours",
    databaseURL: "yours",
    projectId: "your project id",
    storageBucket: "your",
    messagingSenderId: "your",
    appId: "your-appid"
  };

  
  export const firebaseApp = initializeApp(firebaseConfig);

  
