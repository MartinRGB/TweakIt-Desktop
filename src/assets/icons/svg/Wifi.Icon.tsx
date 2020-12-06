import React from "react";
import { Icon } from '@Types';

const Wifi: Icon = ({style}) => {
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
        d="M3.09 7.333L2 6.243a8.485 8.485 0 0112 0l-1.09 1.09a6.943 6.943 0 00-9.82 0zm1.092 1.091l1.09 1.091a3.858 3.858 0 015.455 0l1.091-1.09a5.4 5.4 0 00-7.636 0zm2.182 2.182L8 12.242l1.636-1.636a2.316 2.316 0 00-3.272 0z"
      />
    </svg>
  );
}

export default Wifi;