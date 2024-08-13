import AsyncStorage from '@react-native-async-storage/async-storage';
import {
  PRODUCTION_BEGIN,
  PRODUCTION_SUCCESS,
  PRODUCTION_ERROR,
  CODE_BEGIN,
  CODE_SUCCESS,
  CODE_ERROR,
  CLEAR_DATA,
} from '../Utils/action';

const Product_reducers = (state, action) => {
  switch (action.type) {
    case PRODUCTION_BEGIN:
      return {...state, product_loading: true};

    case PRODUCTION_SUCCESS:
      return {
        ...state,
        product_loading: false,
        product_array: action.payload,
      };

    case PRODUCTION_ERROR:
      return {...state, product_loading: false};

    case CODE_BEGIN:
      return {...state};

    case CODE_SUCCESS:
      return {
        ...state,
        code_array: action.payload,
      };

    case CODE_ERROR:
      return {...state};

    case CLEAR_DATA:
      return {...state, product_array: action.payload};

    default:
      return {...state};
  }
};

export default Product_reducers;
