//import { SubmissionError } from 'redux-form';
import { transferConstants } from './constants';
import { transferService } from '../services/TransferServices';

const submitTransfer = trans => (dispatch) => {
	//window.alert(`You submitted2:\n\n${JSON.stringify(trans, null, 2)}`);
	//console.log( JSON.stringify(trans, null, 2));

    if(!localStorage.getItem('userToken')){
        dispatch(transferPostFailure("User token missing"));
    }
    
    trans.userToken = localStorage.getItem('userToken');
    let options = {
        method: 'POST', // *GET, POST, PUT, DELETE, etc.
        headers: { 
                'Content-Type':'application/x-www-form-urlencoded',
                'Access-Control-Allow-Origin': '*'
               },
        body: JSON.stringify(trans)         
    };

    let url = 'http://localhost:8000/api/payout/transfer_method'

    dispatch(transferPostStarted());
    
    return transferService.transferData(url, options)
        .then(response => {
           // console.log("TSUCCESS", response)            
            if(response.data){
              dispatch(transferPostSuccess(response.data))
            }else{
              dispatch(transferPostFailure(error));
            }
        }).catch(error => {
            //console.log("TERROR", error)
            dispatch(transferPostFailure(error));
            //throw (error);
        }); 
};

const transferPostSuccess = userId => {
    //console.log("TSuccess");
    return {
      type: transferConstants.TRANSFER_SUCCESS,
      payload: {
          userId
      }

}};

const transferPostStarted = () => {
    //console.log("TRequest");
  return {type: transferConstants.TRANSFER_REQUEST}
};

const transferPostFailure = error => {
    //console.log("TFailed");
    return  {
      type: transferConstants.TRANSFER_FAILURE,
      payload: {
        error
    }
  }
};


export const transferActions = {
    submitTransfer
};