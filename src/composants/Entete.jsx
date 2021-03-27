import './Entete.scss';
import { Avatar } from '@material-ui/core'; 
import Button from '@material-ui/core/Button';
import * as crudUtilisateurs from '../services/crud-utilisateurs';

export default function Entete({utilisateur}) {
  return (
    <header className="Entete">
      <div className="logo">
        Signets
        <Button 
          variant="outlined"
          size="small"
          className="btn-deconnexion"
          onClick={() => crudUtilisateurs.deconnecter()}
        >
          Déconnexion
        </Button>
      </div>
      <div className="utilisateur">{utilisateur.displayName} <Avatar className="avatar" alt={utilisateur.displayName} src={utilisateur.photoURL} /></div>
    </header>
  );
}