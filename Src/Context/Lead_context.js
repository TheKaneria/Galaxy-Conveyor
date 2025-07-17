import React, {useContext, useEffect, useReducer, useState} from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {useLoginContext} from './login_context';
import axios from 'axios';
import SimpleToast from 'react-native-simple-toast';
import Lead_reducers from '../Reducer/lead_reducer';
import {
  ADD_LEAD_BEGIN,
  ADD_LEAD_ERROR,
  ADD_LEAD_SUCCESS,
  ASSIGN_LEAD_BEGIN,
  ASSIGN_LEAD_ERROR,
  ASSIGN_LEAD_SUCCESS,
  COLLAB_LEAD_BEGIN,
  COLLAB_LEAD_ERROR,
  COLLAB_LEAD_SUCCESS,
  DELETE_LEAD_BEGIN,
  DELETE_LEAD_ERROR,
  DELETE_LEAD_SUCCESS,
  FOLLOWUP_LEAD_BEGIN,
  FOLLOWUP_LEAD_ERROR,
  FOLLOWUP_LEAD_SUCCESS,
  GET_END_MEETING_BEGIN,
  GET_END_MEETING_ERROR,
  GET_END_MEETING_SUCCESS,
  GET_LEAD_BEGIN,
  GET_LEAD_ERROR,
  GET_LEAD_SUCCESS,
  GET_SALESPERSON_SUCCESS,
  GET_START_MEETING_BEGIN,
  GET_START_MEETING_ERROR,
  GET_START_MEETING_SUCCESS,
  UPDATE_LEAD_BEGIN,
  UPDATE_LEAD_ERROR,
  UPDATE_LEAD_SUCCESS,
} from '../Utils/action';
import {
  ACCEPT_HEADER,
  createlead_url,
  endmeeting_against_lead_url,
  getlead_url,
  getsalesperson_url,
  leadassign_url,
  leadcollaborator_url,
  leaddelete_url,
  leadfollowup_url,
  startmeeting_against_lead_url,
  updatelead_url,
} from '../Utils/BaseUrl';

const Leadcontext = React.createContext();
const initialState = {
  lead_loading: false,
  leadlist: [],
  salespersonlist: [],
  deletelead_loading: false,
  assign_loading: false,
  collab_loading: false,
  followup_loading: false,
  createlead_loading: false,
  startmeeting_loading: false,
  endmeeting_loading: false,
};

