import { paymentConstants } from '../actions/constants';

const initialState = {
  loading: false,
  paydata: {},
  error: null,
  isPayment: false
};

export const paymentFormReducer = (state = initialState, action)=>  {

  switch (action.type) {
      case paymentConstants.PAYMENT_REQUEST:        
          return Object.assign(
            {}, state, 
            {
              loading: true
            })

      case paymentConstants.PAYMENT_SUCCESS:
          return Object.assign(
            {}, state, 
            {
              loading: false,
              error: null,
              paydata: action.payload,
              isPayment: (action.payload)?true: false
            })
       
      case paymentConstants.PAYMENT_FAILURE:          
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