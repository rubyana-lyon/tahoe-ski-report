import firebase from "firebase";

const firebaseConfig = {
  apiKey: "AIzaSyCAYI_n25vvtBUqqEtGTCvp868xagIRueE",
  authDomain: "ski-app-47bf2.firebaseapp.com",
  projectId: "ski-app-47bf2",
  storageBucket: "ski-app-47bf2.appspot.com",
  messagingSenderId: "528348740631",
  appId: "1:528348740631:web:b1ffba53d8b247a567f052"
};

const firebaseApp = firebase.initializeApp(firebaseConfig);

const database = firebaseApp.database();

export default database;
