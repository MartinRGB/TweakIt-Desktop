import React ,{ useContext, useEffect,useState} from 'react';

import styled from '@emotion/styled';
import '@Context/i18nContext'
import MainButtonToggle from '@Components/MainButtonToggle'
import TitleButtonNormal from '@Components/TitleButtonNormal'
import Icons from '@Assets/icons'
import CodeTemplate from './CodeTemplate';

const CodeArea: React.FC = ({children}) => {
  //const [colorMode] = useColorMode();

  const [isExpanded,setCodeIsExpand] = useState<boolean>(true);

  const [activeName,setActiveName] = useState<string>('')

  //,"Flutter","Smartisan"
  const IconStr = ["Android","iOS","Web","Flutter","Smartisan","Data"];

  var PlatformIcon;

  return (
    <Container
      isExpanded ={isExpanded}
      >
      <BlurContainer>
        <TopNav>
          <TopLeftContainer>
              {
                    IconStr.map(function (data:any,index:number) {
                      //var currIcon = Icons[(iCon[index].replace(/\s/g, "")!)];
                      PlatformIcon = Icons[(IconStr[index].replace(/\s/g, "")!)];
                      return (
                        <MainButtonToggle
                        style={{
                          width:`100%`,
                          borderRadius:`2px`,
                          display: `inline-flex`,
                          paddingLeft: `4px`,
                          paddingRight: `6px`,
                          alignItems: `center`,
                          marginRight: `8px`
                        }}
                        onClick={()=>{
                          setActiveName(IconStr[index])
                        }}
                        active={activeName === IconStr[index] && isExpanded}
                        key={'CodeButton' + '_' +index}
                      >
                        <PlatformIcon
                        ></PlatformIcon><CustomSpan>{IconStr[index]}</CustomSpan>
                      </MainButtonToggle>
                      )
                  
                })
              }
          </TopLeftContainer>
          <TopRightContainer>
            <TitleButtonNormal
              style={{
                width:`24px`,
                borderRadius:`2px`,
              }}
              onClick={()=>{
                setCodeIsExpand(!isExpanded)
                setActiveName('')
              }}
            >
              <Icons.CollapsedArrowAlertNative
                style={{
                  transform:`rotate(${isExpanded?'0deg':'180deg'})`,
                  transition:`all 0.6s cubic-bezier(0.13, 0.79, 0.25, 1) 0s`,
                }}
              ></Icons.CollapsedArrowAlertNative>
            </TitleButtonNormal>
          </TopRightContainer>
        </TopNav>
      </BlurContainer>
      <ScrollContainer>
        <CodeTemplate name={activeName} isExpanded={isExpanded}></CodeTemplate>
      </ScrollContainer>
    </Container>
  )
}

export default CodeArea

const TopRightContainer = styled.div`
  display: flex;
  flex-direction: row-reverse;
  align-items: center;
  height: 100%;
  float: right;
  padding-right:14px;
`

const TopLeftContainer = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  height: 100%;
  float: left;
  padding-left:14px;
`

const BlurContainer = styled.div`
  position: absolute;
  top: 0px;
  left: 0px;
  width: 100%;
  height: 40px;
  //mask: linear-gradient(180deg, ${p => p.theme.colors.main_top_bg_blur}, transparent);
  // backdrop-filter: saturate(180%) blur(5px);
  // -webkit-mask: linear-gradient(to bottom,#000000 80%,#00000080 100%);
  z-index:1
`

const TopNav = styled.div`
    height:100%;
    width:100%;

`

const Container = styled.div<{
  isExpanded:boolean;
}>`
    //height: 100%;
    height:${p => p.isExpanded?'250px':'40px'};
    transition:all 0.3s cubic-bezier(0.13, 0.79, 0.25, 1) 0s;
    // min-height:50px;
    //background:blue;
    display: flex;
    flex-direction: column;
    box-shadow:0px -1px 0px ${p => p.theme.colors.adb_border};
    background:${p => p.theme.colors.main_bottom_bg};
    z-index:1;
    position:relative;
    //flex:4;
`

const ScrollContainer = styled.div`
    width: calc(100% - 28px);
    height: 100%;
    margin-top: 40px;
    margin-left: auto;
    margin-right: auto;
    //margin-bottom: 12px;
    overflow-y: scroll;
    outline: none;
    /* width */
    ::-webkit-scrollbar {
      width: 8px;
    }

    font-family:${p => p.theme.fonts.monospace};
    font-size:12px;

    // ::-webkit-scrollbar-track {
    //   box-shadow: inset 0 0 14px 14px transparent;
    //   border: solid 4px transparent;
    // }
    
    ::-webkit-scrollbar-thumb {
      // box-shadow: inset 0 0 14px 14px #bbbbbe;
      // border: solid 4px transparent;
      background:${p => p.theme.colors.adb_border};
      //border-radius: 100px;
      border-bottom: 14px ${p => p.theme.colors.main_bottom_bg} solid;
      background-clip: padding-box;
      transition:all 0.3s;
    }

    ::-webkit-scrollbar-thumb:hover {
      background:${p => p.theme.colors.text}
    }
`

const CustomSpan = styled.span`
text-align: center;
font-family: ${props => props.theme.fonts.numberInput};
font-style: normal;
font-weight: bold;
font-size: 11px;
line-height: 14px;
margin-left:16px;
`
