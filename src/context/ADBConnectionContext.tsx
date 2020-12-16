import React, { createContext, useState,useEffect,useContext} from "react";
import initState from "@Config/init_state.json";
import {execCMDPromise} from '@Helpers/ADBCommand/ADBCommand';
import adb from 'adbkit';

type ADBConnectionContextType = {

  serialNoDeivces:string[];
  serialNoDevicesCounts:number;
  serialNoDeivcesWifiAddrs:string[];
  serialNoDevicesDisplayInfos:string[][],
  
  serialNoDevicesTargets:string[];

  serialNoDevicesMode:string[];
  setSerialNoDevicesModeByIndex:(tag:string,index:number)=>void
  serialNoDevicesIsConnectingWifi:boolean[];
  serialNoDevicesIsConnectingUSB:boolean[];
  serialNoDevicesIsRemovedUSB:boolean[];

  currentDeviceSelectIndex:number;
  setCurrentDeviceSelectIndex: (tag: number) => void;

  startCurrentDeviceWifiConnection:(id:string,index:number) => void;
};

export var ADBConnectionContext = createContext<ADBConnectionContextType>({

  serialNoDeivces: [],
  serialNoDevicesCounts:0,
  serialNoDeivcesWifiAddrs:[],
  serialNoDevicesDisplayInfos:[],

  serialNoDevicesTargets:[],

  serialNoDevicesMode:[],
  setSerialNoDevicesModeByIndex:(tag:string,index:number)=>{},
  serialNoDevicesIsConnectingWifi:[],
  serialNoDevicesIsConnectingUSB:[],
  serialNoDevicesIsRemovedUSB:[],

  currentDeviceSelectIndex:-1,
  setCurrentDeviceSelectIndex:(tag:number)=>{},

  startCurrentDeviceWifiConnection:(id:string,index:number) => {}
});

