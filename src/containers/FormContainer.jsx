import React from 'react';
import { connect } from 'react-redux';
import * as Actions from '../actions';
import MyFormComponent from '../components/SimpleReduxForm';

// Container
const Container = ({ handleSignIn }) => {
  return (
    <MyFormComponent onSubmit={handleSignIn}/>
  );
}

function mapDispatchToProps(dispatch) {
  return {
    handleSignIn: payload => dispatch(Actions.signIn(payload))
  }
}

export default connect(null, mapDispatchToProps)(Container);
