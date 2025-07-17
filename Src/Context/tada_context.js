import React, {useContext, useEffect, useReducer, useState} from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {useLoginContext} from './login_context';
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
import axios from 'axios';
import Tada_reducers from '../Reducer/tada_reducer';
import {
  ACCEPT_HEADER,
  create_ta_da_url,
  delete_ta_da_url,
  get_ta_da_url,
  getexpense_url,
  update_ta_da_url,
} from '../Utils/BaseUrl';
import SimpleToast from 'react-native-simple-toast';

const Tadacontext = React.createContext();
const initialState = {
  tada_loading: false,
  tadalist: [],
  delete_loading: false,
  expenselist: [],
  add_update_loading: false,
};

export const Tadaprovider = ({children}) => {
  const [state, dispatch] = useReducer(Tada_reducers, initialState);
  const {setLogout} = useLoginContext();

  const GetTadalist = async props => {
    var Token = await AsyncStorage.getItem('token');
    dispatch({type: TADA_LIST_BEGIN});
    axios
      .get(get_ta_da_url, {
        headers: {
          Accept: ACCEPT_HEADER,
          Authorization: 'Bearer ' + Token,
        },
      })
      .then(res => {
        if (res.data.status === 'Token is Expired') {
          setLogout(props);
        } else {
          if (res.data.success === 1)
            dispatch({type: TADA_LIST_SUCCESS, payload: res.data.data});
        }
      })
      .catch(err => {
        dispatch({type: TADA_LIST_ERROR});
      });
  };

  const DeleteTadalist = async (formdata, props) => {
    var Token = await AsyncStorage.getItem('token');
    dispatch({type: TADA_DELETE_BEGIN});
    axios
      .post(delete_ta_da_url, formdata, {
        headers: {
          Accept: ACCEPT_HEADER,
          Authorization: 'Bearer ' + Token,
        },
      })
      .then(res => {
        if (res.data.status === 'Token is Expired') {
          setLogout(props);
        } else {
          if (res.data.success === 1) {
            dispatch({type: TADA_DELETE_SUCCESS});
            SimpleToast.show(res.data.message);
            GetTadalist(props);
          }
        }
      })
      .catch(err => {
        dispatch({type: TADA_DELETET_ERROR});
      });
  };

  const Getexpenselist = async props => {
    var Token = await AsyncStorage.getItem('token');
    dispatch({type: EXPENSE_BEGIN});
    axios
      .get(getexpense_url, {
        headers: {
          Accept: ACCEPT_HEADER,
          Authorization: 'Bearer ' + Token,
        },
      })
      .then(res => {
        if (res.data.status === 'Token is Expired') {
          setLogout(props);
        } else {
          if (res.data.success === 1)
            dispatch({type: EXPENSE_SUCCESS, payload: res.data.data});
        }
      })
      .catch(err => {
        dispatch({type: EXPENSE_ERROR});
      });
  };

  const ADDTadalist = async (formdata, props) => {
    var Token = await AsyncStorage.getItem('token');
    dispatch({type: ADD_TADA_BEGIN});
    axios
      .post(create_ta_da_url, formdata, {
        headers: {
          Accept: ACCEPT_HEADER,
          Authorization: 'Bearer ' + Token,
        },
      })
      .then(res => {
        if (res.data.status === 'Token is Expired') {
          setLogout(props);
        } else {
          if (res.data.success === 1) {
            dispatch({type: ADD_TADA_SUCCESS});
            props.navigation.goBack(null);
            SimpleToast.show(res.data.message);
            GetTadalist(props);
          } else {
            dispatch({type: ADD_TADA_ERROR});
            SimpleToast.show(res.data.message);
          }
        }
      })
      .catch(err => {
        dispatch({type: ADD_TADA_ERROR});
      });
  };

  const UPDATETadalist = async (formdata, props) => {
    var Token = await AsyncStorage.getItem('token');
    dispatch({type: UPDATE_TADA_BEGIN});
    axios
      .post(update_ta_da_url, formdata, {
        headers: {
          Accept: ACCEPT_HEADER,
          Authorization: 'Bearer ' + Token,
        },
      })
      .then(res => {
        if (res.data.status === 'Token is Expired') {
          setLogout(props);
        } else {
          if (res.data.success === 1) {
            dispatch({type: UPDATE_TADA_SUCCESS});
            props.navigation.goBack(null);
            SimpleToast.show(res.data.message);
            GetTadalist(props);
          } else {
            dispatch({type: UPDATE_TADA_ERROR});
            SimpleToast.show(res.data.message);
          }
        }
      })
      .catch(err => {
        dispatch({type: UPDATE_TADA_ERROR});
      });
  };

  return (
    <Tadacontext.Provider
      value={{
        ...state,
        GetTadalist,
        DeleteTadalist,
        Getexpenselist,
        ADDTadalist,
        UPDATETadalist,
      }}>
      {children}
    </Tadacontext.Provider>
  );
};

export const useTadaContext = () => {
  return useContext(Tadacontext);
};
