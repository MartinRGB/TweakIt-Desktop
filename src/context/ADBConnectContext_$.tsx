import React, { createContext, useState,useEffect,useContext} from "react";
import initState from "@Config/init_state.json";
import {execCMD,execCMDPromise,exec} from '@Helpers/ADBCommand/ADBCommand';
import adb from 'adbkit';
import {ADBSelectContext} from '@Context/ADBSelectContext'

type ADBCommandStateContextType = {

  deviceTarget:DeviceObject[];
};

export var ADBConnectContext = createContext({
  // currentSelectDeviceId:'',
  // setCurrentSelectDeviceId:(tag:string) => {},
  // currentSelectIndex:-1,
  // setCurrentSelectIndex:(tag:number) => {},
  connectedDevice: [],
  connectedDeviceCounts:0,
  displayInfo: [],
  displayCounts:0,
  deviceWifi:[],

  isWifiOnConnect:[],

  isWifiDeviceRemoved:[],
  setIsWifiDeviceRemoved:(tag:any) => {},

  wifiIsConnecting:false,
  setWifiIsConnecting:(tag:boolean) => {},


  startWifiConnection:(tag1:string,tag2:number) => {},
  startUSBConnection:(tag1:string,tag2:number) => {},

  updateData:() => {},

  deviceTarget:null,
});


// [{deviceId:},{deviceWifi:},{deviceConnectMode:},{deviceDisplay:},{displayCounts:},{deviceIsRemoved:},{deviceIsConnectingWifi:}]


export class DeviceObject{
  public id:string;
  public type:string;
  public serialNo:string;
  public wifiId:string;
  public dpInfo:string[];
  public dpCounts:number;

  public connectMode:string;
  public isRemoved:boolean;
  public isConnectingWifi:boolean;

  public activeWifiId:string;
  public isActiveWifi:boolean;

  constructor(){
    this.id = '';;
    this.type = '';
    this.serialNo = '';
    this.wifiId = '';
    this.dpInfo = [];
    this.dpCounts = 0;
    this.connectMode = '';
    this.isRemoved = false;
    this.isConnectingWifi = false;
    this.activeWifiId = ''
    this.isActiveWifi = false;
  }

  public setId(id:string){this.id = id;}
  public setType(type:string){this.type = type;}
  public setSerialNo(serialNo:string){this.serialNo = serialNo;}
  public setWifiId(wifiAddress:string){this.wifiId = wifiAddress;}
  public setDisplayInfo(displayInfo:string[]){this.dpInfo = displayInfo;}
  public setDisplayCounts(displayCounts:number){this.dpCounts = displayCounts;}

  public setConnectMode(connectMode:string){this.connectMode = connectMode;}
  public setIsRemoved(isRemoved:boolean){this.isRemoved = isRemoved;}
  public setIsConnectingWifi(isConnectingWifi:boolean){this.isConnectingWifi = isConnectingWifi;}

  public setActiveWifiId(activeWifiId:string){this.activeWifiId = activeWifiId;}
  public setIsActiveWifi(isActive:boolean){this.isActiveWifi = isActive;}

  public getSerialNo(){return this.serialNo}
}

