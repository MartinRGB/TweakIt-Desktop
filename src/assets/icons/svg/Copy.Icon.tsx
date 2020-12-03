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
        d="M3.283 12.718c.19.19.45.292.718.283h5a.968.968 0 001-1v-2h2a.968.968 0 001-1V4a.967.967 0 00-1-1H7a.967.967 0 00-1 1v2H4a.967.967 0 00-1 1v5a.967.967 0 00.282.717zM9.001 10H7h.004m-.014 0A.967.967 0 016 8.997V7.251H4.25v4.5h4.5V10H9M7.25 4.25v4.5h4.5v-4.5h-4.5z"
      />
    </svg>
  );
}

export default Copy;