export const Leadprovider = ({children}) => {
  const [state, dispatch] = useReducer(Lead_reducers, initialState);
  const {setLogout} = useLoginContext();

  const GetLeadList = async props => {
    var Token = await AsyncStorage.getItem('token');
    dispatch({type: GET_LEAD_BEGIN});
    axios
      .get(getlead_url, {
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
            dispatch({type: GET_LEAD_SUCCESS, payload: res.data.data});
        }
      })
      .catch(err => {
        dispatch({type: GET_LEAD_ERROR});
      });
  };

  const Getsalesperson = async props => {
    var Token = await AsyncStorage.getItem('token');
    axios
      .get(getsalesperson_url, {
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
            dispatch({type: GET_SALESPERSON_SUCCESS, payload: res.data.data});
        }
      })
      .catch(err => {
        console.log('getsalesperson_url err', err);
      });
  };

  const DeleteApi = async (formdata, props) => {
    var Token = await AsyncStorage.getItem('token');
    dispatch({type: DELETE_LEAD_BEGIN});
    axios
      .post(leaddelete_url, formdata, {
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
            dispatch({type: DELETE_LEAD_SUCCESS});
            SimpleToast.show(res.data.message);
            GetLeadList(props);
          }
        }
      })
      .catch(err => {
        dispatch({type: DELETE_LEAD_ERROR});
      });
  };

  const AddAssign = async (formdata, props) => {
    var Token = await AsyncStorage.getItem('token');
    dispatch({type: ASSIGN_LEAD_BEGIN});
    axios
      .post(leadassign_url, formdata, {
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
            dispatch({type: ASSIGN_LEAD_SUCCESS});
            SimpleToast.show(res.data.message);
            GetLeadList(props);
          } else {
            dispatch({type: ASSIGN_LEAD_ERROR});
            SimpleToast.show(res.data.message);
          }
        }
      })
      .catch(err => {
        dispatch({type: ASSIGN_LEAD_ERROR});
      });
  };

  const AddCollaborator = async (formdata, props) => {
    var Token = await AsyncStorage.getItem('token');
    dispatch({type: COLLAB_LEAD_BEGIN});
    axios
      .post(leadcollaborator_url, formdata, {
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
            dispatch({type: COLLAB_LEAD_SUCCESS});
            SimpleToast.show(res.data.message);
            GetLeadList(props);
          } else {
            dispatch({type: COLLAB_LEAD_ERROR});
            SimpleToast.show(res.data.message);
          }
        }
      })
      .catch(err => {
        dispatch({type: COLLAB_LEAD_ERROR});
      });
  };

  const AddFollowUp = async (formdata, props) => {
    var Token = await AsyncStorage.getItem('token');
    dispatch({type: FOLLOWUP_LEAD_BEGIN});
    axios
      .post(leadfollowup_url, formdata, {
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
            dispatch({type: FOLLOWUP_LEAD_SUCCESS});
            SimpleToast.show(res.data.message);
            GetLeadList(props);
          } else {
            dispatch({type: FOLLOWUP_LEAD_ERROR});
            SimpleToast.show(res.data.message);
          }
        }
      })
      .catch(err => {
        dispatch({type: FOLLOWUP_LEAD_ERROR});
      });
  };

  const createLead = async (formdata, props) => {
    var Token = await AsyncStorage.getItem('token');
    dispatch({type: ADD_LEAD_BEGIN});
    axios
      .post(createlead_url, formdata, {
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
            dispatch({type: ADD_LEAD_SUCCESS});
            props.navigation.goBack(null);
            SimpleToast.show(res.data.message);
            GetLeadList(props);
          } else {
            dispatch({type: ADD_LEAD_ERROR});
            SimpleToast.show(res.data.message);
          }
        }
      })
      .catch(err => {
        dispatch({type: ADD_LEAD_ERROR});
      });
  };

  const updateLead = async (formdata, props) => {
    var Token = await AsyncStorage.getItem('token');
    dispatch({type: UPDATE_LEAD_BEGIN});
    axios
      .post(updatelead_url, formdata, {
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
            dispatch({type: UPDATE_LEAD_SUCCESS});
            props.navigation.goBack(null);
            SimpleToast.show(res.data.message);
            GetLeadList(props);
          } else {
            dispatch({type: UPDATE_LEAD_ERROR});
            SimpleToast.show(res.data.message);
          }
        }
      })
      .catch(err => {
        dispatch({type: UPDATE_LEAD_ERROR});
      });
  };

  const startmeeting = async (formdata, props) => {
    var Token = await AsyncStorage.getItem('token');
    dispatch({type: GET_START_MEETING_BEGIN});
    axios
      .post(startmeeting_against_lead_url, formdata, {
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
            dispatch({type: GET_START_MEETING_SUCCESS});
            SimpleToast.show(res.data.message);
            GetLeadList(props);
          } else {
            dispatch({type: GET_START_MEETING_ERROR});
            SimpleToast.show(res.data.message);
          }
        }
      })
      .catch(err => {
        console.log('err', JSON.stringify(err, null, 2));
        dispatch({type: GET_START_MEETING_ERROR});
      });
  };

  const endmeeting = async (formdata, props) => {
    var Token = await AsyncStorage.getItem('token');
    dispatch({type: GET_END_MEETING_BEGIN});
    axios
      .post(endmeeting_against_lead_url, formdata, {
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
            dispatch({type: GET_END_MEETING_SUCCESS});
            SimpleToast.show(res.data.message);
            GetLeadList(props);
          } else {
            dispatch({type: GET_END_MEETING_ERROR});
            SimpleToast.show(res.data.message);
          }
        }
      })
      .catch(err => {
        console.log('err', JSON.stringify(err, null, 2));

        dispatch({type: GET_START_MEETING_ERROR});
      });
  };

  return (
    <Leadcontext.Provider
      value={{
        ...state,
        GetLeadList,
        Getsalesperson,
        DeleteApi,
        AddAssign,
        AddCollaborator,
        AddFollowUp,
        createLead,
        updateLead,
        startmeeting,
        endmeeting,
      }}>
      {children}
    </Leadcontext.Provider>
  );
};

export const useLeadContext = () => {
  return useContext(Leadcontext);
};
