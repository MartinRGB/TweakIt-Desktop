import React from "react";
import { Icon } from '@Types';

const VolumeUp: Icon = ({style}) => {
  return (
    <svg 
    width={16} 
    height={16} 
    viewBox="0 0 16 16"
    style={{ ...style }}
    xmlns="http://www.w3.org/2000/svg">
      <path
        d="M4 6.885v3h2l2.5 2.5v-8L6 6.885H4zm6.75 1.5c0-.882-.51-1.645-1.25-2.013V10.4a2.253 2.253 0 001.25-2.015zM9.5 4v1.032a3.5 3.5 0 010 6.706v1.032A4.499 4.499 0 0013 8.385 4.499 4.499 0 009.5 4z"
      />
    </svg>
  );
}

export default VolumeUp;