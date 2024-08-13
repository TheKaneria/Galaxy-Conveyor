import AsyncStorage from '@react-native-async-storage/async-storage';
import {
  LOGIN_BEGIN,
  LOGIN_SUCCESS,
  LOGIN_ERROR,
  LOGOUT_USER,
} from '../Utils/action';

const Login_reducers = (state, action) => {
  switch (action.type) {
    case LOGIN_BEGIN:
      return {...state, login_loading: true};

    case LOGIN_ERROR:
      return {...state, login_loading: false};

    case LOGIN_SUCCESS:
      return {
        ...state,
        login_loading: false,
      };

    case LOGOUT_USER:
      AsyncStorage.clear();
      AsyncStorage.removeItem('islogin');
      AsyncStorage.removeItem('token');
      return {
        ...state,
        user_id: '',
      };
    default:
      return {...state};
  }
};

export default Login_reducers;
