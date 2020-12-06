import React from "react";
import { Icon } from '@Types';

const USB: Icon = ({style}) => {
  return (
    <svg 
    width={16} 
    height={16} 
    viewBox="0 0 16 16"
    style={{ ...style }}
    xmlns="http://www.w3.org/2000/svg">
      <path
        d="M10.766 4.987H4.884a.387.387 0 00-.384.39v4.545c0 .358.287.65.64.65h5.37c.353 0 .64-.292.64-.65V5.377a.387.387 0 00-.384-.39zm-.384 4.805H5.267V5.766h5.115v4.026z"
      />
      <path
        d="M5.523 2v3.377h.767V2.779h3.07v2.598h.766V2H5.523zM8.208 12.13h-.767V14h.767v-1.87z"
      />
      <path
        d="M8.784 10.182v1.558H6.866v-1.558h-.768v1.688c0 .358.287.65.64.65h2.174c.352 0 .639-.292.639-.65v-1.688h-.767zM7.569 3.325h-.767v1.298h.767V3.325zM8.848 3.325H8.08v1.298h.768V3.325z"
      />
    </svg>
  );
}

export default USB;