// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import "firebase/compat/auth";
import firebase from "firebase/compat/app";

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyBIcKsU0fWxs1TkmQ1hjkTscLyZECUavQk",
  authDomain: "animania-64bf8.firebaseapp.com",
  projectId: "animania-64bf8",
  storageBucket: "animania-64bf8.appspot.com",
  messagingSenderId: "346989495505",
  appId: "1:346989495505:web:68e1071746561d0f66b1f0"
};

if(!firebase.apps.length) {
  firebase.initializeApp(firebaseConfig);
}

const auth = firebase.auth();

export {firebase, auth};