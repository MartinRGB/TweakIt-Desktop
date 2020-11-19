import React from "react";
import { Icon } from '@Types';

const CollapsedArrow: Icon = ({style}) => {
  return (
    <svg 
    width={16} 
    height={16} 
    viewBox="0 0 16 16"
    style={{ ...style }}
    xmlns="http://www.w3.org/2000/svg">
      <path d="M5 12.663l7.333-4.666L5 3.33v9.333z"/>  
    </svg>
  );
}

export default CollapsedArrow;