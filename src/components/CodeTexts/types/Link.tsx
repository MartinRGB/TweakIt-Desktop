import React, {memo,useContext, useEffect,useState}from 'react'
import { useColorMode } from 'theme-ui';
import styled from '@emotion/styled';
import Blue from'@Components/CodeTexts/colors/Blue'

export interface ILink{
  target:any;
  href:any;
}

const Link: React.FC<ILink> = memo(({href,target,children}) => {
  const [colorMode, setColorMode] = useColorMode()

  return (
    <ALink
      target={target}
      href={href}
      contentEditable={false} 
      suppressContentEditableWarning={false}
      >

      <Blue>{children}</Blue>
    </ALink> 
    );
})

const ALink =styled.a`
  text-decoration: none;
`
export default Link
