// productAction.js
import API_BASE_URL from "../../ApiConfig";

// Action types
export const FETCH_PRODUCTS_REQUEST = 'FETCH_PRODUCTS_REQUEST';
export const FETCH_PRODUCTS_SUCCESS = 'FETCH_PRODUCTS_SUCCESS';
export const FETCH_PRODUCTS_FAILURE = 'FETCH_PRODUCTS_FAILURE';

export const ADD_PRODUCT_REQUEST = 'ADD_PRODUCT_REQUEST';
export const ADD_PRODUCT_SUCCESS = 'ADD_PRODUCT_SUCCESS';
export const ADD_PRODUCT_FAILURE = 'ADD_PRODUCT_FAILURE';

// Action creator for fetching products
export const fetchProducts = () => {
  return async (dispatch) => {
    dispatch({ type: FETCH_PRODUCTS_REQUEST });

    try {
      const response = await fetch(`${API_BASE_URL}/products`); // URL pour récupérer les produits
      const data = await response.json();
      dispatch({
        type: FETCH_PRODUCTS_SUCCESS,
        payload: data,
      });
    } catch (error) {
      dispatch({
        type: FETCH_PRODUCTS_FAILURE,
        payload: error.message,
      });
    }
  };
};

// Action creator for adding a product
export const addProduct = (productData) => {
  return async (dispatch) => {
    dispatch({ type: ADD_PRODUCT_REQUEST });

    try {
      const response = await fetch(`${API_BASE_URL}/products`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(productData),
      });
      
      const data = await response.json();
      if (response.ok) {
        dispatch({
          type: ADD_PRODUCT_SUCCESS,
          payload: data,
        });
      } else {
        dispatch({
          type: ADD_PRODUCT_FAILURE,
          payload: data.message || 'Failed to add product',
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
