import React from 'react';

const FormResult = (props) => {
  const { data } = props;
  console.log(data.length);
  if (data && data.length) {
    return (
      <>
        {
          data.map(item => 
            <button key={item}>{ item.name }</button>
          )
        }
      </>
    );  
  }
  return null;
};

export default FormResult;