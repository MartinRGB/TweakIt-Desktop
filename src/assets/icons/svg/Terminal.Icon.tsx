import React from "react";
import { Icon } from '@Types';

const Terminal: Icon = ({style}) => {
  return (
    <svg 
    width={16} 
    height={16} 
    viewBox="0 0 16 16"
    style={{ ...style }}
    xmlns="http://www.w3.org/2000/svg">
      <path
        d="M5.707 10L5 9.293l1.146-1.146L5 7l.707-.707 1.854 1.854L5.707 10zM11 10H8V9h3v1z"

      />
      <path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M3 11a1 1 0 001 1h8a1 1 0 001-1V5a1 1 0 00-1-1H4a1 1 0 00-1 1v6zm1.25-.25V5.2l7.5.05v5.5h-7.5z"

      />
    </svg>
  );
}

export default Terminal;