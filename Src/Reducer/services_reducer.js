import {
  GET_CITY_SUCCESS,
  GET_COUNTRY_SUCCESS,
  GET_CUSTOMER_SUCCESS,
  GET_SEGMENT_SUCCESS,
  GET_SOURCE_SUCCESS,
  GET_STAGE_SUCCESS,
  GET_STATE_SUCCESS,
  GET_TYPE_OF_CUSTOMER_SUCCESS,
  GET_TYPE_OF_INDUSTRY_SUCCESS,
  GET_ZONE_SUCCESS,
} from '../Utils/action';

const Services_reducers = (state, action) => {
  switch (action.type) {
    case GET_CUSTOMER_SUCCESS:
      return {
        ...state,
        customer_array: action.payload,
      };

    case GET_COUNTRY_SUCCESS:
      return {
        ...state,
        country_array: action.payload,
      };

    case GET_STATE_SUCCESS:
      return {
        ...state,
        state_array: action.payload,
      };

    case GET_CITY_SUCCESS:
      return {
        ...state,
        city_array: action.payload,
      };

    case GET_TYPE_OF_CUSTOMER_SUCCESS:
      return {
        ...state,
        toc_array: action.payload,
      };

    case GET_TYPE_OF_INDUSTRY_SUCCESS:
      return {
        ...state,
        toi_array: action.payload,
      };

    case GET_ZONE_SUCCESS:
      return {
        ...state,
        zone_array: action.payload,
      };

    case GET_SEGMENT_SUCCESS:
      return {
        ...state,
        segment_array: action.payload,
      };

    case GET_SOURCE_SUCCESS:
      return {
        ...state,
        source_array: action.payload,
      };

    case GET_STAGE_SUCCESS:
      return {
        ...state,
        stage_array: action.payload,
      };
    default:
      return {...state};
  }
};

export default Services_reducers;
