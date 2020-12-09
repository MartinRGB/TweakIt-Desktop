import React, { createContext, useState,useEffect} from "react";
import initState from "@Config/init_state.json";
import {execCMD,execCMDPromise,exec} from '@Helpers/ADBCommand/ADBCommand';
import adb from 'adbkit';

export var ADBConnectContext = createContext({
  currentSelectDeviceId:'',
  setCurrentSelectDeviceId:(tag:string) => {},
  currentSelectIndex:-1,
  setCurrentSelectIndex:(tag:number) => {},
  connectedDevice: [],
  connectedDeviceCounts:0,
  displayInfo: [],
  displayCounts:0,
  deviceWifi:[],
  isUSBOnConnect:[],
  isWifiOnConnect:[],
  isOnConnect:true,
  setIsOnConnet:(tag:boolean) => {},
  startWifiConnection:(tag1:string,tag2:number) => {},
});

var ADBConnectProvider: React.FC<{}> = ({ children }) => {
  const [selectDeviceId,setSelectDeviceId] = useState<string>('');
  const [selectDeviceIndex,setSelectDeviceIndex] = useState<number>(-1);
  const [deviceArr, setDeivceArr] = useState<any>([]);
  const [deviceCounts, setDeivceCounts] = useState<number>(0);
  const [mDisplayInfo,setDisplayInfo] = useState<any>([]);
  const [mDisplayCounts,setDisplayCounts] = useState<number>(0);
  const [mDeviceWifi,setDeviceWifi] = useState<any>([]);
  const [mIsOnConnect,setIsConnect] = useState<boolean>(true);
  const [mUSBIsOnConnect,setUSBIsConnect] = useState<any>([]);
  const [mWifiIsOnConnect,setWifiIsConnect] = useState<any>([]);

  function pushUSBData(tag:boolean){
    var data = mUSBIsOnConnect;
    data.push(tag);
    setUSBIsConnect(data);
  }
  function pushWifiData(tag:boolean){
    var data = mWifiIsOnConnect;
    data.push(tag);
    setWifiIsConnect(data);
  }
  function cleanWifiData(){
    setWifiIsConnect([]);
  }
  function cleanUSBData(){
    setUSBIsConnect([]);
  }


  function setNetworkIsConnect(tag:boolean){
    setIsConnect(tag);
  }

  function setSelectDeviceIndexAndSave(tag:number){
    setSelectDeviceIndex(tag)
  }

  function setSelctDeviceIdAndSave(tag:string){
    setSelectDeviceId(tag)
  }

  function setDeivceArrayAndLength(tag: any) {
    setDeivceArr(tag);
    setDeivceCounts(tag.length);
  }

  useEffect( () => {
    const client = adb.createClient()

    client.trackDevices()
    .then(function(tracker:any) {
      tracker.on('add', function(device:any) {
        console.log('Device %s was plugged', device.id);
          client.listDevices()
          .then(function(devices:any) {
            cleanUSBData();
            cleanWifiData();
            setDevicesNameByTracking(devices)
            setDevicesWifiByTracking(devices)
            setDevicesDisplayInfoByTracking(devices)
          })
          .catch(function(err:any) {
            console.error('Something went wrong:', err.stack)
          })

      })
      tracker.on('remove', function(device:any) {
        console.log('Device %s was unplugged', device.id);
          client.listDevices()
          .then(function(devices:any) {
            cleanUSBData();
            setDevicesNameByTracking(devices)
            setDevicesWifiByTracking(devices)
            setDevicesDisplayInfoByTracking(devices)
          })
          .catch(function(err:any) {
            console.error('Something went wrong:', err.stack)
          })

      })
      tracker.on('end', function() {
        console.log('Tracking stopped')
      })
    })
    .catch(function(err:any) {
      console.error('Something went wrong:', err.stack)
    })}
  ,[]);
  

  const setDevicesNameByTracking = (devices:any) =>{
      var currentData:any = [];
      console.log(deviceArr)
      new Promise((resolve, reject) =>{
        for(var i = 0;i < devices.length;i++){
          if(devices[i].id && !devices[i].id.includes(":")){
            currentData.push({ value: `${devices[i].id}`})
            pushUSBData(true)
          }
        }
        resolve(currentData)
      }).then(function(val:any){
        setDeivceArrayAndLength(val)
      })
  }

  const endlessWifiInfo = (data:any,devices:any,counts:number) =>{
    new Promise((resolve, reject) =>{
      exec(`adb -s ${devices[counts].id} shell ip addr show wlan0 | grep 'inet\\s' | awk '{print $2}' | awk -F'/' '{print $1}'`, function(error:any, stdout:any, stderr:any){
        if(error) {
            reject(error);
            return;
        }
        resolve(stdout.replace(/\n|\r/g, ""));
      });
    }).then(function(val) {
      if(counts < devices.length - 1){
        data.push(val);
        return endlessWifiInfo(data,devices,counts+1);
      }
      else{
        data.push(val);
        setDeviceWifi(data);
        //console.log(data)
      }
    })
  }

  const setDevicesWifiByTracking = (devices:any) =>{
    var logicalDevices:any = [];
    new Promise((resolve, reject) =>{
      for(var i = 0;i < devices.length;i++){
        if(devices[i].id && !devices[i].id.includes(":")){
          if(devices[i].id.includes("emulator")){
            logicalDevices.push([])
            pushWifiData(false)
          }
          else{
            logicalDevices.push(devices[i])
            pushWifiData(false)
          }
        }
      }
      resolve(logicalDevices)
    }).then(function(val){
      //console.log(val)
      if(val.length === 0){
        setDeviceWifi([]);
      }
      else{
        endlessWifiInfo([],val,0);
      }
    })

  }

  const endlessDevicesDisplayInfo = (data:any,devices:any,counts:number) =>{
    new Promise((resolve, reject) =>{
      exec(`adb -s ${devices[counts].id} shell dumpsys display | grep 'mBaseDisplayInfo=DisplayInfo{"' | awk -F'",' '{print $1}'`, function(error:any, stdout:any, stderr:any){
        if(error) {
            reject(error);
            return;
        }
        var result;
        if(stdout){
          result = stdout.toString().split('mBaseDisplayInfo=DisplayInfo{"')[1].replace("Id","");
        }
        resolve(result);
      });
    }).then(function(val) {
      if(counts < devices.length - 1){
        data.push([{ value: `${devices[counts].id} - ${val}`},{ value: `${devices[counts].id} - ${val+'012'}`}]);
        return endlessDevicesDisplayInfo(data,devices,counts+1);
      }
      else{
        data.push([{ value: `${devices[counts].id} - ${val}`},{ value: `${devices[counts].id} - ${val+'012'}`}]);
        setDisplayInfo(data);
        //console.log(data)
        setDisplayCounts(data.length)
      }
    })
  }

  const setDevicesDisplayInfoByTracking = (devices:any) => {
    var logicalDevices:any = [];
    new Promise((resolve, reject) =>{
      for(var i = 0;i < devices.length;i++){
        if(devices[i].id && !devices[i].id.includes(":")){
          logicalDevices.push(devices[i])
        }
      }
      resolve(logicalDevices)
    }).then(function(val){
      //console.log(val)
      if(val.length === 0){
        setDeviceWifi([]);
      }
      else{
        endlessDevicesDisplayInfo([],val,0);
      }
      
    })
  }

  const endlessPortConnect = (id:any,ip:any,index:number)=>{
    execCMDPromise(`adb -s ${id} connect ${ip}`,(out:any)=>{
      console.log(out)
      execCMDPromise("adb devices",(out:any)=>{
        console.log(out)
        console.log(out.toString().includes('failed'))
        if(out.toString().includes(ip)){
          console.log(`无线连接成功，可以掉数据线,地址为 ${ip}`)

          var wifiData = mWifiIsOnConnect;
          wifiData[index] = true;
          setWifiIsConnect(wifiData);

          setNetworkIsConnect(true)
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
          console.log(`设备 ${id} Root 成功，开启后续连接`)
          execCMDPromise(`adb -s ${id} shell ip addr show wlan0 | grep 'inet\\s' | awk '{print $2}' | awk -F'/' '{print $1}'`,(out:any)=>{
            var ipArr = out.toString();
            console.log(out);
            console.log('设备 IP 地址为 ' + ipArr + ' ,连接中')
            execCMDPromise(`adb -s ${id} tcpip ` + portNum,(out:any)=>{
                console.log(out)
                console.log('端口为 ' + portNum +' ,连接中');
                var ipAddressWithoutBr = (ipArr + ':'+portNum).replace(/\n|\r/g, "")
                console.log(`adb -s ${id} connect ` + ipAddressWithoutBr)
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

  const setWifiConnection = (deviceId:string,deviceIndex:number) =>{
    var ipArr = '';
    var portNum = '9999'

    var wifiData = mWifiIsOnConnect;
    wifiData[deviceIndex] = true;
    setWifiIsConnect(wifiData);

    setNetworkIsConnect(false)
    
    execCMDPromise('adb disconnect;adb root;',(out:any)=>{
      console.log(out);
      console.log('ADB 重连，Root 成功')
      endlessRootConnect(deviceId,portNum,deviceIndex)
    })
  }

  return (
    <ADBConnectContext.Provider
      value={{
        currentSelectDeviceId:selectDeviceId,
        setCurrentSelectDeviceId:setSelctDeviceIdAndSave,
        currentSelectIndex:selectDeviceIndex,
        setCurrentSelectIndex:setSelectDeviceIndex,
        connectedDevice:deviceArr,
        connectedDeviceCounts:deviceCounts,
        displayInfo:mDisplayInfo,
        displayCounts:mDisplayCounts,
        deviceWifi:mDeviceWifi,
        isOnConnect:mIsOnConnect,
        isUSBOnConnect:mUSBIsOnConnect,
        isWifiOnConnect:mWifiIsOnConnect,
        setIsOnConnet:setNetworkIsConnect,
        startWifiConnection:setWifiConnection,
      }}>
      {children}
    </ADBConnectContext.Provider>
  );
};

export default ADBConnectProvider;