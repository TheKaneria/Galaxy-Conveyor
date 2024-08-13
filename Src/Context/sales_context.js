import React, {useContext, useEffect, useReducer, useState} from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {
  SALES_SUCCESS,
  SALES_ERROR,
  SALES_BEGIN,
  QUORDER_SUCCESS,
  QUORDER_ERROR,
  QUORDER_BEGIN,
} from '../Utils/action';
import {
  login_check_url,
  ACCEPT_HEADER,
  getsales_url,
  quotation_order_count_url,
} from '../Utils/BaseUrl';
import Toast from 'react-native-simple-toast';
import axios from 'axios';
import Sales_reducers from '../Reducer/sales_reducer';
import {useLoginContext} from './login_context';

const Salescontext = React.createContext();
const initialState = {
  sales_loading: false,
  sales_info: '',
  Quodrder_loading: false,
  Quodrder_info: '',
};

export const Salesprovider = ({children}) => {
  const [state, dispatch] = useReducer(Sales_reducers, initialState);
  const {setLogout} = useLoginContext();

  const GetSales = async props => {
    var Token = await AsyncStorage.getItem('token');
    dispatch({type: SALES_BEGIN});
    axios
      .get(getsales_url, {
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
            dispatch({type: SALES_SUCCESS, payload: res.data});
        }
      })
      .catch(err => {
        dispatch({type: SALES_ERROR});
      });
  };

  const GetQuotationOrder = async props => {
    var Token = await AsyncStorage.getItem('token');
    dispatch({type: QUORDER_BEGIN});
    axios
      .get(quotation_order_count_url, {
        headers: {
          Accept: ACCEPT_HEADER,
          Authorization: 'Bearer ' + Token,
        },
      })
      .then(res => {
        // console.log('res', JSON.stringify(res.data, null, 2));

        if (res.data.status === 'Token is Expired') {
          setLogout(props);
        } else {
          if (res.data.success === 1)
            dispatch({type: QUORDER_SUCCESS, payload: res.data});
        }
      })
      .catch(err => {
        dispatch({type: QUORDER_ERROR});
      });
  };

  return (
    <Salescontext.Provider
      value={{
        ...state,
        GetSales,
        GetQuotationOrder,
      }}>
      {children}
    </Salescontext.Provider>
  );
};

export const useSalesContext = () => {
  return useContext(Salescontext);
};
