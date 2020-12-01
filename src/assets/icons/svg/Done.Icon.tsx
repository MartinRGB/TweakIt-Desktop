import React from "react";
import { Icon } from '@Types';

const Done: Icon = ({style}) => {
  return (
    <svg 
    width={16} 
    height={16} 
    viewBox="0 0 16 16"
    style={{ ...style }}
    xmlns="http://www.w3.org/2000/svg">
      <path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M8 13a5.006 5.006 0 01-5-5v-.1A5 5 0 118 13zM5.706 7.795L5 8.5l2 2 4-4-.704-.71L7 9.085l-1.295-1.29z"
      />
    </svg>
  );
}

export default Done;