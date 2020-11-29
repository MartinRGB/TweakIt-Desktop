import React from "react";
import { Icon } from '@Types';

const Fluent: Icon = ({style}) => {
  return (
    <svg 
    width={16} 
    height={16} 
    viewBox="0 0 16 16"
    style={{ ...style }}
    xmlns="http://www.w3.org/2000/svg">
      <path
        d="M3 3.313C3 3.14 3.14 3 3.313 3h4.374v4.688H3V3.313zM8.313 3h4.374c.173 0 .313.14.313.313v4.374H8.312V3zM3 8.313v4.374c0 .173.14.313.313.313h4.374V8.312H3zM8.313 13V8.312H13v4.376c0 .172-.14.312-.313.312H8.314z"
      />
    </svg>
  );
}

export default Fluent;