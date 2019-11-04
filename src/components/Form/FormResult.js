import React from 'react';

const FormResult = (props) => {
  const { data } = props;

  if (data && data.length) {
    return (
      <>
        {
          data.map(item => 
            <button key={item.id}>{ item.name }</button>
          )
        }
      </>
    );  
  }
  return null;
};

export default FormResult;