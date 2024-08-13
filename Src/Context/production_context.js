import React, {useContext, useEffect, useReducer, useState} from 'react';
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
import {
  ACCEPT_HEADER,
  get_all_items_data_url,
  getproduct_url,
} from '../Utils/BaseUrl';
import Toast from 'react-native-simple-toast';
import axios from 'axios';

import {useLoginContext} from './login_context';
import Product_reducers from '../Reducer/production_reducer';

const Productcontext = React.createContext();
const initialState = {
  product_loading: false,
  product_array: [],
  code_array: [],
};

export const Productprovider = ({children}) => {
  const [state, dispatch] = useReducer(Product_reducers, initialState);
  const {setLogout} = useLoginContext();
  const GetCodeData = async props => {
    var Token = await AsyncStorage.getItem('token');
    dispatch({type: CODE_BEGIN});
    axios
      .get(get_all_items_data_url, {
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
            dispatch({type: CODE_SUCCESS, payload: res.data.data});
        }
      })
      .catch(err => {
        dispatch({type: CODE_ERROR});
      });
  };

  const Cleardata = () => {
    const product_array = [];

    dispatch({type: CLEAR_DATA, payload: product_array});
  };

  const GetProduct = async (props, fromdata) => {
    var Token = await AsyncStorage.getItem('token');
    dispatch({type: PRODUCTION_BEGIN});
    axios
      .post(getproduct_url, fromdata, {
        headers: {
          Accept: ACCEPT_HEADER,
          Authorization: 'Bearer ' + Token,
        },
      })
      .then(res => {
        // console.log('ressss', JSON.stringify(res.data, null, 2));

        if (res.data.status === 'Token is Expired') {
          setLogout(props);
        } else {
          if (res.data.success === 1)
            dispatch({type: PRODUCTION_SUCCESS, payload: res.data.data});
        }
      })
      .catch(err => {
        dispatch({type: PRODUCTION_ERROR});
      });
  };

  return (
    <Productcontext.Provider
      value={{
        ...state,
        GetCodeData,
        GetProduct,
        Cleardata,
      }}>
      {children}
    </Productcontext.Provider>
  );
};

export const useProductContext = () => {
  return useContext(Productcontext);
};