var ADBConnectionProvider: React.FC<{}> = ({ children }) => {
  const[snDevices,setSNDevices] = useState<string[]>([]);
  const[snDevicesCounts,setSNDevicesCounts] = useState<number>(0);
  const[snDevicesWifiAddrs,setSNDevicesWifiAddrs] = useState<string[]>([]);
  const[snDevicesDisplayInfos,setSnDevicesDisplayInfos] = useState<string[][]>([]);

  const[snDevicesTargets,setSNDevicesTargets] = useState<string[]>([]);

  const[snDevicesMode,setSNDevicesMode] = useState<string[]>([]);
  const[snDevicesIsConnectingWifi,setSNDevicesIsConnectingWifi] = useState<boolean[]>([]);
  const[snDevicesIsConnectingUSB,setSNDevicesIsConnectingUSB] = useState<boolean[]>([]);
  const[snDevicesIsRemovedUSB,setSNDevicesIsRemovedUSB] = useState<boolean[]>([]);

  const[currDeviceSelectIndex,setCurrDeviceSelectIndex] = useState<number>(-1);
  

  function setCurrentDeviceSelectIndexAndSave(tag:number){
    setCurrDeviceSelectIndex(tag)
    if(snDevicesMode[tag] != 'WIFI'){
      var snDevicesModeData = snDevicesMode;
      snDevicesModeData[tag] = 'USB';
      setSNDevicesMode(snDevicesModeData);
      var snDevicesTargetData = [...snDevicesTargets];
      snDevicesTargetData[tag] = snDevices[tag];
      setSNDevicesTargets(snDevicesTargetData);
    }
    else if (snDevicesMode[tag] === 'WIFI'){
      var snDevicesTargetData = [...snDevicesTargets];
      snDevicesTargetData[tag] = snDevicesWifiAddrs[tag];
      setSNDevicesTargets(snDevicesTargetData);
    }
  }

  function setDevicesModeAndSaveByIndex(tag:string,index:number){
    var snDevicesModeData = snDevicesMode;
    snDevicesModeData[index] = tag;
    setSNDevicesMode(snDevicesModeData);

    if(tag === 'WIFI'){
      var snDevicesTargetData = [...snDevicesTargets];
      snDevicesTargetData[index] = snDevicesWifiAddrs[index]
      setSNDevicesTargets(snDevicesTargetData)
    }
    else if(tag === 'USB'){
      var snDevicesTargetData = [...snDevicesTargets];
      snDevicesTargetData[index] = snDevices[index]
      setSNDevicesTargets(snDevicesTargetData)
    }
  }

  function endlessGetDevices(device:any,callback:()=>void){
    var snDevicesData = snDevices
    var snDevicesIsConnectingWifiData = snDevicesIsConnectingWifi;
    var snDevicesIsConnectingUSBData = snDevicesIsConnectingUSB;
    var snDevicesModeData = snDevicesMode;
    var snDevicesIsRemovedUSBData = snDevicesIsRemovedUSB;
    execCMDPromise(`adb -s ${device.id} shell getprop ro.serialno`,function(val:any){
      if(!snDevicesData.includes(val.replace(/(\r\n|\n|\r)/gm, ""))){
        if(val.replace(/(\r\n|\n|\r)/gm, "") != device.id){
          snDevicesData.push(device.id);
          snDevicesIsConnectingWifiData.push(false);
          snDevicesIsConnectingUSBData.push(false);
          snDevicesModeData.push('USB')
          snDevicesIsRemovedUSBData.push(false);
        }
        if(val.replace(/(\r\n|\n|\r)/gm, "") === device.id){
          snDevicesData.push(val.replace(/(\r\n|\n|\r)/gm, ""));
          snDevicesIsConnectingWifiData.push(false);
          snDevicesIsConnectingUSBData.push(false);
          snDevicesModeData.push('USB');
          snDevicesIsRemovedUSBData.push(false);
        }

        setSNDevices(snDevicesData);
        setSNDevicesCounts(snDevicesData.length)
        setSNDevicesIsConnectingWifi(snDevicesIsConnectingWifiData)
        setSNDevicesIsConnectingUSB(snDevicesIsConnectingUSBData)
        setSNDevicesMode(snDevicesModeData);
        setSNDevicesIsRemovedUSB(snDevicesIsRemovedUSBData)
      }
      callback();

    },function(error:any){
      endlessGetDevices(device,callback)
    })


  }

  function endlessGetWifiAddrs(device:any){
    var snDeviceWifiAddrsData = snDevicesWifiAddrs
    execCMDPromise(`adb -s ${device.id} shell ip addr show wlan0 | grep 'inet\\s' | awk '{print $2}' | awk -F'/' '{print $1}'`,function(val:any){
      if(device.id.includes('emulator')){
        snDeviceWifiAddrsData.push('');
        setSNDevicesWifiAddrs(snDeviceWifiAddrsData);
      }
      else if(!snDeviceWifiAddrsData.includes(val.replace(/(\r\n|\n|\r)/gm, ""))){
        snDeviceWifiAddrsData.push(val.replace(/(\r\n|\n|\r)/gm, ""));
        setSNDevicesWifiAddrs(snDeviceWifiAddrsData);
      }
    },function(error:any){
      endlessGetWifiAddrs(device);
    })
  }


  function endlessGetDisplayInfos(device:any){
    var snDeviceDisplayInfosData = snDevicesDisplayInfos
    execCMDPromise(`adb -s ${device.id} shell dumpsys display | grep 'mBaseDisplayInfo=DisplayInfo{"' | awk -F'",' '{print $1}'`,function(val:any){
      var result = val.toString().split('mBaseDisplayInfo=DisplayInfo{"')[1].replace("Id","");
      snDeviceDisplayInfosData.push([`${device.id} - ${result.replace(/(\r\n|\n|\r)/gm, "")}`]);
      setSnDevicesDisplayInfos(snDeviceDisplayInfosData);
    },function(error:any){
      endlessGetDisplayInfos(device)
    })
  }

  function addDeviceData(device:any){

    new Promise((resolve, reject) =>{
      endlessGetDevices(device,()=>{resolve('success')});
    }).then(function(val:any){
        execCMDPromise(`adb devices`,function(val:any){
          var snDevicesIsRemovedUSBData = [...snDevicesIsRemovedUSB]
          var snDevicesIsConnectingUSBData = [...snDevicesIsConnectingUSB]
          if(val.includes(device.id)){
            snDevicesIsRemovedUSBData[snDevices.indexOf(device.id)] = false;
            snDevicesIsConnectingUSBData[snDevices.indexOf(device.id)] =false;
          }
          else{
            snDevicesIsRemovedUSBData[snDevices.indexOf(device.id)] = true;
            snDevicesIsConnectingUSBData[snDevices.indexOf(device.id)] =false;
          }
          setSNDevicesIsRemovedUSB(snDevicesIsRemovedUSBData)
          setSNDevicesIsConnectingUSB(snDevicesIsConnectingUSBData)
        })
    });
    
    endlessGetWifiAddrs(device);
    endlessGetDisplayInfos(device)

  }

  function removeDeviceData(device:any){
    if(snDevicesMode[snDevices.indexOf(device.id)] != 'WIFI'){
      var snDevicesData = snDevices
      var snDeviceWifiAddrsData = snDevicesWifiAddrs;
      var snDevicesTargetData = snDevicesTargets;
      var snDevicesIsConnectingWifiData = snDevicesIsConnectingWifi;
      var snDevicesIsConnectingUSBData = snDevicesIsConnectingUSB;
      var snDevicesModeData = snDevicesMode;
      var snDevicesIsRemovedUSBData = snDevicesIsRemovedUSB;
      var snDeviceDisplayInfosData = snDevicesDisplayInfos

      var deviceIndex = snDevicesData.indexOf(device.id)
      if (deviceIndex > -1) {
        snDevicesData.splice(deviceIndex, 1);
        snDeviceWifiAddrsData.splice(deviceIndex, 1);
        snDevicesTargetData.splice(deviceIndex, 1);
        snDevicesIsConnectingWifiData.splice(deviceIndex, 1);
        snDevicesIsConnectingUSBData.splice(deviceIndex, 1);
        snDevicesModeData.splice(deviceIndex, 1);
        snDevicesIsRemovedUSBData.splice(deviceIndex, 1);
        snDeviceDisplayInfosData.splice(deviceIndex, 1);
      }
      console.log(snDevicesTargetData)

  
      setSNDevices(snDevicesData);
      setSNDevicesCounts(snDevicesData.length)
      setSNDevicesWifiAddrs(snDeviceWifiAddrsData);
      setSNDevicesTargets(snDevicesTargetData);
      setSNDevicesIsConnectingWifi(snDevicesIsConnectingWifiData);
      setSNDevicesIsConnectingUSB(snDevicesIsConnectingUSBData);
      setSNDevicesMode(snDevicesModeData)
      setSNDevicesIsRemovedUSB(snDevicesIsRemovedUSBData)
      setSnDevicesDisplayInfos(snDeviceDisplayInfosData);
      setCurrDeviceSelectIndex(-1)

    }
    if(snDevicesMode[snDevices.indexOf(device.id)] === 'WIFI'){
      var snDevicesIsRemovedUSBData = snDevicesIsRemovedUSB;
      snDevicesIsRemovedUSBData[snDevices.indexOf(device.id)] = true;
      setSNDevicesIsRemovedUSB(snDevicesIsRemovedUSBData)
    }

  }


  // Wifi Connnection

  const endlessPortConnect = (id:any,ip:any,index:number)=>{
    execCMDPromise(`adb -s ${id} connect ${ip}`,(out:any)=>{
      execCMDPromise("adb devices",(out:any)=>{
        if(out.toString().includes(ip)){
          console.log(`无线连接成功，可以掉数据线,地址为 ${ip}`)
          var snDevicesIsConnectingWifiData = [...snDevicesIsConnectingWifi];
          snDevicesIsConnectingWifiData[index] =false;
          setSNDevicesIsConnectingWifi(snDevicesIsConnectingWifiData)
        }
        else{
          console.log('无线连接失败，请重来')
          return endlessPortConnect(id,ip,index)
        }
      })
    })
  }

  const endlessRootConnect = (id:any,portNum:any,index:number) =>{
      execCMDPromise("adb devices",(out:any)=>{
        if(out.toString().includes(id)){
          execCMDPromise(`adb -s ${id} shell ip addr show wlan0 | grep 'inet\\s' | awk '{print $2}' | awk -F'/' '{print $1}'`,(out:any)=>{
            var ipArr = out.toString();
            execCMDPromise(`adb -s ${id} tcpip ` + portNum,(out:any)=>{
              var ipAddressWithoutBr = (ipArr + ':'+portNum).replace(/\n|\r/g, "")
              endlessPortConnect(id,ipAddressWithoutBr,index)
            })
          })
        }
        else{
          console.log(`找不到设备 ${id}，继续搜寻`)
          return endlessRootConnect(id,portNum,index)
        }
      })
  }

  const setDeviceWifiConnection = (deviceId:string,deviceIndex:number) =>{
    var portNum = '9999'

    var snDevicesIsConnectingWifiData = [...snDevicesIsConnectingWifi];
    snDevicesIsConnectingWifiData[deviceIndex] =true;
    setSNDevicesIsConnectingWifi(snDevicesIsConnectingWifiData)

    var snDevicesIsConnectingUSBData = [...snDevicesIsConnectingUSB];
    snDevicesIsConnectingUSBData[deviceIndex] =true;
    setSNDevicesIsConnectingUSB(snDevicesIsConnectingUSBData)
    
    execCMDPromise(`adb -s ${deviceId} root;`,(out:any)=>{
      endlessRootConnect(deviceId,portNum,deviceIndex)
    })
  }



  useEffect( () => {
    const client = adb.createClient()
    new Promise((resolve, reject) =>{
      execCMDPromise('adb disconnect',function(val:any){
        resolve(val)
      })
    }).then(function(val:any){

      console.log(val)
    })


    client.trackDevices()
    .then(function(tracker:any) {
      tracker.on('add', function(device:any) {
        console.log('Device %s was plugged', device.id);
        addDeviceData(device)
      })
      tracker.on('remove', function(device:any) {
        console.log('Device %s was unplugged', device.id);
        removeDeviceData(device)
      })
    })
    .catch(function(err:any) {
      console.error('Something went wrong:', err.stack)
    })

  },[]);
  

  return (
    <ADBConnectionContext.Provider
      value={{
        serialNoDeivces: snDevices,
        serialNoDevicesCounts:snDevicesCounts,
        serialNoDeivcesWifiAddrs:snDevicesWifiAddrs,
        serialNoDevicesDisplayInfos:snDevicesDisplayInfos,
        
        serialNoDevicesTargets:snDevicesTargets,

        serialNoDevicesMode:snDevicesMode,
        setSerialNoDevicesModeByIndex:setDevicesModeAndSaveByIndex,
        serialNoDevicesIsConnectingWifi:snDevicesIsConnectingWifi,
        serialNoDevicesIsConnectingUSB:snDevicesIsConnectingUSB,
        serialNoDevicesIsRemovedUSB:snDevicesIsRemovedUSB,

        currentDeviceSelectIndex:currDeviceSelectIndex,
        setCurrentDeviceSelectIndex:setCurrentDeviceSelectIndexAndSave,

        startCurrentDeviceWifiConnection:setDeviceWifiConnection,

      }}>
      {children}
    </ADBConnectionContext.Provider>
  );
};

export default ADBConnectionProvider;