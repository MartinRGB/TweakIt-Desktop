import React from "react";
import { Icon } from '@Types';

const Animation: Icon = ({style}) => {
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
        d="M9.5 8a3.5 3.5 0 11-7 0 3.5 3.5 0 017 0zm-1.875 3.465a3.5 3.5 0 000-6.93 3.5 3.5 0 110 6.93zM12.505 8a3.5 3.5 0 01-3.003 3.465 3.5 3.5 0 100-6.93A3.5 3.5 0 0112.505 8z"
      />
    </svg>
  );
}

export default Animation;