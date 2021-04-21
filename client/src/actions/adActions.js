import { GET_ADS, ADD_AD, DELETE_AD, ADS_LOADING } from "./types";
import axios from "axios";
import { GET_ERRORS } from "./types";

export const getAllAds = () => async dispatch => {
  dispatch({ type: ADS_LOADING, payload: null });
  try {
    // call the api
    const ads = await axios.get("/api/ads");
    dispatch({ type: GET_ADS, payload: ads.data });
  } catch (e) {
    // dispatch({ type: GET_ERRORS, payload: e.response.data });
  }
};

export const deleteAd = id => async dispatch => {
  try {
    const response = axios.delete("/api/ads/" + id);
    dispatch({ type: DELETE_AD, payload: response.data });
  } catch (e) {
    console.log(e);
  }
};

export const addAd = ad => async dispatch => {
  try {
    // call the add api
    const Ad = await axios.post("/api/ads", ad);
    dispatch({ type: ADD_AD, payload: ad.data });
  } catch (e) {
    console.log(e);
  }
};

export const getUserAds = () => async dispatch => {
  // loading
  dispatch({ type: ADS_LOADING });
  try {
    // call the api
    const ads = await axios.get("/api/ads/myads");
    dispatch({ type: GET_ADS, payload: ads.data });
  } catch (e) {
    console.log(e);
    console.log(e.message);
  }
};
