// actions/boutiqueActions.js

import API_BASE_URL from "../../ApiConfig";

export const FETCH_BOUTIQUES_REQUEST = 'FETCH_BOUTIQUES_REQUEST';
export const FETCH_BOUTIQUES_SUCCESS = 'FETCH_BOUTIQUES_SUCCESS';
export const FETCH_BOUTIQUES_FAILURE = 'FETCH_BOUTIQUES_FAILURE';

// Action pour récupérer les boutiques
export const fetchMesBoutiques = (idclient) => async (dispatch) => {
  dispatch({ type: FETCH_BOUTIQUES_REQUEST });

  try {
    const response = await fetch(`${API_BASE_URL}/ownBoutique/boutiquesUtilisateur?idclient=${idclient}`);
    const data = await response.json();

    if (response.ok) {
      dispatch({ type: FETCH_BOUTIQUES_SUCCESS, payload: data });
    } else {
      dispatch({ type: FETCH_BOUTIQUES_FAILURE, error: data.message || 'Erreur lors de la récupération des boutiques' });
    }
  } catch (error) {
    dispatch({ type: FETCH_BOUTIQUES_FAILURE, error: 'Erreur de connexion au serveur' });
  }
};
