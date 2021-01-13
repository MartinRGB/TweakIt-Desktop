import React ,{useEffect,useRef,useState} from 'react'
import { render } from 'react-dom'
import styled from '@emotion/styled'
import {PrepareDataClientReact} from './client/PrepareDataClientReact'
import {SocketEventListener} from './interfaces/SocketEventListener'
import {FinalMessage} from '../server/interfaces/Message'
import ScrcpyClientReact from './client/ScrcpyClientReact'
import { ScrcpyStreamParams } from './interfaces/ScrcpyStreamParams';

const mainElement = document.createElement('div')
mainElement.setAttribute('id', 'root')
document.body.appendChild(mainElement)
document.body.style.margin = '0px';
document.body.style.maxHeight = '100vh';
document.body.style.overflow = 'hidden';
document.body.style.background = 'black';

const App = () => {
  const [scrcpyStreamParams,setScrcpyStreamParams] = useState<any>()
  useEffect(() => {

    PrepareDataClientReact.start()
    const listener: SocketEventListener = { 
      onSocketOpen:()=>{
        console.log('open');
      },
      onSocketClose:(e:CloseEvent)=>{
        console.log(e)
      },
      onSocketMessage:(e:FinalMessage)=>{

        const streamParams:ScrcpyStreamParams = {
          action: 'stream',
          decoder: 'mse',
          ip: `${e.clientMsg.ip}`,
          port: `${e.clientMsg.port}`,
          query: `${e.clientMsg.query}`,
          udid: `${e.clientMsg.udid}`,
        };

        setScrcpyStreamParams(streamParams)
      }
    };

    PrepareDataClientReact.setSocketEventListener(listener)
  }, [])


  return (
    <div>
      <ScrcpyClientReact params={scrcpyStreamParams}></ScrcpyClientReact>
    </div>
  )
}

const IFrame =styled.iframe`
  outline: none;
  border: none;
`


render(<App />, mainElement)
