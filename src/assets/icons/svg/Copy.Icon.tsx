import React from "react";
import { Icon } from '@Types';

const Copy: Icon = ({style}) => {
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
        d="M9 13H4a.967.967 0 01-1-1V7a.967.967 0 011-1h2V4a.967.967 0 011-1h5a.967.967 0 011 1v5a.968.968 0 01-1 1h-2v2a.968.968 0 01-1 1zM4 7v5h5v-2H7a.968.968 0 01-1-1V7H4zm3-3v5h5V4H7z"
      />
    </svg>
  );
}

export default Copy;