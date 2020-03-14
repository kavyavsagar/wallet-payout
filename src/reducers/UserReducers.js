import { userConstants } from '../actions/constants';

const initialState = {
  loading: false,
  userdata: {},
  showerror: null,
  isUser: false
};

export const userFormReducer = (state = initialState, action)=>  {

  switch (action.type) {
      case userConstants.USER_CREATE_REQUEST:        
          return Object.assign(
            {}, state, 
            {
              loading: true
            })

      case userConstants.USER_CREATE_SUCCESS:
          return Object.assign(
            {}, state, 
            {
              loading: false,
              showerror: (!action.payload)? "Create User Failed !":null,
              userdata: action.payload,
              isUser: (action.payload)?true: false
            })
       
      case userConstants.USER_CREATE_FAILURE:          
          return Object.assign(
            {}, state, 
            {
              loading: false,
              showerror: (!action.payload.error)? "Create User Failed !":action.payload.error
            })
      default:
          return state
  }
}

const initialUserState = {
  loading: false,
  data: {}
};

export const userGetReducer = (state = initialUserState, action)=>  {

  switch (action.type) {
      case userConstants.USER_GET_REQUEST:        
          return Object.assign(
            {}, state, 
            {
              loading: true
            })

      case userConstants.USER_GET_SUCCESS:
          return Object.assign(
            {}, state, 
            {
              loading: false,
              data: action.payload
            })
       
      case userConstants.USER_GET_FAILURE:          
          return Object.assign(
            {}, state, 
            {
              loading: false
            })
      default:
          return state
  }
}