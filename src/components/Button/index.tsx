import React from 'react'

interface IButtonProps {
  children?: React.ReactNode;
  onClick?: any;
}

const Button: React.FC<IButtonProps> = ({ children , onClick}) => {
  return <button type="button" onClick={onClick}>{children}</button>
}

export default Button
