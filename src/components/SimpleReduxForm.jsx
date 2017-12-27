import React, { Component } from 'react';
import { reduxForm, Field } from 'redux-form';
import SimpleReduxForm from './SimpleReduxForm.css';
// Custom
import MyInput from './adapters/MyInput';

const validate = values => {
  const errors = {};
  if(!values.name) {
    errors.name = 'Required';
  }
  else if(values.name.length < 5) {
    errors.name = `Required at least ${5} chars`;
  }
  if(!values.pwd) {
    errors.pwd = 'Required';
  }
  return errors;
}

// Form Component
class FormComponent extends Component {
  render() {
    return (
      <form onSubmit={this.props.handleSubmit}>
        <Field name="name" component={MyInput} label="Username" placeholder="Puresmash" />
        <Field name="password" type="password" component={MyInput} label="Password" placeholder="******"/>
        <button type="submit">Submit</button>
      </form>
    );
  }
}

export default reduxForm({
  form: 'simpleForm',
  validate
})(FormComponent);
