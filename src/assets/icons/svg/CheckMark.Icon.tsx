import React from "react";
import { Icon } from '@Types';

const CheckMark: Icon = ({style}) => {
  return (
    <svg 
    width={16} 
    height={16} 
    viewBox="0 0 16 16"
    style={{ ...style }}
    xmlns="http://www.w3.org/2000/svg">
      <path
        d="M6.35 11.771l-3.3-3.3.943-.942 2.436 2.433-.079-.077 5.657-5.656.942.942-5.656 5.658-.942.942z"
      />
    </svg>
  );
}

export default CheckMark;
