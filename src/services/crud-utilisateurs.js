import firebase from 'firebase/app';
import { auth, firestore } from './firebase';
import { instanceFirebaseUI } from '../services/firebase';
import 'firebaseui/dist/firebaseui.css';
import { utilRef } from './config';

/**
 * Démarre le widget de connexion FirebaseUI
 * @param {string} eltAncrage sélecteur CSS de l'élément du DOM dans lequel on veut injecter le widget FirebaseUI
 */
export function initUI(eltAncrage) {
  instanceFirebaseUI.start(eltAncrage, {
    signInOptions: [
      firebase.auth.GoogleAuthProvider.PROVIDER_ID,
      firebase.auth.FacebookAuthProvider.PROVIDER_ID,
      firebase.auth.GithubAuthProvider.PROVIDER_ID
    ],
    signInFlow: 'popup'
  });
}

/**
 * Écoute les changements de connexion dans Firebase Auth pour reconnaître l'utilisateur connecté
 * @param {function} mutateurEtatUtil fonction de mutation de l'état React qui sera appelée pour modifier l'état de l'utilisateur
 */
export function observerConnexion(mutateurEtatUtil) {
  auth.onAuthStateChanged(
    util => {
      mutateurEtatUtil(util);
      // S'il s'agit d'une connexion, on établi le profil d'utilisateur dans Firestore
      if(util) {
        creerProfil(util.uid, util.displayName, util.email);
      }
    }
  );
}

/**
 * Sauvegarde le profil de l'utilisateur connecté avec FB-Auth dans la collection Firestore de l'appli : 
 * si l'utilisateur est déjà dans Firestore, ne fait rien, sinon, ajoute les propriétés nom, courriel, et datecompte
 * @param {string} id identifiant de l'utilisateur tel que retourné par la propriété uid de FB-Auth
 * @param {string} nom nom complet de l'utilisateur tel que retourné par la propriété displayName de FB-Auth
 * @param {string} courriel adresse courriel de l'utilisateur tel que retourné par la propriété email de FB-Auth
 */
export function creerProfil(id, nom, courriel) {
  firestore.collection(utilRef).doc(id).set({
    nom: nom, 
    courriel: courriel, 
    datecompte: firebase.firestore.FieldValue.serverTimestamp()
  }, {merge: true});
}

/**
 * Déconnecter l'utilisateur dans FB-Auth
 */
export function deconnecter() {
  auth.signOut();
}