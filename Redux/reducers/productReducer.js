// productReducer.js
import {
    FETCH_PRODUCTS_REQUEST,
    FETCH_PRODUCTS_SUCCESS,
    FETCH_PRODUCTS_FAILURE,
    ADD_PRODUCT_REQUEST,
    ADD_PRODUCT_SUCCESS,
    ADD_PRODUCT_FAILURE,
  } from '../actions/productActions';
  
  // Initial state
  const initialState = {
    loading: false,
    products: [],
    error: null,
  };
  
  // Product reducer
  export const  productReducer = (state = initialState, action) => {
    switch (action.type) {
      // Fetch products
      case FETCH_PRODUCTS_REQUEST:
        return {
          ...state,
          loading: true,
          error: null,
        };
      case FETCH_PRODUCTS_SUCCESS:
        return {
          ...state,
          loading: false,
          products: action.payload,
          error: null,
        };
      case FETCH_PRODUCTS_FAILURE:
        return {
          ...state,
          loading: false,
          error: action.payload,
        };
  
      // Add product
      case ADD_PRODUCT_REQUEST:
        return {
          ...state,
          loading: true,
          error: null,
        };
      case ADD_PRODUCT_SUCCESS:
        return {
          ...state,
          loading: false,
          products: [...state.products, action.payload],
          error: null,
        };
      case ADD_PRODUCT_FAILURE:
        return {
          ...state,
          loading: false,
          error: action.payload,
        };
  
      default:
        return state;
    }
  };
  