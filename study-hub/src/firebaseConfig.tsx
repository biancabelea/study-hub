import firebase from 'firebase/compat/app';
import 'firebase/compat/auth';
import 'firebase/compat/firestore';

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
    apiKey: "AIzaSyCvBa1GnqVAUafYPwSsurtcsqH7PSoTzGE",
    authDomain: "study-hub-db516.firebaseapp.com",
    projectId: "study-hub-db516",
    storageBucket: "study-hub-db516.appspot.com",
    messagingSenderId: "758274326773",
    appId: "1:758274326773:web:8755a2c2cf013a37f345bc",
    measurementId: "G-M53H6K5DB9"
};

// Initialize Firebase
firebase.initializeApp(firebaseConfig);
export const auth = firebase.auth()
export const database = firebase.firestore()

export default firebase;