import React from 'react'
import { useColorMode,jsx } from 'theme-ui'
import tw from 'twin.macro'
import styled from '@emotion/styled';
import { IButton } from "@types";

const TitleButtonNormal: React.FC<IButton> = ({ children , onClick}) => {
  const [colorMode, setColorMode] = useColorMode()

  return <Button
        onClick={onClick}>
        {children}
      </Button>
}

// twmacro
const Button = styled.button`
  // ${tw`mt-4 p-2 text-white bg-blue-600`}
  height:20px;
  width:24px;
  border-radius:4px;
  padding: 0;
  background: ${p => p.theme.colors.normal_button_bg};
  outline:none;
  margin-left:8px;
  border: 0.5px solid rgba(255, 255, 255, 0.06);

  > svg{
    vertical-align: middle;
    fill: ${p => p.theme.colors.text};
  }

  &:active {
    border-style: double;
    background: ${p => p.theme.colors.normal_button_active};
  }

  &:active  > svg{
    fill: ${p => p.theme.colors.background};
  }
`;


export default TitleButtonNormal
