// Import the functions you need from the SDKs you need
import firebase from 'firebase/compat/app' // Importa firebase/compat/app en lugar de 'firebase/app'
//import { getAnalytics } from "firebase/analytics";
import 'firebase/compat/auth'

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyAdBd_IpLmyj-4621ZSrmlhpuiuCXUbmPk",
  authDomain: "finalprojectcinema.firebaseapp.com",
  projectId: "finalprojectcinema",
  storageBucket: "finalprojectcinema.appspot.com",
  messagingSenderId: "748432355567",
  appId: "1:748432355567:web:5935f310e400efea682b1a",
  measurementId: "G-0YJ3616FTG"
};

!firebase.apps.length &&
    firebase.initializeApp(firebaseConfig)

//console.log('FIREBASE', app)
//const analytics = getAnalytics(app);

export const mapUserFromFirebaseAuth = (user) => {
  const { displayName, email, photoURL, uid } = user
  return {
    avatar: photoURL,
    username: displayName,
    email,
    uid
  }
}

export const onAuthStateChangedUser = (onChange) => {
  return firebase
    .auth()
    .onAuthStateChanged(user => {
      const normalizedUser = user ? mapUserFromFirebaseAuth(user) : null
      onChange(normalizedUser)
  })
}

export const userLogout = (() =>{
  return firebase.auth().signOut()
})

export const loginWithCredentials = (email, password) => {
  return firebase.auth().signInWithEmailAndPassword(email, password).then((userCredential) => {
    var user = userCredential.user;
  }).catch((error) => {
    var messageError = error.message;
    var errorCode = error.code;
    console.log(messageError, errorCode)
  })
}

export const createUserWithEmailAndPassword = (email, password) => {
  return firebase.auth().createUserWithEmailAndPassword(email, password).then((userCredetial) => {
    var user = userCredetial.user
  }).catch((error) => {
    var messageError = error.message;
    var errorCode = error.code;
    console.log(messageError, errorCode)
  })
}

export const loginWithGoogle = () => {
  const googleProvider = new firebase.auth.GoogleAuthProvider()

  return firebase.auth().signInWithPopup(googleProvider)
}

export const loginWithGitHub = () => {
  const gitHubProvider = new firebase.auth.GithubAuthProvider()

  return firebase.auth().signInWithPopup(gitHubProvider)
}