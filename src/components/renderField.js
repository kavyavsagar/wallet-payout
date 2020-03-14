import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';
import MenuItem from '@material-ui/core/MenuItem';
import Select from '@material-ui/core/Select';
import FormControl from '@material-ui/core/FormControl';
import InputLabel from '@material-ui/core/InputLabel';

// Styles
const useStyles = makeStyles(theme => ({
  formControl: {
    margin: theme.spacing(1),
    minWidth: '100%',
  },
  selectEmpty: {
    marginTop: theme.spacing(2),
  },
}));

// validations
const required = value => value ? undefined : 'Required'
const email = value => value && !/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(value) ? 'Invalid email address' : undefined

// Form fields
const renderField = ({ input, type, label, autoComplete, meta: { touched, error} }) => {

  return(
    <div>
     <TextField
      required
      {...input} 
      type={type}
      label={label}
      fullWidth
      autoComplete={autoComplete} 
      />
      {touched && (error && <span className="alert-danger">{error}</span>) }
    </div>    
)}



const regions = {
          "AL"  : "Albama",
          "CA"  : "California",
          "NY"  : "New York",
          "OH"  : "Oho"
          };
const renderStateSelect = ({ input, meta: { touched, error } }) =>{

  let classes = useStyles();
  
  let options = [];
  for (let [key, value] of Object.entries(regions)) {
    options.push(<MenuItem value={key} key={key}>{value}</MenuItem>)
  }

  return(
  <div>
    <FormControl className={classes.formControl}>
      <InputLabel id="region-select-label">State/Province/Regions</InputLabel>
      <Select
        labelId="region-select-label"
        id="region-select"
        {...input}         
        required
      >     
        {options}
      </Select>
    </FormControl> 
    {touched && error && <span className="alert-danger">{error}</span>}
  </div>
)};  


const acctype = {"CHECKING" : "Checking",
                 "SAVINGS" : "Savings"};

const renderAccountSelect = ({ input, meta: { touched, error } }) => {
  let classes = useStyles();

  let options = [];
  for (let [key, value] of Object.entries(acctype)) {
    options.push(<MenuItem value={key} key={key}>{value}</MenuItem>)
  }

  return (<div>
    <FormControl className={classes.formControl}>
      <InputLabel id="account-type-select-label">Account Type</InputLabel>
      <Select
        labelId="account-type-select-label"
        id="account-select"
        {...input}         
        required
      >     
        {options}
      </Select>
    </FormControl>  

    {touched && error && <span className="alert-danger">{error}</span>}
  </div>)
};

const apurpose = {"GP0001" : "Bonus",
                 "GP0002" : "Commission",
                 "GP0003" : "Expense",
                 "GP0004" : "Non-Taxable Payment",
                 "GP0005" : "Income",
                 "GP0006" : "Pension",
                 "GP0007" : "Charity Donation"
               };

const renderPurposeSelect = ({ input, meta: { touched, error } }) => {
  let classes = useStyles();
  let options = [];

  for (let [key, value] of Object.entries(apurpose)) {
    options.push(<MenuItem value={key} key={key}>{value}</MenuItem>)
  }

  return (<div>
    <FormControl className={classes.formControl}>
      <InputLabel id="purpose-type-select-label">Purpose</InputLabel>
      <Select
        labelId="purpose-type-select-label"
        id="purpose-select"
        {...input}         
        required
      >     
        {options}
      </Select>
    </FormControl>  

    {touched && error && <span className="alert-danger">{error}</span>}
  </div>)
};

// export 
export const formFields = {
  renderField,
  renderStateSelect,
  renderAccountSelect,
  renderPurposeSelect
}

export const formFieldValid = {
  required,
  email
}