export const initialState = {
  nom: '',
  type: '',
  categorie: [],
  email: '',
  numero_telephone: '',
  description: '',
  idclient: null,
  images: [],
  idBoutique: null, 
};

export const boutiqueReducer = (state = initialState, action) => {
  switch (action.type) {
    case 'SET_FIELD_VALUE':
      return {
        ...state,
        [action.field]: action.value,
      };
    case 'SET_ID_CLIENT':
      return {
        ...state,
        idclient: action.idclient,
      };
    case 'SET_IMAGES':
      return {
        ...state,
        images: action.images,
      };
    case 'SET_BOUTIQUE_ID': 
      return {
        ...state,
        idBoutique: action.idBoutique,
      };
    case 'RESET_FORM':
      return initialState;
    default:
      return state;
  }
};


