import React from 'react';
import _ from 'lodash';

const MyInput = ({ input, meta: { error, touched }, label, type='text', ...others }) => {
  const custom = _.pick(others, ['placeholder', 'maxLength']);
  return (
    <div>
      <label>{label}</label>
      <input {...custom} {...input} type={type} />
      {(touched && error) && <span style={{ color: 'red' }}>{error}</span>}
    </div>
  );
};

export default MyInput;
