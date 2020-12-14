import React from "react";
import { Icon } from '@Types';

const Back: Icon = ({style}) => {
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
        d="M11.57 3.65v8.895c0 .59-.41.82-.915.514L3.379 8.65c-.505-.306-.506-.801 0-1.108l7.276-4.407c.505-.306.915-.08.915.514zm-1.067.827v7.233l-6-3.616 6-3.617z"
      />
    </svg>
  );
}

export default Back;