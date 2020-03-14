import { transferConstants } from '../actions/constants';

const initialState = {
  loading: false,
  transdata: {},
  error: null,
  isTransfer: false
};

export const transferFormReducer = (state = initialState, action)=>  {

  switch (action.type) {
      case transferConstants.TRANSFER_REQUEST:        
          return Object.assign(
            {}, state, 
            {
              loading: true
            })

      case transferConstants.TRANSFER_SUCCESS:
          return Object.assign(
            {}, state, 
            {
              loading: false,
              error: null,
              transdata: action.payload,
              isTransfer: (action.payload)?true: false
            })
       
      case transferConstants.TRANSFER_FAILURE:          
          return Object.assign(
            {}, state, 
            {
              loading: false,
              error: action.payload
            })
      default:
          return state
  }
}