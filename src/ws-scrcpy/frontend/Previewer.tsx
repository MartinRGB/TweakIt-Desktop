import React ,{useEffect,useRef} from 'react'
import { render } from 'react-dom'
const { ipcRenderer } = require('electron')
import { ScrcpyClient } from './client/ScrcpyClient';
import { ScrcpyStreamParams } from './interfaces/ScrcpyStreamParams';
import {FRONTEND_PORT,DEVICE_ID} from '../GlobalConstants'


const mainElement = document.createElement('div')
mainElement.setAttribute('id', 'root')
document.body.appendChild(mainElement)

const testObj = {
  action: 'stream',
  decoder: 'mse',
  ip: `localhost`,
  port: `${FRONTEND_PORT}`,
  query: `?action=proxy&remote=tcp%3A8886&udid=${DEVICE_ID}`,
  udid: `${DEVICE_ID}`,
};

const App = () => {
  useEffect(() => {

    new ScrcpyClient(testObj as ScrcpyStreamParams);
  }, [])

  const paraRef = useRef(null);


  ipcRenderer.on('msg', function (event, ip,port,query,udid){
    console.log(ip,port,query,udid);
    paraRef.current.innerHTML = ip + port+query+udid;
  });
  

  return (
    <div>
      <p style={{color:'white'}}>this is a test242</p>
      <p ref={paraRef} style={{color:'white'}}>this is a test24444444</p>
    </div>
  )
}


render(<App />, mainElement)
