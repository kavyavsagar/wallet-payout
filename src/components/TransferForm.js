import React from 'react';
import { Field, reduxForm } from 'redux-form';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import Grid from '@material-ui/core/Grid';
import {formFields, formFieldValid} from './renderField';
import { transferActions as ta} from '../actions/TransferActions';
import { connect } from 'react-redux'
import { withStyles } from '@material-ui/core/styles';
import CircularProgress from '@material-ui/core/CircularProgress';

const ColorCircularProgress = withStyles({
  root: {
    color: '#4058b5',
  },
})(CircularProgress);

const transferMethod = (values, dispatch) => {
  return dispatch(ta.submitTransfer(values));
}

const TransferForm = props => {

  const {error, handleSubmit, pristine, reset, loading, 
    submitting, submitSucceeded,isTransfer, onSubmit} = props;
 
  (isTransfer !== false && submitSucceeded !== false)? onSubmit(): '';

  return (
    <React.Fragment>
      <Typography variant="h6" gutterBottom>
        Transfer Method
      </Typography>
      <form onSubmit={handleSubmit(transferMethod)} noValidate>
      <Grid container spacing={3}>
        <Grid item xs={12} md={6}>
          <Field
            name="transfer_country"           
            type="text"
            component={formFields.renderField}
            label="Transfer Country" 
            validate={formFieldValid.required}
            autoComplete="transfer-country"
          />  
        </Grid>
        <Grid item xs={12} md={6}>
          <Field
            name="currency"           
            type="text"
            component={formFields.renderField}
            label="Currency" 
            validate={formFieldValid.required}
            autoComplete="currency"
          />
        </Grid>
        <Grid item xs={12} md={6}>
          <Field
            name="transfertype"           
            type="text"
            component={formFields.renderField}
            label="Transfer Type" 
            validate={formFieldValid.required}
            autoComplete="transfertype"
          />
        </Grid>
        <Grid item xs={12} md={6}>         
          <Field
            name="branchId"           
            type="number"
            component={formFields.renderField}
            label="Routing Number" 
            validate={formFieldValid.required}
            autoComplete="branchId"
          />
        </Grid>
        <Grid item xs={12} md={6}>
          <Field
            name="bankAccountId"           
            type="number"
            component={formFields.renderField}
            label="Account Number" 
            validate={formFieldValid.required}
            autoComplete="bankAccountId"
          />
        </Grid>
        <Grid item xs={12} md={6}>        
          <Field name="bankAccountPurpose" validate={formFieldValid.required} component={formFields.renderAccountSelect} />
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
          { (submitSucceeded && !isTransfer)?<span className="alert-danger">Transfer Method failed!</span>: ''}
        </Grid> 
      </Grid>
      </form>
    </React.Fragment>
  );
}


const mapStateToProps = (state) => {
  return {   
    loading: state.transferFormReducer.loading,
    isTransfer: state.transferFormReducer.isTransfer
  } 
}

const transForm =  reduxForm({
  form: 'transferform', // a unique identifier for this form
  transferMethod,
  initialValues:{transfer_country: "US", currency: "USD", transfertype: "BANK_ACCOUNT"  },
  // destroyOnUnmount: false, // <------ preserve form data
  // forceUnregisterOnUnmount: true, // <------ unregister fields on unmount
})(TransferForm);

// You have to connect() to any reducers that you wish to connect to yourself
export default connect(mapStateToProps)(transForm);