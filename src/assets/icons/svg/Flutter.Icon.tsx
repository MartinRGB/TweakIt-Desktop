import React from "react";
import { Icon } from '@Types';

const Flutter: Icon = ({style}) => {
  return (
    <svg 
    width={16} 
    height={16} 
    viewBox="0 0 16 16"
    style={{ ...style }}
    xmlns="http://www.w3.org/2000/svg">
      <path d="M4.523 9.496L3 7.974 7.988 3h3.03L4.524 9.496zm.799.818l2.682-2.682h3.015l-2.662 2.662L11.07 13H8.06l-1.21-1.201-.005.005-1.524-1.49z"/>  
    </svg>
  );
}

export default Flutter;