import { GET_ADS, ADD_AD, DELETE_AD, ADS_LOADING, GET_ERRORS } from "./types";
import axios from "axios";

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
  console.log("deleted");
  try {
    const response = await axios.delete("/api/ads/" + id);
    console.log(response.data);
    dispatch({ type: DELETE_AD, payload: response.data.id });
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
    dispatch({ type: GET_ERRORS, payload: e.response.data });
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
