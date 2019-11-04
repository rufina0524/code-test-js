import React from 'react';
import { relative } from 'upath';

const style = {
  position: relative,
  left: 0
}
const FormResult = (props) => {
  const { data, onClick } = props;

  if (data && data.length) {
    return (
      <div style={style}>
        {
          data.map(item => 
            <button
              key={item.id}
              id={item.id}
              onClick={onClick}
            >
              { item.name }
            </button>
          )
        }
      </div>
    );  
  }
  return null;
};

export default FormResult;