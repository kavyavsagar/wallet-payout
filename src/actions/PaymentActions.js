// import { SubmissionError } from 'redux-form';
import { paymentConstants } from './constants';
import { paymentService } from '../services/PaymentServices';

const submitPayment = pay => (dispatch) => {
	//window.alert(`You submitted2:\n\n${JSON.stringify(pay, null, 2)}`);
	//console.log( JSON.stringify(pay, null, 2));

    if(!localStorage.getItem('userToken')){
        dispatch(paymentPostFailure("User token missing"));
    }
    
    pay.userToken = localStorage.getItem('userToken');
    let options = {
        method: 'POST', // *GET, POST, PUT, DELETE, etc.
        headers: { 
                'Content-Type':'application/x-www-form-urlencoded',
                'Access-Control-Allow-Origin': '*'
               },
        body: JSON.stringify(pay)         
    };
    let url = 'http://localhost:8000/api/payout/payment_transfer'

    dispatch(paymentPostStarted());
    
    return paymentService.paymentData(url, options)
        .then(response => {
            //console.log("PSUCCESS", response)            
            if(response.data){
              localStorage.removeItem('userToken');
              dispatch(paymentPostSuccess(response.data))
            }else{
              dispatch(paymentPostFailure(error));
            }
        }).catch(error => {
           // console.log("PERROR", error)
            dispatch(paymentPostFailure(error));
            //throw (error);
        }); 
};

const paymentPostSuccess = userId => {
   // console.log("PSuccess");
    return {
      type: paymentConstants.PAYMENT_SUCCESS,
      payload: {
          userId
      }

}};

const paymentPostStarted = () => {
  //  console.log("PRequest");
  return {type: paymentConstants.PAYMENT_REQUEST}
};

const paymentPostFailure = error => {
    //console.log("PFailed");
    return  {
      type: paymentConstants.PAYMENT_FAILURE,
      payload: {
        error
    }
  }
};


export const paymentActions = {
    submitPayment
};