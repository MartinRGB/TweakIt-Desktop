import React from "react";
import { Icon } from '@Types';

const Record: Icon = ({style}) => {
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
        d="M14.25 4.893a.504.504 0 00-.746-.443l-2.383 1.302V5.27A1.523 1.523 0 009.598 3.75H3.271c-.84.001-1.52.682-1.521 1.521v5.02c.001.84.682 1.52 1.521 1.52H9.6a1.523 1.523 0 001.52-1.52v-.465l2.384 1.301a.504.504 0 00.746-.442V4.893zm-4.138 5.397c0 .283-.23.513-.513.513H3.27a.514.514 0 01-.513-.513V5.271c0-.283.23-.512.513-.513H9.6c.283 0 .513.23.513.513v5.02zm3.13-4.547v4.092L11.12 8.677V6.901l2.122-1.158z"
        />
    </svg>
  );
}

export default Record;