import React from 'react';
import { Field, reduxForm } from 'redux-form';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import {userActions as ua} from '../actions/UserActions';
import { connect } from 'react-redux'
import {formFields, formFieldValid} from './renderField';
import { withStyles } from '@material-ui/core/styles';
import CircularProgress from '@material-ui/core/CircularProgress';
import { useParams} from "react-router";

const ColorCircularProgress = withStyles({
  root: {
    color: '#4058b5',
  },
})(CircularProgress);

const createUser = (values, dispatch) => {
  return dispatch(ua.submitUser(values));
}


const UserForm = props => {
  const { handleSubmit, pristine, reset, submitting, 
    loading, submitSucceeded, onSubmit, isUser, showerror } = props;

  (submitSucceeded !== false && isUser !== false)? onSubmit(): '';

  let { id } = useParams();
  
  React.useEffect(() => { 
    props.requestUser(id)
     
  }, [id]);


  return (
    <React.Fragment>
      <Typography variant="h6" gutterBottom>
        Create User
      </Typography>      
      <form onSubmit={handleSubmit(createUser)} noValidate>
      <Grid container spacing={3}>      
        <Grid item xs={12} sm={6}>
          <Field
            name="firstname"           
            type="text"
            component={formFields.renderField}
            label="First Name" 
            validate={formFieldValid.required}
            autoComplete="fname"
          /> 
        </Grid>
        <Grid item xs={12} sm={6}>
          <Field
            name="lastname"           
            type="text"
            component={formFields.renderField}
            label="Last Name" 
            validate={formFieldValid.required}
            autoComplete="lname"
          /> 
        </Grid>
        <Grid item xs={12} sm={6}>
          <Field
            name="email"           
            type="email"
            component={formFields.renderField}
            label="Email Address" 
            validate={[formFieldValid.required, formFieldValid.email]}
            autoComplete="email"
          /> 
        </Grid>
        <Grid item xs={12} sm={6}>
          <Field
            name="dob"           
            type="date"
            component={formFields.renderField}
            label="" 
            validate={formFieldValid.required}
            autoComplete="dob"
          /> 
        </Grid>
        <Grid item xs={12}>          
          <Field            
            name="address"
            label="Address line"
            component={formFields.renderField}
            validate={formFieldValid.required}
            autoComplete="address-line"
          /> 
        </Grid>
        <Grid item xs={12} sm={6}>        
          <Field            
            name="city"
            label="City"
            type="text"
            component={formFields.renderField}
            validate={formFieldValid.required}
            autoComplete="city"
          /> 
        </Grid>
        <Grid item xs={12} sm={6}>                    
          <Field name="state" validate={formFieldValid.required} component={formFields.renderStateSelect} />
        </Grid>
        <Grid item xs={12} sm={6}>    
          <Field            
            type="number"
            name="postalcode"
            label="Zip / Postal code"
            component={formFields.renderField}
            validate={formFieldValid.required}
            autoComplete="postal-code"
          />
        </Grid>
        <Grid item xs={12} sm={6}>        
          <Field            
            type="text"
            name="country"
            label="Country"
            component={formFields.renderField}  
            validate={formFieldValid.required}       
            autoComplete="country"
          />
        </Grid>
        <Grid item xs={12} sm={6}>
          <Button 
            type="submit"
            variant="contained"
            color="primary">
            Submit & Continue
          </Button> 
                  
        </Grid> 
        <Grid item xs={12} sm={6}> 
          {loading? <ColorCircularProgress size={30} thickness={5} />: ''}          
          { (submitSucceeded && !isUser)?<span className="alert-danger">Create user failed!</span>: ''}                     
        </Grid> 
      </Grid>
      </form>
    </React.Fragment>
  );
};

const mapStateToProps = (state) => { 
  return {   
    loading: state.userFormReducer.loading,
    showerror: state.userFormReducer.showerror,
    isUser: state.userFormReducer.isUser,
    initialValues: state.userGetReducer.data
  } 
}

const mapDispatchToProps = (dispatch) => {
  return {
    requestUser: (userid) => dispatch(ua.fetchUser(userid))
  }
}

const initForm =  reduxForm({
  form: 'userform', // a unique identifier for this form
  createUser,
  enableReinitialize: true
})(UserForm);

// You have to connect() to any reducers that you wish to connect to yourself
export default connect(mapStateToProps,mapDispatchToProps)(initForm)