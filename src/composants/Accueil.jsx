import './Accueil.scss';
import * as crudUtilisateurs from '../services/crud-utilisateurs';
import { useEffect } from 'react';

export default function Accueil() {
  
  // Initialiser le widget de connexion FirebaseUI
  // Remarquez que ce code est dans un useEffect() car on veut l'exécuter 
  // UNE SEULE FOIS (regardez le tableau des 'deps' - dépendances) et ceci 
  // APRÈS l'affichage du composant pour que l'élément du DOM dans lequel 
  // on veut placer le widget de connexion soit bien dans la page
  useEffect(() => crudUtilisateurs.initUI("#firebaseui-widget"), []);

  return (
    <div className="Accueil">
      <h3 className="logo">Signets <span>beta</span></h3>
      <h2 className="amorce">Organisez vos signets Web, <br />Simple comme bonjour !</h2>
      <h4 className="connexion-etiquette">Connexion à Signets</h4>
      <div id="firebaseui-widget"></div>
    </div>
  )
}