import React from "react";
import { Icon } from '@Types';

const DownSelect: Icon = ({style}) => {
  return (
    <svg 
    width={16} 
    height={16} 
    viewBox="0 0 16 16"
    style={{ ...style }}
    xmlns="http://www.w3.org/2000/svg">
      <path
        d="M8.005 9.713l3.005-3.005L10.303 6 8.005 8.3 5.707 6 5 6.707l3.005 3.006z"
      />
    </svg>
  );
}

export default DownSelect;