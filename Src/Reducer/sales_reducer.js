import AsyncStorage from '@react-native-async-storage/async-storage';
import {
  SALES_BEGIN,
  SALES_SUCCESS,
  SALES_ERROR,
  QUORDER_SUCCESS,
  QUORDER_BEGIN,
  QUORDER_ERROR,
  OVERDUE_BEGIN,
  OVERDUE_SUCCESS,
  OVERDUE_ERROR,
} from '../Utils/action';

const Sales_reducers = (state, action) => {
  switch (action.type) {
    case SALES_BEGIN:
      return {...state, sales_loading: true};

    case SALES_SUCCESS:
      return {
        ...state,
        sales_loading: false,
        sales_info: action.payload,
      };

    case SALES_ERROR:
      return {...state, sales_loading: false};

    case QUORDER_BEGIN:
      return {...state, Quodrder_loading: true};

    case QUORDER_SUCCESS:
      return {
        ...state,
        Quodrder_loading: false,
        Quodrder_info: action.payload,
      };

    case QUORDER_ERROR:
      return {...state, Quodrder_loading: false};

    case OVERDUE_BEGIN:
      return {...state, Overdue_loading: true};

    case OVERDUE_SUCCESS:
      return {
        ...state,
        Overdue_loading: false,
        Overdue_info: action.payload,
      };

    case OVERDUE_ERROR:
      return {...state, Overdue_loading: false};

    default:
      return {...state};
  }
};

export default Sales_reducers;
