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
        d="M7.993 13L4 9.894l.719-.559 3.27 2.543 3.274-2.547.723.563L7.993 13zm0-1.894L4 8l.719-.559 3.27 2.542 3.274-2.546.723.563-3.993 3.106zm0-1.895L4.723 6.67 4 6.106 7.993 3l3.993 3.106-.728.563-3.265 2.542z"
      />
    </svg>
  );
}

export default DesignTools;