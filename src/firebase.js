// import { initializeApp } from 'firebase/app';

// const firebaseConfig = {
//   apiKey: "your-api-key",
//   authDomain: "your-auth-domain",
//   projectId: "your-project-id",
//   storageBucket: "your-storage-bucket",
//   messagingSenderId: "your-messaging-sender-id",
//   appId: "your-app-id"
// };

// const app = initializeApp(firebaseConfig);

// export default app;

// Import the functions you need from the SDKs you need


import { initializeApp } from "firebase/app";
import { getFirestore } from 'firebase/firestore';

const firebaseConfig = {
    apiKey: "AIzaSyDyemNzOG-j7IDn3OKFHvdMr4783CszH6Q",
    authDomain: "finalreact-jp.firebaseapp.com",
    projectId: "finalreact-jp",
    storageBucket: "finalreact-jp.appspot.com",
    messagingSenderId: "323551703989",
    appId: "1:323551703989:web:432887f0b2cc472964dffc",
    measurementId: "G-B6430K6Z1Y"
  };

const app = initializeApp(firebaseConfig);
const firestore = getFirestore(app);

export { app, firestore };
