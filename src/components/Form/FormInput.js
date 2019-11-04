import React from 'react';
import PropTypes from 'prop-types';

const style = {
  display: "block"
};

const FormInput = (props) => {
  return (
      <input
        style={style}
        {...props}
      />
  )
};

FormInput.propTypes = {
  type: PropTypes.string.isRequired
};

export default FormInput;