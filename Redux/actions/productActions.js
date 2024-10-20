// productAction.js
import API_BASE_URL from "../../ApiConfig";

// Action types
export const FETCH_PRODUCTS_REQUEST = 'FETCH_PRODUCTS_REQUEST';
export const FETCH_PRODUCTS_SUCCESS = 'FETCH_PRODUCTS_SUCCESS';
export const FETCH_PRODUCTS_FAILURE = 'FETCH_PRODUCTS_FAILURE';

export const ADD_PRODUCT_REQUEST = 'ADD_PRODUCT_REQUEST';
export const ADD_PRODUCT_SUCCESS = 'ADD_PRODUCT_SUCCESS';
export const ADD_PRODUCT_FAILURE = 'ADD_PRODUCT_FAILURE';


export const fetchProducts = (idBoutique) => {
    return async (dispatch) => {
      dispatch({ type: FETCH_PRODUCTS_REQUEST });
  
      try {
        const response = await fetch(`${API_BASE_URL}/produit/produitsBoutique/${idBoutique}`);
        const data = await response.json();
  
        if (response.ok) {
          dispatch({
            type: FETCH_PRODUCTS_SUCCESS,
            payload: data,
          });
        } else {
          dispatch({
            type: FETCH_PRODUCTS_FAILURE,
            payload: data.message || 'Erreur lors de la récupération des produits',
          });
        }
      } catch (error) {
        dispatch({
          type: FETCH_PRODUCTS_FAILURE,
          payload: error.message,
        });
      }
    };
  };


  export const addProduct = (formData, navigation) => {
    return async (dispatch) => {
      dispatch({ type: ADD_PRODUCT_REQUEST });
  
      try {
        const response = await fetch(`${API_BASE_URL}/produit/ajoutProduit`, {
          method: 'POST',
          body: formData,
        });
  
        const data = await response.json();
      
        if (response.ok) {
          // Ajoutez le produit directement au state Redux
          dispatch({
            type: ADD_PRODUCT_SUCCESS,
            payload: data, // Les données du produit ajouté
          });

          
  
          // Afficher un message de succès
          alert('Produit ajouté avec succès');
  
          // Naviguer vers la page précédente ou vers une autre page
          navigation.goBack();
        } else {
          dispatch({
            type: ADD_PRODUCT_FAILURE,
            payload: data.message || 'Échec de l\'ajout du produit',
          });
        }
      } catch (error) {
        dispatch({
          type: ADD_PRODUCT_FAILURE,
          payload: error.message,
        });
      }
    };
  };
  
