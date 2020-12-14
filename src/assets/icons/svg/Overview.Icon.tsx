import React from "react";
import { Icon } from '@Types';

const Overview: Icon = ({style}) => {
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
        d="M4.264 4.067l.003-.003v7.472l-.003-.003h7.472l-.003.003V4.064l.003.003H4.264zm0-1.067h7.472c.588 0 1.064.476 1.064 1.064v7.472c0 .588-.476 1.064-1.064 1.064H4.264A1.064 1.064 0 013.2 11.536V4.064C3.2 3.476 3.676 3 4.264 3z"
      />
    </svg>
  );
}

export default Overview;