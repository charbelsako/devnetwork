import { GET_ADS, ADS_LOADING, DELETE_AD, ADD_AD } from "../actions/types";

const initialState = {
  ads: [],
  loading: false,
};

export default function (state = initialState, action) {
  switch (action.type) {
    case GET_ADS:
      return {
        ...state,
        loading: false,
        ads: action.payload,
      };
    case ADS_LOADING:
      return {
        ...state,
        loading: true,
      };
    case DELETE_AD:
      return {
        ...state,
        ads: state.ads.filter(ad => ad._id !== action.payload),
      };
    case ADD_AD:
      return {
        ...state,
        ads: [action.payload, ...state.ads],
      };
    default:
      return state;
  }
}
