//import { SubmissionError } from 'redux-form';
import { userConstants } from './constants';
import { userService } from '../services/UserServices';

const submitUser = user => (dispatch) => {
	//window.alert(`You submitted2:\n\n${JSON.stringify(user, null, 2)}`);
	//console.log( JSON.stringify(user, null, 2));
    
    if(!localStorage.getItem('userId')){
        dispatch(transferPostFailure("User id missing"));
    }

    user.userid =  localStorage.getItem('userId')
    let options = {
        method: 'POST', // *GET, POST, PUT, DELETE, etc.
        headers: { 
                'Content-Type':'application/x-www-form-urlencoded',
                'Access-Control-Allow-Origin': '*'
               },
        body: JSON.stringify(user)         
    };
    let url = 'http://localhost:8000/api/payout/create_user'

    dispatch(userSubmitStarted());
    
    return userService.postData(url, options)
        .then(response => {
           // console.log("SUCCESS", response)
            if(response.data){
              localStorage.setItem('userToken', response.data);
              dispatch(userSubmitSuccess(response.data))
            }else{
              dispatch(userSubmitFailure(error));
            }
        }).catch(error => {
            //console.log("ERROR", error)
            dispatch(userSubmitFailure(error));
            //throw (error);
        }); 
};

const userSubmitSuccess = userId => {
   // console.log("Success");
    return {
      type: userConstants.USER_CREATE_SUCCESS,
      payload: {
          userId
      }

}};

const userSubmitStarted = () => {
  //  console.log("Request");
  return {type: userConstants.USER_CREATE_REQUEST}
};

const userSubmitFailure = error => {
   // console.log("Failed");
    return  {
      type: userConstants.USER_CREATE_FAILURE,
      payload: {
        error
    }
  }
};

/************************************************/

const fetchUser = userid => (dispatch) => {
  //window.alert(`You submitted2:\n\n${JSON.stringify(user, null, 2)}`);
  //console.log( userid);

  let url = `http://localhost:8000/api/payout/user/${userid}`
 
  dispatch(userGetStarted());
    
  return userService.getData(url)
      .then(response => {
          //console.log("SUCCESS", response)
          if(response.data){
            localStorage.setItem('userId', userid);

            let param = {
                        firstname: response.data.first_name, 
                        lastname: response.data.last_name,
                        email: response.data.email, 
                        country: "US"
                      };

            dispatch(userGetSuccess(param))
          }else{
            dispatch(userGetFailure(error));
          }
      }).catch(error => {
          console.log("ERROR", error)
          dispatch(userGetFailure(error));
          //throw (error);
      });  
};

const userGetSuccess = param => {
    //console.log("Success");
    return {
      type: userConstants.USER_GET_SUCCESS,
      payload: param

}};
const userGetStarted = () => {
    //console.log("Request");
    return {type: userConstants.USER_GET_REQUEST}
};

const userGetFailure = error => {
    //console.log("Failed");
    return  {
      type: userConstants.USER_GET_FAILURE,
      payload: {
        error
    }
  }
};

/************************************/

export const userActions = {
    submitUser,
    fetchUser
};