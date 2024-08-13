import React, {useContext, useEffect, useReducer, useState} from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {LOGIN_BEGIN, LOGIN_SUCCESS, LOGIN_ERROR} from '../Utils/action';
import {login_check_url, ACCEPT_HEADER, LOGOUT_USER} from '../Utils/BaseUrl';
import Toast from 'react-native-simple-toast';
import axios from 'axios';
import Login_reducers from '../Reducer/login_reducer';

const Logincontext = React.createContext();
const initialState = {
  login_loading: false,
  user_id: '',
};

export const Loginprovider = ({children}) => {
  const [state, dispatch] = useReducer(Login_reducers, initialState);

  const Loginapi = async (param, props) => {
    dispatch({type: LOGIN_BEGIN});

    axios
      .post(login_check_url, param, {
        headers: {
          Accept: ACCEPT_HEADER,
        },
      })
      .then(async res => {
        console.log('resss', JSON.stringify(res.data, null, 2));
        if (res.data.success == 1) {
          AsyncStorage.setItem('token', res.data.token);
          Toast.show('Login successfully');
          await AsyncStorage.setItem('islogin', 'true');
          props.navigation.replace('DashBoard');
          dispatch({type: LOGIN_SUCCESS, payload: res.data.user});
        } else {
          Toast.show(res.data.message);
          dispatch({type: LOGIN_ERROR});
        }
      })
      .catch(err => {
        console.log('err', err);
        dispatch({type: LOGIN_ERROR});
      });
  };

  const setLogout = async props => {
    await dispatch({type: LOGOUT_USER});
    await props.navigation.reset({
      routes: [{name: 'Login'}],
    });
  };

  return (
    <Logincontext.Provider
      value={{
        ...state,
        Loginapi,
        setLogout,
      }}>
      {children}
    </Logincontext.Provider>
  );
};

export const useLoginContext = () => {
  return useContext(Logincontext);
};
