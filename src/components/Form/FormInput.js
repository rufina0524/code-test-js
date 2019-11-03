import React from 'react';

const style = {
  display: "block"
};

const FormInput = (props) => {
  return (
    <form onSubmit={props.onSubmit}>
      <input style={style} type="text" name="title" placeholder="Client ID" />
      <input style={style} type="text" name="title" placeholder="Client Secret" />
      <input style={style} type="text" className="form-control" name="title" placeholder="Restaurant Name" />
      <input type="submit" value="Submit" />
    </form>
  )
};

export default FormInput;