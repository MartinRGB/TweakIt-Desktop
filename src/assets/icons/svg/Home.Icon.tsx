import React from "react";
import { Icon } from '@Types';

const Home: Icon = ({style}) => {
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
        d="M7.8 11.533a3.733 3.733 0 100-7.466 3.733 3.733 0 000 7.466zm0 1.067a4.8 4.8 0 110-9.6 4.8 4.8 0 010 9.6z"
      />
    </svg>
  );
}

export default Home;