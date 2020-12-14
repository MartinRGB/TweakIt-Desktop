import React from "react";
import { Icon } from '@Types';

const VolumeDown: Icon = ({style}) => {
  return (
    <svg 
    width={16} 
    height={16} 
    viewBox="0 0 16 16"
    style={{ ...style }}
    xmlns="http://www.w3.org/2000/svg">
      <path
        d="M11.75 8c0-.883-.51-1.645-1.25-2.013v4.028A2.253 2.253 0 0011.75 8zM5 6.5v3h2L9.5 12V4L7 6.5H5z"
      />
    </svg>
  );
}

export default VolumeDown;