import React from 'react';
import { relative } from 'upath';

const style = {
  position: 'absolute',
  left: 0,
  margin: 20,
  height: 300,
  overflowY: 'scroll'
}
const FormResult = (props) => {
  const { data, onClick, style: itemStyle } = props;

  if (data && data.length) {
    return (
      <div style={style}>
        {
          data.map(item => 
            <button
              style={itemStyle}
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