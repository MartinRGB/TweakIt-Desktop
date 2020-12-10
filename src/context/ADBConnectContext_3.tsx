import React, { createContext, useState,useEffect} from "react";
import initState from "@Config/init_state.json";
import {execCMD,execCMDPromise,exec} from '@Helpers/ADBCommand/ADBCommand';
import adb from 'adbkit';

export var ADBConnectContext = createContext({
  currentSelectDeviceId:'',
  setCurrentSelectDeviceId:(tag:string) => {},
  currentSelectIndex:-1,
  setCurrentSelectIndex:(tag:number) => {},
  deviceArray: [''],
  deviceCounts:0,
  deviceDisplayInfo: [],
  devicedisplayCounts:0,
  deviceWifi:[],
  deviceIsUSBOnConnect:[],
  deviceIsWifiOnConnect:[],
  deviceIsOnConnect:true,
  setDeviceIsOnConnet:(tag:boolean) => {},
  startWifiConnection:(tag1:string,tag2:number) => {},
});

var ADBConnectProvider: React.FC<{}> = ({ children }) => {
  const [mSelectDeviceId,setSelectDeviceId] = useState<string>('');
  const [mSelectDeviceIndex,setSelectDeviceIndex] = useState<number>(-1);

  const [mDeviceArrary, setDeivceArray] = useState<any>([]);
  const [mDeviceCounts, setDeivceCounts] = useState<number>(0);
  const [mDeviceDisplayInfo,setDeviceDisplayInfo] = useState<any>([]);
  const [mDeviceDisplayCounts,setDeviceDisplayCounts] = useState<number>(0);
  const [mDeviceWifi,setDeviceWifi] = useState<any>([]);
  const [mDeviceIsOnConnect,setDeviceIsConnect] = useState<boolean>(true);
  const [mDeviceUSBIsOnConnect,setDeviceUSBIsConnect] = useState<any>([]);
  const [mDeviceWifiIsOnConnect,setDeviceWifiIsConnect] = useState<any>([]);

  function setNetworkIsConnect(tag:boolean){
    setDeviceIsConnect(tag);
  }

  function setSelectDeviceIndexAndSave(tag:number){
    setSelectDeviceIndex(tag)
  }

  function setSelctDeviceIdAndSave(tag:string){
    setSelectDeviceId(tag)
  }

  useEffect( () => {
    const client = adb.createClient()

    client.trackDevices()
    .then(function(tracker:any) {
      tracker.on('add', function(device:any) {
        console.log('Device %s was plugged', device.id);
        var deviceArrayData = mDeviceArrary;
        console.log(deviceArrayData.push(device.id))
        setDeivceArray(deviceArrayData.push(device.id))
        console.log(mDeviceArrary)
        // var deviceCountsData = mDeviceCounts;
        // setDeivceCounts(deviceCountsData+1);

        // var deviceWifiData = mDeviceWifi;
        // if(!device.id.includes(":")){
        //   if(!device.id.includes("emulator")){
        //     new Promise((resolve, reject) =>{
        //       exec(`adb -s ${device.id} shell ip addr show wlan0 | grep 'inet\\s' | awk '{print $2}' | awk -F'/' '{print $1}'`, function(error:any, stdout:any, stderr:any){
        //         if(error) {
        //             reject(error);
        //             return;
        //         }
        //         resolve(stdout.replace(/\n|\r/g, ""));
        //       });
        //     }).then(function(val) {
        //       deviceWifiData.push(val)
        //       setDeviceWifi(deviceWifiData)
        //     })
        //   }
        //   else{
        //     deviceWifiData.push([])
        //     setDeviceWifi(deviceWifiData)
        //   }
        // }

        // var deviceDisplayInfoData = mDeviceDisplayInfo;
        // var devicedisplayCountsData = mDeviceDisplayCounts;
 
        // if(!device.id.includes(":")){
        //   new Promise((resolve, reject) =>{
        //     exec(`adb -s ${device.id} shell dumpsys display | grep 'mBaseDisplayInfo=deviceDisplayInfo{"' | awk -F'",' '{print $1}'`, function(error:any, stdout:any, stderr:any){
        //       if(error) {
        //           reject(error);
        //           return;
        //       }
        //       var result;
        //       if(stdout){
        //         result = stdout.toString().split('mBaseDisplayInfo=deviceDisplayInfo{"')[1].replace("Id","");
        //       }
        //       resolve(result);
        //     });
        //   }).then(function(val) {
        //     deviceDisplayInfoData.push(`${device.id} - ${val}`)
        //     devicedisplayCountsData ++;
        //     setDeviceDisplayInfo(deviceDisplayInfoData);
        //     setDeviceDisplayCounts(devicedisplayCountsData)
        //   })
        // }

      })
      tracker.on('remove', function(device:any) {
        console.log('Device %s was unplugged', device.id);

      })
      tracker.on('end', function() {
        console.log('Tracking stopped')
      })
    })
    .catch(function(err:any) {
      console.error('Something went wrong:', err.stack)
    })}
  ,[]);
  

  const endlessPortConnect = (id:any,ip:any,index:number)=>{
    execCMDPromise(`adb -s ${id} connect ${ip}`,(out:any)=>{
      console.log(out)
      execCMDPromise("adb devices",(out:any)=>{
        console.log(out)
        console.log(out.toString().includes('failed'))
        if(out.toString().includes(ip)){
          console.log(`无线连接成功，可以掉数据线,地址为 ${ip}`)

          var wifiData = mDeviceWifiIsOnConnect;
          wifiData[index] = true;
          setDeviceWifiIsConnect(wifiData);

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

    var wifiData = mDeviceWifiIsOnConnect;
    wifiData[deviceIndex] = true;
    setDeviceWifiIsConnect(wifiData);

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
        currentSelectDeviceId:mSelectDeviceId,
        setCurrentSelectDeviceId:setSelctDeviceIdAndSave,
        currentSelectIndex:mSelectDeviceIndex,
        setCurrentSelectIndex:setSelectDeviceIndex,
        deviceArray:mDeviceArrary,
        deviceCounts:mDeviceCounts,
        deviceDisplayInfo:mDeviceDisplayInfo,
        devicedisplayCounts:mDeviceDisplayCounts,
        deviceWifi:mDeviceWifi,
        deviceIsOnConnect:mDeviceIsOnConnect,
        deviceIsUSBOnConnect:mDeviceUSBIsOnConnect,
        deviceIsWifiOnConnect:mDeviceWifiIsOnConnect,
        setDeviceIsOnConnet:setNetworkIsConnect,
        startWifiConnection:setWifiConnection,
      }}>
      {children}
    </ADBConnectContext.Provider>
  );
};

export default ADBConnectProvider;