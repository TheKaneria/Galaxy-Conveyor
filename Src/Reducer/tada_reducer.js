import {
  ADD_TADA_BEGIN,
  ADD_TADA_ERROR,
  ADD_TADA_SUCCESS,
  EXPENSE_BEGIN,
  EXPENSE_ERROR,
  EXPENSE_SUCCESS,
  TADA_DELETE_BEGIN,
  TADA_DELETE_SUCCESS,
  TADA_DELETET_ERROR,
  TADA_LIST_BEGIN,
  TADA_LIST_ERROR,
  TADA_LIST_SUCCESS,
  UPDATE_TADA_BEGIN,
  UPDATE_TADA_ERROR,
  UPDATE_TADA_SUCCESS,
} from '../Utils/action';

const Tada_reducers = (state, action) => {
  switch (action.type) {
    case TADA_LIST_BEGIN:
      return {
        ...state,
        tada_loading: true,
      };

    case TADA_LIST_SUCCESS:
      return {
        ...state,
        tada_loading: false,
        tadalist: action.payload,
      };

    case TADA_LIST_ERROR:
      return {
        ...state,
        tada_loading: false,
      };

    case TADA_DELETE_BEGIN:
      return {
        ...state,
        delete_loading: true,
      };

    case TADA_DELETE_SUCCESS:
      return {
        ...state,
        delete_loading: false,
      };

    case TADA_DELETET_ERROR:
      return {
        ...state,
        delete_loading: false,
      };
    case EXPENSE_BEGIN:
      return {
        ...state,
      };

    case EXPENSE_SUCCESS:
      return {
        ...state,
        expenselist: action.payload,
      };

    case EXPENSE_ERROR:
      return {
        ...state,
      };

    case ADD_TADA_BEGIN:
      return {
        ...state,
        add_update_loading: true,
      };

    case ADD_TADA_SUCCESS:
      return {
        ...state,
        add_update_loading: false,
      };

    case ADD_TADA_ERROR:
      return {
        ...state,
        add_update_loading: false,
      };

    case UPDATE_TADA_BEGIN:
      return {
        ...state,
        add_update_loading: true,
      };

    case UPDATE_TADA_SUCCESS:
      return {
        ...state,
        add_update_loading: false,
      };

    case UPDATE_TADA_ERROR:
      return {
        ...state,
        add_update_loading: false,
      };

    default:
      return {...state};
  }
};

export default Tada_reducers;