var ADBConnectProvider: React.FC<{}> = ({ children }) => {
  // const [selectDeviceId,setSelectDeviceId] = useState<string>('');
  // const [selectDeviceIndex,setSelectDeviceIndex] = useState<number>(-1);
  const [deviceArr, setDeivceArr] = useState<any>([]);
  const [deviceCounts, setDeivceCounts] = useState<number>(0);
  const [mDisplayInfo,setDisplayInfo] = useState<any>([]);
  const [mDisplayCounts,setDisplayCounts] = useState<number>(0);
  const [mDeviceWifi,setDeviceWifi] = useState<any>([]);
  const [mWifiIsConnecting,setWifiConnecting] = useState<boolean>(false);
  const [mWifiConnectData,setWifiConnectData] = useState<any>([]);

  const [mWifiDeviceRemove,setMyWifiDeviceRemove] = useState<any>([]);

  const [deviceData,setDeviceData] = useState<any>([]);
  

  const {currentSelectDeviceId,currentSelectIndex,setCurrentSelectIndex,setCurrentSelectDeviceId} = useContext(ADBSelectContext)
  var aO = new DeviceObject()
  const [deviceObjects,setDeviceObjects] = useState<DeviceObject[]>([]);

  function addDeviceObjects(objs:DeviceObject){
    var dO:DeviceObject[] = [];
    dO = deviceObjects;
    dO.push(objs)
    //setDeviceObjects(dO)
    var filtData = filtWifi(dO);
    setDeviceObjects(filtData)
  }

  function filtWifi(myArray:DeviceObject[]){
    var newArr:DeviceObject[] = []
    for (var i=0; i < myArray.length; i++) {
        if (myArray[i].id?.includes(':')) {
            var newDo = new DeviceObject();
            newDo.setId(myArray[i-1].id);
            newDo.setType(myArray[i-1].type);
            newDo.setSerialNo(myArray[i-1].serialNo);
            newDo.setWifiId(myArray[i-1].wifiId);
            newDo.setDisplayInfo(myArray[i-1].dpInfo);
            newDo.setDisplayCounts(myArray[i-1].dpCounts);
            newDo.setIsRemoved(myArray[i-1].isRemoved);
            newDo.setIsConnectingWifi(false);
            newDo.setIsActiveWifi(true);
            newDo.setActiveWifiId(myArray[i].id);
            newArr.pop();
            newArr.push(newDo);
        }
        else{
          newArr.push(myArray[i])
        }
    }
    return newArr
  }

  function setWifiDataByIndex(tag:boolean,val:string,index:number,device?:any){
    var data = mWifiConnectData;
    data[index] = device?[tag,val,device]:[tag,val];
    setWifiConnectData(data);
  }

  function setWifiNetworkIsConnecting(tag:boolean){
    setWifiConnecting(tag);
  }

  function setDeivceArrayAndLength(tag: any) {
    setDeivceArr(tag);
    setDeivceCounts(tag.length);
  }

  function setWifiDeivceRemoveAndSave(tag: any) {
    setMyWifiDeviceRemove(tag)
  }

  function execResult(cmd:string,callback:any){
    exec(cmd, function(error:any, stdout:any, stderr:any){
      if(error) {console.error('error' + ':\n' + error);return;}
      console.log('stdout' + ':\n' + stdout);
      callback(stdout)
    });
  }

  useEffect( () => {
    //execCMD('adb disconnect')
    const client = adb.createClient()


    client.trackDevices()
    .then(function(tracker:any) {
      tracker.on('add', function(device:any) {
        console.log('Device %s was plugged', device.id);

        var deviceObject = new DeviceObject();

        deviceObject.setId(device.id)
        deviceObject.setType(device.id.includes('emulator')?'emulator':device.id.includes(':')?'wifi':'hardware')

        execCMDPromise(`adb -s ${device.id} shell getprop ro.serialno`,function(val:any){
          deviceObject.setSerialNo(val)
          execCMDPromise(`adb -s ${device.id} shell ip addr show wlan0 | grep 'inet\\s' | awk '{print $2}' | awk -F'/' '{print $1}'`,function(val:any){
            deviceObject.setWifiId(val)
            execCMDPromise(`adb -s ${device.id} shell dumpsys display | grep 'mBaseDisplayInfo=DisplayInfo{"' | awk -F'",' '{print $1}'`,function(val:any){
              var counts = val.match(/mBaseDisplayInfo=DisplayInfo{"/gi).length;
              var displayArr = [];
              for(var i = 0;i< counts;i++){
                displayArr.push(val.replace(/mBaseDisplayInfo=DisplayInfo{"/g, '').split('",')[i].replace(/ /g, ''))
              }
              deviceObject.setDisplayInfo(displayArr)
              deviceObject.setDisplayCounts(counts)
              deviceObject.setIsRemoved(false)
              deviceObject.setIsConnectingWifi(false)
              deviceObject.setIsActiveWifi(false)
              deviceObject.setActiveWifiId('')
            })
    
          })
        })



        addDeviceObjects(deviceObject);
        // 应该只刷一次
      })

      tracker.on('remove', function(device:any) {
        console.log('Device %s was unplugged', device.id);
      })
      tracker.on('end', function() {
        console.log('Tracking stopped')
      })
      tracker.on('change', function(device:any) {
        //console.log('Device %s was change', device.id);
        //console.log(device)
      })
      tracker.on('changeSet', function(changes:any) {
        //console.log(changes)
      })
    })
    .catch(function(err:any) {
      console.error('Something went wrong:', err.stack)
    })

  },[]);
  
  const reupdateData = () =>{
    adb.createClient().listDevices()
    .then(function(devices:any) {
      setDevicesNameByTracking(devices)
      setDevicesWifiByTracking(devices)
      setDevicesDisplayInfoByTracking(devices)
    })
    .catch(function(err:any) {
      console.error('Something went wrong:', err.stack)
    })
  }

  const setDevicesNameByTracking = (devices:any) =>{
      var currentData:any = [];
      new Promise((resolve, reject) =>{
        for(var i = 0;i < devices.length;i++){
          if(devices[i].id && !devices[i].id.includes(":")){
            currentData.push(`${devices[i].id}`)
          }
        }
        resolve(currentData)
      }).then(function(val:any){
        setDeivceArrayAndLength(val)
      })
  }

  const setDevicesNameNotUpdateWifiState = (devices:any) =>{
    var currentData:any = [];
    new Promise((resolve, reject) =>{
      for(var i = 0;i < devices.length;i++){
        if(devices[i][1] && !devices[i][1].includes(":")){
          currentData.push(`${devices[i][1]}`)
        }
      }
      resolve(currentData)
    }).then(function(val:any){
      setDeivceArrayAndLength(val)
    })
  }


  const endlessWifiInfoNotUpdateWifiState = (data:any,devices:any,counts:number) =>{
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
        console.log('wifi' + val)
        return endlessWifiInfo(data,devices,counts+1);
      }
      else{
        data.push(val);
        console.log('wifi' + val)
        setDeviceWifi(data);
        //console.log(data)
      }
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
        console.log('wifi' + val)
        return endlessWifiInfo(data,devices,counts+1);
      }
      else{
        data.push(val);
        console.log('wifi' + val)
        setDeviceWifi(data);
        //console.log(data)
      }
    })
  }



  const setDevicesWifiByTracking = (devices:any) =>{
    var logicalDevices:any = [];
    var realDevices:any = [];
    new Promise((resolve, reject) =>{
      var index = 0;
      for(var i = 0;i < devices.length;i++){
        if(devices[i].id && !devices[i].id.includes(":")){
          if(devices[i].id.includes("emulator")){
            logicalDevices.push([])
            setWifiDataByIndex(false,devices[i].id,index,'')
            index++;
          }
          else{
            logicalDevices.push(devices[i])
            setWifiDataByIndex(false,devices[i].id,index,'')
            index++
          }
        }
      }
      resolve(logicalDevices)
    }).then(function(val){
      if(val.length === 0){
        setDeviceWifi([]);
      }
      else{
        endlessWifiInfo([],val,0);
      }
    })

  }

  const setDevicesWifiNotUpdateWifiState = (devices:any) =>{
    var logicalDevices:any = [];
    new Promise((resolve, reject) =>{
      var index = 0;
      for(var i = 0;i < devices.length;i++){
        if(devices[i].id && !devices[i].id.includes(":")){
          if(devices[i].id.includes("emulator")){
            logicalDevices.push([])
            index++;
          }
          else{
            logicalDevices.push(devices[i])
            index++
          }
        }
      }
      resolve(logicalDevices)
    }).then(function(val){
      if(val.length === 0){
        setDeviceWifi([]);
      }
      else{
        endlessWifiInfoNotUpdateWifiState([],val,0);
      }
    })

  }

  const endlessDevicesDisplayInfo = (data:any,devices:any,counts:number) =>{
    new Promise((resolve, reject) =>{
      exec(`adb -s ${devices[counts]} shell dumpsys display | grep 'mBaseDisplayInfo=DisplayInfo{"' | awk -F'",' '{print $1}'`, function(error:any, stdout:any, stderr:any){
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
        data.push([`${devices[counts]} - ${val?val:`display ${counts}`}`,`${devices[counts]} - ${val?val:`display ${counts}`}`]);
        return endlessDevicesDisplayInfo(data,devices,counts+1);
      }
      else{
        data.push([`${devices[counts]} - ${val?val:`display ${counts}`}`,`${devices[counts]} - ${val?val:`display ${counts}`}`]);
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
          logicalDevices.push(devices[i].id)
        }
      }
      resolve(logicalDevices)
    }).then(function(val:any){
      //console.log(val)
      if(val.length === 0){
        setDeviceWifi([]);
      }
      else{
        endlessDevicesDisplayInfo([],val,0);
      }
      
    })
  }

  const setDevicesDisplayInfoNotUpdateWifiState = (devices:any) => {
    var logicalDevices:any = [];
    new Promise((resolve, reject) =>{
      for(var i = 0;i < devices.length;i++){
        if(devices[i][1] && !devices[i][1].includes(":")){
          logicalDevices.push(devices[i][1])
        }
      }
      resolve(logicalDevices)
    }).then(function(val:any){
      //console.log(val)
      if(val.length === 0){
        setDeviceWifi([]);
      }
      else{
        endlessDevicesDisplayInfo([],val,0);
      }
      
    })
  }


  var wifiLogcat = false;

  const endlessPortConnect = (id:any,ip:any,index:number)=>{
    execCMDPromise(`adb -s ${id} connect ${ip}`,(out:any)=>{
      if(wifiLogcat) console.log(out)
      execCMDPromise("adb devices",(out:any)=>{
        if(wifiLogcat) console.log(out)
        if(wifiLogcat) console.log(out.toString().includes('failed'))
        if(out.toString().includes(ip)){
          console.log(`无线连接成功，可以掉数据线,地址为 ${ip}`)

          setWifiNetworkIsConnecting(false)
          setWifiDataByIndex(true,id,index,ip.split(":")[0]);
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
          if(wifiLogcat) console.log(`设备 ${id} Root 成功，开启后续连接`)
          execCMDPromise(`adb -s ${id} shell ip addr show wlan0 | grep 'inet\\s' | awk '{print $2}' | awk -F'/' '{print $1}'`,(out:any)=>{
            var ipArr = out.toString();
            if(wifiLogcat) console.log(out);
            if(wifiLogcat) console.log('设备 IP 地址为 ' + ipArr + ' ,连接中')
            execCMDPromise(`adb -s ${id} tcpip ` + portNum,(out:any)=>{
              if(wifiLogcat) console.log(out)
              if(wifiLogcat) console.log('端口为 ' + portNum +' ,连接中');
              var ipAddressWithoutBr = (ipArr + ':'+portNum).replace(/\n|\r/g, "")
              if(wifiLogcat) console.log(`adb -s ${id} connect ` + ipAddressWithoutBr)
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

    setWifiNetworkIsConnecting(true)
    
    //adb disconnect;
    execCMDPromise(`adb -s ${deviceId} root;`,(out:any)=>{
      if(wifiLogcat) console.log(out);
      if(wifiLogcat) console.log('ADB 重连，Root 成功')
      endlessRootConnect(deviceId,portNum,deviceIndex)
    })
  }

  const setUSBConnection = (deviceId:string,deviceIndex:number) =>{
    setWifiNetworkIsConnecting(false)
    setWifiDataByIndex(false,deviceId,deviceIndex);
  }


  return (
    <ADBConnectContext.Provider
      value={{
        // currentSelectDeviceId:selectDeviceId,
        // setCurrentSelectDeviceId:setSelctDeviceIdAndSave,
        // currentSelectIndex:selectDeviceIndex,
        // setCurrentSelectIndex:setSelectDeviceIndexAndSave,
        connectedDevice:deviceArr,
        connectedDeviceCounts:deviceCounts,
        displayInfo:mDisplayInfo,
        displayCounts:mDisplayCounts,
        deviceWifi:mDeviceWifi,
        
        isWifiOnConnect:mWifiConnectData,

        isWifiDeviceRemoved:mWifiDeviceRemove,
        setIsWifiDeviceRemoved:setMyWifiDeviceRemove,

        wifiIsConnecting:mWifiIsConnecting,
        setWifiIsConnecting:setWifiNetworkIsConnecting,

        startWifiConnection:setWifiConnection,
        startUSBConnection:setUSBConnection,

        updateData:reupdateData,
        deviceTarget:deviceObjects,

      }}>
      {children}
    </ADBConnectContext.Provider>
  );
};

export default ADBConnectProvider;