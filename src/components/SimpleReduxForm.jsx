import React, { Component } from 'react';
import { reduxForm, Field } from 'redux-form';

const MyInput = ({ input: { value, onChange } }) => <input value={value} onChange={onChange} />;

// Form Component
class FormComponent extends Component {
  render() {

    return (
      <form onSubmit={this.props.handleSubmit}>
        <Field name="name" component={MyInput} />
        <Field name="pwd" component={MyInput} />
        <button type="submit">送出</button>
      </form>
    );
  }
}

export default reduxForm({
  form: 'simpleForm'
})(FormComponent);
