// reducers/boutiqueReducer.js

import {
    FETCH_BOUTIQUES_REQUEST,
    FETCH_BOUTIQUES_SUCCESS,
    FETCH_BOUTIQUES_FAILURE,
  } from '../actions/MesBoutiquesAction';
  
  const initialState = {
    boutiques: [],
    loading: false,
    error: null,
  };
  
  const MesBoutiquesReducer = (state = initialState, action) => {
    switch (action.type) {
      case FETCH_BOUTIQUES_REQUEST:
        return { ...state, loading: true, error: null };
      case FETCH_BOUTIQUES_SUCCESS:
        return { ...state, loading: false, boutiques: action.payload };
      case FETCH_BOUTIQUES_FAILURE:
        return { ...state, loading: false, error: action.error };
      default:
        return state;
    }
  };
  
  export default MesBoutiquesReducer;
  