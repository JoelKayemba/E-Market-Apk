// boutiqueReducer.js
export const initialState = {
    nom: '',
    type: [], 
    categorie: [], 
    email: '',
    numero_telephone: '',
    images: [], // pour les images en liste
    description: '',
    idclient: null,
  };
  
  export const boutiqueReducer = (state=initialState, action) => {
    switch (action.type) {
      case 'SET_FIELD_VALUE':
        return { ...state, [action.field]: action.value };
      case 'SET_IMAGES':
        return { ...state, images: action.images };
        case 'SET_ID_CLIENT':
            return {
              ...state,
              idclient: action.idclient, // Assurez-vous que l'action utilise cette clé
            };
      case 'RESET_STATE':
        return initialState;
      default:
        return state;
    }
  };
  
  

  