import React from "react";
import { Icon } from '@Types';

const DesignTools: Icon = ({style}) => {
  return (
    <svg 
    width={16} 
    height={16} 
    viewBox="0 0 16 16"
    style={{ ...style }}
    xmlns="http://www.w3.org/2000/svg">
      <path
        d="M7.954 10.815l4.505-4.504-1.06-1.061-3.445 3.448L4.51 5.25 3.45 6.31l4.504 4.505z"
      />
    </svg>
  );
}

export default DesignTools;