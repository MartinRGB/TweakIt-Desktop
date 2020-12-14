import React from "react";
import { Icon } from '@Types';

const Shutdown: Icon = ({style}) => {
  return (
    <svg 
    width={16} 
    height={16} 
    viewBox="0 0 16 16"
    style={{ ...style }}
    xmlns="http://www.w3.org/2000/svg">
      <path
        d="M8.556 3H7.444v5.556h1.112V3zm2.686 1.203l-.786.786A3.88 3.88 0 0111.889 8 3.89 3.89 0 014.11 8a3.88 3.88 0 011.433-3.011l-.786-.786A4.984 4.984 0 003 8a5 5 0 0010 0c0-1.522-.686-2.88-1.758-3.797z"
      />
    </svg>
  );
}

export default Shutdown;