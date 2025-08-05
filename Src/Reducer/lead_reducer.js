import {
  ADD_LEAD_BEGIN,
  ADD_LEAD_ERROR,
  ADD_LEAD_SUCCESS,
  ASSIGN_LEAD_BEGIN,
  ASSIGN_LEAD_ERROR,
  ASSIGN_LEAD_SUCCESS,
  CANCEL_ASSIGN_BEGIN,
  CANCEL_ASSIGN_ERROR,
  CANCEL_ASSIGN_SUCCESS,
  COLLAB_LEAD_BEGIN,
  COLLAB_LEAD_ERROR,
  COLLAB_LEAD_SUCCESS,
  CONVERT_CUSTOMER_BEGIN,
  CONVERT_CUSTOMER_ERROR,
  CONVERT_CUSTOMER_SUCCESS,
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
  REMOVE_COLLABORATOR_BEGIN,
  REMOVE_COLLABORATOR_ERROR,
  REMOVE_COLLABORATOR_SUCCESS,
  UPDATE_LEAD_BEGIN,
  UPDATE_LEAD_ERROR,
  UPDATE_LEAD_SUCCESS,
} from '../Utils/action';

const Lead_reducers = (state, action) => {
  switch (action.type) {
    case GET_LEAD_BEGIN:
      return {
        ...state,
        lead_loading: true,
      };

    case GET_LEAD_SUCCESS:
      return {
        ...state,
        lead_loading: false,
        leadlist: action.payload,
      };

    case GET_LEAD_ERROR:
      return {
        ...state,
        lead_loading: false,
      };

    case GET_SALESPERSON_SUCCESS:
      return {
        ...state,
        salespersonlist: action.payload,
      };

    case DELETE_LEAD_BEGIN:
      return {
        ...state,
        deletelead_loading: true,
      };

    case DELETE_LEAD_SUCCESS:
      return {
        ...state,
        deletelead_loading: false,
      };

    case DELETE_LEAD_ERROR:
      return {
        ...state,
        deletelead_loading: false,
      };

    case ASSIGN_LEAD_BEGIN:
      return {
        ...state,
        assign_loading: true,
      };

    case ASSIGN_LEAD_SUCCESS:
      return {
        ...state,
        assign_loading: false,
      };

    case ASSIGN_LEAD_ERROR:
      return {
        ...state,
        assign_loading: false,
      };

    case COLLAB_LEAD_BEGIN:
      return {
        ...state,
        collab_loading: true,
      };

    case COLLAB_LEAD_SUCCESS:
      return {
        ...state,
        collab_loading: false,
      };

    case COLLAB_LEAD_ERROR:
      return {
        ...state,
        collab_loading: false,
      };

    case FOLLOWUP_LEAD_BEGIN:
      return {
        ...state,
        followup_loading: true,
      };

    case FOLLOWUP_LEAD_SUCCESS:
      return {
        ...state,
        followup_loading: false,
      };

    case FOLLOWUP_LEAD_ERROR:
      return {
        ...state,
        followup_loading: false,
      };

    case ADD_LEAD_BEGIN:
      return {
        ...state,
        createlead_loading: true,
      };

    case ADD_LEAD_SUCCESS:
      return {
        ...state,
        createlead_loading: false,
      };

    case ADD_LEAD_ERROR:
      return {
        ...state,
        createlead_loading: false,
      };

    case UPDATE_LEAD_BEGIN:
      return {
        ...state,
        createlead_loading: true,
      };

    case UPDATE_LEAD_SUCCESS:
      return {
        ...state,
        createlead_loading: false,
      };

    case UPDATE_LEAD_ERROR:
      return {
        ...state,
        createlead_loading: false,
      };

    case GET_START_MEETING_BEGIN:
      return {
        ...state,
        startmeeting_loading: true,
      };

    case GET_START_MEETING_SUCCESS:
      return {
        ...state,
        startmeeting_loading: false,
      };

    case GET_START_MEETING_ERROR:
      return {
        ...state,
        startmeeting_loading: false,
      };

    case GET_END_MEETING_BEGIN:
      return {
        ...state,
        endmeeting_loading: true,
      };

    case GET_END_MEETING_SUCCESS:
      return {
        ...state,
        endmeeting_loading: false,
      };

    case GET_END_MEETING_ERROR:
      return {
        ...state,
        endmeeting_loading: false,
      };

    case CANCEL_ASSIGN_BEGIN:
      return {
        ...state,
        cancel_assign_loading: true,
      };

    case CANCEL_ASSIGN_SUCCESS:
      return {
        ...state,
        cancel_assign_loading: false,
      };

    case CANCEL_ASSIGN_ERROR:
      return {
        ...state,
        cancel_assign_loading: false,
      };

    case REMOVE_COLLABORATOR_BEGIN:
      return {
        ...state,
        remove_collaborator_loading: true,
      };

    case REMOVE_COLLABORATOR_SUCCESS:
      return {
        ...state,
        remove_collaborator_loading: false,
      };

    case REMOVE_COLLABORATOR_ERROR:
      return {
        ...state,
        remove_collaborator_loading: false,
      };

    case CONVERT_CUSTOMER_BEGIN:
      return {
        ...state,
        convert_customer_loading: true,
      };

    case CONVERT_CUSTOMER_SUCCESS:
      return {
        ...state,
        convert_customer_loading: false,
      };

    case CONVERT_CUSTOMER_ERROR:
      return {
        ...state,
        convert_customer_loading: false,
      };

    default:
      return {...state};
  }
};

export default Lead_reducers;
