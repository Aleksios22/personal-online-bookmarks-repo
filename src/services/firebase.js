/*
  Ce fichier contient le code nécéssaire pour initialiser 
  Firebase, FirebaseUI, Firestore, Etc.
*/
// Importer les modules requis
import firebase from 'firebase/app';
import * as firebaseui from 'firebaseui';
import 'firebase/firestore';
import 'firebase/auth';
// Importer l'objet de configuration 
import firebaseConfig from './config';

// Initialiser Firebase
if(!firebase.apps.length) {
  firebase.initializeApp(firebaseConfig);
}

// Initialiser Auth
export const auth = firebase.auth();

// Initialiser FirebaseUI
export const instanceFirebaseUI = new firebaseui.auth.AuthUI(auth);

// Initialiser Firestore
export const firestore = firebase.firestore();
