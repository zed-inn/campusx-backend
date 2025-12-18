import firebase from "firebase-admin";
import fs from "fs";

const firebaseConfig = JSON.parse(
  fs.readFileSync("./src/config/firebase/firebase.config.json").toString()
);

firebase.initializeApp({
  credential: firebase.credential.cert(firebaseConfig),
});

export default firebase;
