import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import { initializeApp } from 'firebase/app';
import { getFirestore } from 'firebase/firestore';
import { getStorage } from 'firebase/storage';

const app = initializeApp({
  apiKey: 'AIzaSyCf9KCZnygTTo7EYTnaoqmY5e2jvFQiGMU',
  authDomain: 'todotest-99607.firebaseapp.com',
  projectId: 'todotest-99607',
  storageBucket: 'todotest-99607.appspot.com',
  messagingSenderId: '1039757610965',
  appId: '1:1039757610965:web:a0961cc518a1c104daf75c',
});
const database = getFirestore(app);
const storage = getStorage(app);
const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(<App database={database} storage={storage} />);
