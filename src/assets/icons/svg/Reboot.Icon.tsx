import React from "react";
import { Icon } from '@Types';

const Reboot: Icon = ({style}) => {
  return (
    <svg 
    width={16} 
    height={16} 
    viewBox="0 0 16 16"
    style={{ ...style }}
    xmlns="http://www.w3.org/2000/svg">
      <path
        d="M8.87 12.968l-.098-1.107a3.88 3.88 0 01-3.228-.838 3.89 3.89 0 015-5.958A3.88 3.88 0 0111.929 8.1l1.108-.097a4.984 4.984 0 00-1.779-3.788 5 5 0 00-6.428 7.66 4.984 4.984 0 004.04 1.094z"
      />
      <path
        d="M13.951 7.917l-2.988.262 1.668 1.862 1.32-2.124z"
      />
    </svg>
  );
}

export default Reboot;