import { env } from "@config/env";
import firebase from "firebase-admin";

const rawJson = Buffer.from(env.FIREBASE_CONFIG_JSON, "base64").toString(
  "utf-8"
);
const firebaseConfig = JSON.parse(rawJson);

firebase.initializeApp({
  credential: firebase.credential.cert(firebaseConfig),
});

export default firebase;
