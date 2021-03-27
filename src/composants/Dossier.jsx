import './Dossier.scss'; 
import { IconButton, Menu, MenuItem } from '@material-ui/core';
import SortIcon from '@material-ui/icons/Sort';
import MoreVertIcon from '@material-ui/icons/MoreVert';
import { useState } from 'react';
import couvertureDefaut from '../images/couverture.webp';

export default function Dossier({id, nom, couleur, datemodif, couverture, gererSupprimer}) {
  // État de l'élément qui a reçu le clic du menu 'plus (more)' (initial = null / cliqué = élément correspondant au menu cliqué)
  const [eltCible, setEltCible] = useState(null);

  /**
   * Assigner le menu cliqué
   * @param {Event} e objet Event JavaScript passé à la fonction de rappel gestionnaire d'événement
   */
  function gererClic(e) {
    setEltCible(e.currentTarget);
  }

  /**
   * Désassigner le menu cliqué
   */
  function gererFermer() {
    setEltCible(null);
  }

  return (
    <article className="Dossier" style={{backgroundColor: couleur}}>
      <div className="couverture">
        <IconButton className="deplacer" aria-label="déplacer" disableRipple={true}>
          <SortIcon />
        </IconButton>
        <img src={couverture || couvertureDefaut} alt={nom}/>
      </div>
      <div className="info">
        <h2>{nom}</h2>
        <p>Modifié : {formaterDate(datemodif)}</p>
      </div>
      <IconButton id={id} className="modifier" aria-label="modifier" size="small" aria-haspopup="true" aria-controls="maj-dossier" onClick={gererClic}>
        <MoreVertIcon />
      </IconButton>
      <Menu 
        id="maj-dossier" 
        anchorEl={eltCible}
        keepMounted
        open={Boolean(eltCible)}
        onClose={gererFermer}
      >
        <MenuItem onClick={gererFermer}>Modifier</MenuItem>
        <MenuItem onClick={() => {gererSupprimer(id); gererFermer();}}>Supprimer</MenuItem>
      </Menu>
    </article>
  );
}

/**
 * Formate les objets date de Firestore et retourne une chaîne de caractères
 * @param {Object} d Objet date retourné par Firestore
 * @returns String date formatée en français
 */
function formaterDate(d) {
  // S'il n'y a pas d'objet date Firestore, créer une date JavaScript correspondant à "maintenant"
  const dateJs = d ? new Date(d.seconds*1000) : new Date();
  const mois = ['janvier', 'février', 'mars', 'avril', 'mai', 'juin', 'juillet', 'août', 'septembre', 'octobre', 'novembre', 'décembre'];
  return `${dateJs.getDate()} ${mois[dateJs.getMonth()]} ${dateJs.getFullYear()}`;
}