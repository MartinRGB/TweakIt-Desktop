import React, { useContext, useEffect,useState}from 'react'
import { useColorMode,jsx } from 'theme-ui'
import tw from 'twin.macro'
import styled from '@emotion/styled';
import { IButton } from "@types";

const TitleButtonToggle: React.FC<IButton> = ({ children , onClick, active}) => {
  const [colorMode, setColorMode] = useColorMode()

  return <Button
          onClick={onClick}
          active={active} >
          {children}
        </Button>
}

// twmacro
const Button = styled.button<
{ 
  active:boolean;
}
>`
  height:20px;
  width:24px;
  border-radius:4px;
  padding: 0;
  background:${p => (p.active? p.theme.colors.toggle_button_bg:p.theme.colors.normal_button_bg)};
  outline:none;
  margin-left:20px;
  margin-right:13px;
  border: 0.5px solid rgba(255, 255, 255, 0.06);

  > svg{
    vertical-align: middle;
    fill: ${p => (p.active? p.theme.colors.background:p.theme.colors.text)};
  }

  &:active {
    border-style: double;
    background:${p => p.theme.colors.toggle_button_active};;
  }

  // &:active  > svg{
  //   fill: ${p => (p.active? p.theme.colors.text:p.theme.colors.background)};
  // }
`;


export default TitleButtonToggle
