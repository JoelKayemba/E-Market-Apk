// productAction.js
import API_BASE_URL from "../../ApiConfig";

// Action types
export const FETCH_PRODUCTS_REQUEST = 'FETCH_PRODUCTS_REQUEST';
export const FETCH_PRODUCTS_SUCCESS = 'FETCH_PRODUCTS_SUCCESS';
export const FETCH_PRODUCTS_FAILURE = 'FETCH_PRODUCTS_FAILURE';

export const ADD_PRODUCT_REQUEST = 'ADD_PRODUCT_REQUEST';
export const ADD_PRODUCT_SUCCESS = 'ADD_PRODUCT_SUCCESS';
export const ADD_PRODUCT_FAILURE = 'ADD_PRODUCT_FAILURE';

export const UPDATE_PRODUCT_REQUEST = 'UPDATE_PRODUCT_REQUEST';
export const UPDATE_PRODUCT_SUCCESS = 'UPDATE_PRODUCT_SUCCESS';
export const UPDATE_PRODUCT_FAILURE = 'UPDATE_PRODUCT_FAILURE';

export const DELETE_PRODUCT_REQUEST = 'DELETE_PRODUCT_REQUEST';
export const DELETE_PRODUCT_SUCCESS = 'DELETE_PRODUCT_SUCCESS';
export const DELETE_PRODUCT_FAILURE = 'DELETE_PRODUCT_FAILURE';


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
  

  export const updateProduct = (idProduit, formData, navigation) => {
    return async (dispatch) => {
      dispatch({ type: UPDATE_PRODUCT_REQUEST });
  
      try {
        const response = await fetch(`${API_BASE_URL}/produit/modifierProduit/${idProduit}`, {
          method: 'PUT',
          body: formData,
        });
  
        const data = await response.json();
  
        if (response.ok) {
          dispatch({
            type: UPDATE_PRODUCT_SUCCESS,
            payload: data, // Les données du produit modifié
          });
  
          alert('Produit modifié avec succès');
        
        } else {
          dispatch({
            type: UPDATE_PRODUCT_FAILURE,
            payload: data.message || 'Échec de la modification du produit',
          });
        }
      } catch (error) {
        dispatch({
          type: UPDATE_PRODUCT_FAILURE,
          payload: error.message,
        });
      }
    };
  };


  export const deleteProduct = (idProduit) => {
    return async (dispatch) => {
      dispatch({ type: DELETE_PRODUCT_REQUEST });
  
      try {
        const response = await fetch(`${API_BASE_URL}/produit/supprimerProduit/${idProduit}`, {
          method: 'DELETE',
        });
  
        const data = await response.json();
  
        if (response.ok) {
          dispatch({
            type: DELETE_PRODUCT_SUCCESS,
            payload: idProduit, // L'ID du produit supprimé
          });
  
          alert('Produit supprimé avec succès');
        } else {
          dispatch({
            type: DELETE_PRODUCT_FAILURE,
            payload: data.message || 'Échec de la suppression du produit',
          });
        }
      } catch (error) {
        dispatch({
          type: DELETE_PRODUCT_FAILURE,
          payload: error.message,
        });
      }
    };
  };