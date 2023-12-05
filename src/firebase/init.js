import { initializeApp } from 'firebase/app'
import { getFirestore }  from 'firebase/firestore'
import { getAuth } from 'firebase/auth'

const firebaseConfig = {
    apiKey: "AIzaSyA31zc1uNWY4b_2mc8TM1bu_-651Oh0Kzw",
    authDomain: "rj-clicker.firebaseapp.com",
    projectId: "rj-clicker",
    storageBucket: "rj-clicker.appspot.com",
    messagingSenderId: "913567152889",
    appId: "1:913567152889:web:2ebe183a0d8b5015acc028",
}

// init firebase
initializeApp(firebaseConfig)

// init & export firestore service
export const db = getFirestore()
// generate & export auth object
export const auth = getAuth()