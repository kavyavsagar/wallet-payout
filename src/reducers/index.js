import { createStore, applyMiddleware, combineReducers } from 'redux'
import thunk from 'redux-thunk'
import { reducer as formReducer } from 'redux-form'
import {userFormReducer, userGetReducer} from './UserReducers'
import {transferFormReducer} from './TransferReducers'
import {paymentFormReducer} from './PaymentReducers'

const rootReducer = combineReducers({
  // ...your other reducers here
  // you have to pass formReducer under 'form' key,
  // for custom keys look up the docs for 'getFormState'  
  form: formReducer,
  userFormReducer,
  userGetReducer,
  transferFormReducer,
  paymentFormReducer
})

const store = createStore(rootReducer, applyMiddleware(thunk))

export default store;