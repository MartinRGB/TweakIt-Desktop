import React from "react";
import { Icon } from '@Types';

const SelectArrow: Icon = ({style}) => {
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
        d="M7.975 12.9l-2.472-2.478.704-.705 1.768 1.768 1.768-1.768.707.707L7.975 12.9zM6.207 6.182L5.5 5.476 7.975 3l2.472 2.478-.704.704-1.768-1.768-1.768 1.768z"
      />
    </svg>
  );
}

export default SelectArrow;