import firebase from "firebase/app";
import "firebase/firestore";
import "firebase/auth";

const config = {
  apiKey: "AIzaSyCMP17Ngd89pZt6ANVtwcLoIRHlw1c3g7c",
  authDomain: "learning-react-project-2.firebaseapp.com",
  databaseURL: "https://learning-react-project-2.firebaseio.com",
  projectId: "learning-react-project-2",
  storageBucket: "learning-react-project-2.appspot.com",
  messagingSenderId: "123762208644",
  appId: "1:123762208644:web:36a5b7c99d3c8c3efd37d1",
  measurementId: "G-2MYD1XB0M1"
};

export const createUserProfileDocument = async (userAuth, additonalData) => {
  if (!userAuth) return;

  const userRef = firestore.doc(`users/${userAuth.uid}`);

  const snapShot = await userRef.get(); // await becasue async

  if (!snapShot.exists) {
    const { displayName, email } = userAuth;
    const createdAt = new Date();

    try {
      await userRef.set({
        displayName,
        email,
        createdAt,
        ...additonalData
      });
    } catch (error) {
      console.log("error creating user", error.message);
    }
  }

  return userRef;
};

firebase.initializeApp(config);

export const auth = firebase.auth();
export const firestore = firebase.firestore();

const provider = new firebase.auth.GoogleAuthProvider();
provider.setCustomParameters({ prompt: "select_account" });
export const signInWithGoogle = () => auth.signInWithPopup(provider);

export default firebase;
