import React from "react";
import { Icon } from '@Types';

const ExpandedArrow: Icon = ({style}) => {
  return (
    <svg 
    width={16} 
    height={16} 
    viewBox="0 0 16 16"
    style={{ ...style }}
    xmlns="http://www.w3.org/2000/svg">
      <path d="M3.333 5.333L8 12.667l4.667-7.334H3.333z"/>
    </svg>
  );
}

export default ExpandedArrow;