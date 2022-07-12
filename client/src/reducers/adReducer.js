import {
  GET_ADS,
  ADS_LOADING,
  DELETE_AD,
  ADD_AD,
  GET_APPLIED_JOBS,
  APPLY_TO_JOB,
  // APPLICATIONS_LOADING,
} from "../actions/types"

const initialState = {
  ads: [],
  loading: false,
  appliedAds: [],
  applicationsLoading: false,
}

export default function (state = initialState, action) {
  switch (action.type) {
    case GET_ADS:
      return {
        ...state,
        loading: false,
        ads: action.payload,
      }
    case ADS_LOADING:
      return {
        ...state,
        loading: true,
      }
    case DELETE_AD:
      return {
        ...state,
        ads: state.ads.filter((ad) => ad._id !== action.payload),
      }
    case ADD_AD:
      return {
        ...state,
        ads: [action.payload, ...state.ads],
      }
    case APPLY_TO_JOB:
      return {
        ...state,
        appliedAds: [...state.appliedAds, action.payload],
      }
    case GET_APPLIED_JOBS:
      return {
        ...state,
        appliedAds: action.payload,
        applicationsLoading: false,
      }
    // case APPLICATIONS_LOADING:
    //   return {
    //     ...state,
    //     applicationsLoading: true,
    //   }
    default:
      return state
  }
}
