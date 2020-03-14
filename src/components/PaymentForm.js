import React from 'react';
import { Field, reduxForm } from 'redux-form';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import Grid from '@material-ui/core/Grid';
import {formFields, formFieldValid} from './renderField';
import { paymentActions as pa} from '../actions/PaymentActions';
import { connect } from 'react-redux'
import { withStyles } from '@material-ui/core/styles';
import CircularProgress from '@material-ui/core/CircularProgress';

const ColorCircularProgress = withStyles({
  root: {
    color: '#4058b5',
  },
})(CircularProgress);

const paymentMethod = (values, dispatch) => {
  return dispatch(pa.submitPayment(values));
}

const PaymentForm = props => {

  const {error, handleSubmit, pristine, reset, submitting, 
    submitSucceeded, onSubmit, isPayment, loading} = props;

  (isPayment !== false && submitSucceeded !== false)? onSubmit(): '';

  return (
    <React.Fragment>
      <Typography variant="h6" gutterBottom>
        Make Payment
      </Typography>
      <form onSubmit={handleSubmit(paymentMethod)} noValidate>
      <Grid container spacing={3}>
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
            name="paymentid"           
            type="text"
            component={formFields.renderField}
            label="Client PaymentId" 
            validate={formFieldValid.required}
            autoComplete="paymentid"
          />
        </Grid>
        <Grid item xs={12} md={6}>         
          <Field
            name="amount"           
            type="text"
            component={formFields.renderField}
            label="Amount" 
            validate={formFieldValid.required}
            autoComplete="amount"
          />
        </Grid>  
        <Grid item xs={12} md={6}>        
          <Field name="purpose" validate={formFieldValid.required} component={formFields.renderPurposeSelect} />
        </Grid>
        <Grid item xs={12} sm={6}>
          <Button 
            type="submit"
            variant="contained"
            color="primary">
            Finish Payout
          </Button>
        </Grid>
        <Grid item xs={12} sm={6}>
          {loading? <ColorCircularProgress size={30} thickness={5} />: ''} 
          { (submitSucceeded && !isPayment)?<span className="alert-danger">Payment failed!</span>: ''}
        </Grid>
      </Grid>
      </form>
    </React.Fragment>
  );
}


const mapStateToProps = (state) => {
  return {   
    loading: state.paymentFormReducer.loading,
    isPayment: state.paymentFormReducer.isPayment
  } 
}

const payForm =  reduxForm({
  form: 'paymentform', // a unique identifier for this form
  paymentMethod,
  initialValues:{currency: "USD" },

})(PaymentForm);

// You have to connect() to any reducers that you wish to connect to yourself
export default connect(mapStateToProps)(payForm);