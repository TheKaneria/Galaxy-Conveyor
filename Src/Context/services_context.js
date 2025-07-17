import React, {useContext, useEffect, useReducer, useState} from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {useLoginContext} from './login_context';
import axios from 'axios';
import SimpleToast from 'react-native-simple-toast';
import Services_reducers from '../Reducer/services_reducer';
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
import {
  ACCEPT_HEADER,
  getcity_url,
  getcountry_url,
  getcustomer_url,
  getleadsource_url,
  getleadstage_url,
  getsegment_url,
  getstate_url,
  getzone_url,
  primary_type_of_industry_url,
  type_of_customer_url,
} from '../Utils/BaseUrl';

const Servicescontext = React.createContext();
const initialState = {
  customer_array: [],
  country_array: [],
  state_array: [],
  city_array: [],
  toc_array: [],
  toi_array: [],
  zone_array: [],
  segment_array: [],
  source_array: [],
  stage_array: [],
};

export const Servicesprovider = ({children}) => {
  const [state, dispatch] = useReducer(Services_reducers, initialState);
  const {setLogout} = useLoginContext();

  const Customerlist = async props => {
    var Token = await AsyncStorage.getItem('token');
    axios
      .get(getcustomer_url, {
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
            dispatch({
              type: GET_CUSTOMER_SUCCESS,
              payload: res.data.data,
            });
        }
      })
      .catch(err => {
        console.log('getcustomer_url err', err);
      });
  };

  const Countrylist = async props => {
    var Token = await AsyncStorage.getItem('token');
    axios
      .get(getcountry_url, {
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
            dispatch({
              type: GET_COUNTRY_SUCCESS,
              payload: res.data.data,
            });
        }
      })
      .catch(err => {
        console.log('getcountry_url err', err);
      });
  };

  const Statelist = async (formdata, props) => {
    var Token = await AsyncStorage.getItem('token');
    axios
      .post(getstate_url, formdata, {
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
            dispatch({
              type: GET_STATE_SUCCESS,
              payload: res.data.data,
            });
        }
      })
      .catch(err => {
        console.log('getstate_url err', err);
      });
  };

  const Citylist = async (formdata, props) => {
    var Token = await AsyncStorage.getItem('token');
    axios
      .post(getcity_url, formdata, {
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
            dispatch({
              type: GET_CITY_SUCCESS,
              payload: res.data.data,
            });
        }
      })
      .catch(err => {
        console.log('getcity_url err', err);
      });
  };

  const Typeofcustomerlist = async props => {
    var Token = await AsyncStorage.getItem('token');
    axios
      .get(type_of_customer_url, {
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
            dispatch({
              type: GET_TYPE_OF_CUSTOMER_SUCCESS,
              payload: res.data.data,
            });
        }
      })
      .catch(err => {
        console.log('type_of_customer_url err', err);
      });
  };

  const Typeofindustry = async props => {
    var Token = await AsyncStorage.getItem('token');
    axios
      .get(primary_type_of_industry_url, {
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
            dispatch({
              type: GET_TYPE_OF_INDUSTRY_SUCCESS,
              payload: res.data.data,
            });
        }
      })
      .catch(err => {
        console.log('primary_type_of_industry_url err', err);
      });
  };

  const Zonelist = async props => {
    var Token = await AsyncStorage.getItem('token');
    axios
      .get(getzone_url, {
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
            dispatch({
              type: GET_ZONE_SUCCESS,
              payload: res.data.data,
            });
        }
      })
      .catch(err => {
        console.log('getzone_url err', err);
      });
  };

  const Segmentlist = async props => {
    var Token = await AsyncStorage.getItem('token');
    axios
      .get(getsegment_url, {
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
            dispatch({
              type: GET_SEGMENT_SUCCESS,
              payload: res.data.data,
            });
        }
      })
      .catch(err => {
        console.log('getsegment_url err', err);
      });
  };

  const Sourcelist = async props => {
    var Token = await AsyncStorage.getItem('token');
    axios
      .get(getleadsource_url, {
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
            dispatch({
              type: GET_SOURCE_SUCCESS,
              payload: res.data.data,
            });
        }
      })
      .catch(err => {
        console.log('getleadsource_url err', err);
      });
  };

  const Stagelist = async props => {
    var Token = await AsyncStorage.getItem('token');
    axios
      .get(getleadstage_url, {
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
            dispatch({
              type: GET_STAGE_SUCCESS,
              payload: res.data.data,
            });
        }
      })
      .catch(err => {
        console.log('getleadstage_url err', err);
      });
  };

  return (
    <Servicescontext.Provider
      value={{
        ...state,
        Customerlist,
        Countrylist,
        Statelist,
        Citylist,
        Typeofcustomerlist,
        Typeofindustry,
        Zonelist,
        Segmentlist,
        Sourcelist,
        Stagelist,
      }}>
      {children}
    </Servicescontext.Provider>
  );
};

export const useServicesContext = () => {
  return useContext(Servicescontext);
};
