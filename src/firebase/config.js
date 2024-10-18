// Import the functions you need from the SDKs you need
import { initializeApp } from 'firebase/app'
import { getAuth } from 'firebase/auth'
import { getFirestore } from 'firebase/firestore/lite'
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: 'AIzaSyD2TrM3MFNeXOCaaP8qIw-ZCpZZIzZIxE0',
  authDomain: 'journal-app-5ba8d.firebaseapp.com',
  projectId: 'journal-app-5ba8d',
  storageBucket: 'journal-app-5ba8d.appspot.com',
  messagingSenderId: '75103163023',
  appId: '1:75103163023:web:db14298b978d8da85056fa'
};

// Initialize Firebase
export const FirebaseApp = initializeApp(firebaseConfig)

export const FirebaseAuth = getAuth( FirebaseApp )

export const FirebaseDB = getFirestore( FirebaseApp )