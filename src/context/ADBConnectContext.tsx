import React, { createContext, useState,useEffect,useContext} from "react";
import initState from "@Config/init_state.json";
import {execCMD,execCMDPromise,exec} from '@Helpers/ADBCommand/ADBCommand';
import adb from 'adbkit';
import {ADBSelectContext} from '@Context/ADBSelectContext'

export var ADBConnectContext = createContext({
  // currentSelectDeviceId:'',
  // setCurrentSelectDeviceId:(tag:string) => {},
  // currentSelectIndex:-1,
  // setCurrentSelectIndex:(tag:number) => {},
  connectedDevice: [],
  connectedDeviceCounts:0,
  realConnectedDevice: [],
  realConnectedDeviceCounts:0,
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

  isReUpdate:false,
  updateData:() => {},
});

var ADBConnectProvider: React.FC<{}> = ({ children }) => {
  // const [selectDeviceId,setSelectDeviceId] = useState<string>('');
  // const [selectDeviceIndex,setSelectDeviceIndex] = useState<number>(-1);
  const [deviceArr, setDeivceArr] = useState<any>([]);
  const [deviceCounts, setDeivceCounts] = useState<number>(0);
  const [realDeviceArr, setRealDeviceArr] = useState<any>([]);
  const [realDeviceCounts,setRealDeviceCounts] = useState<number>(0);
  const [mDisplayInfo,setDisplayInfo] = useState<any>([]);
  const [mDisplayCounts,setDisplayCounts] = useState<number>(0);
  const [mDeviceWifi,setDeviceWifi] = useState<any>([]);
  const [mWifiIsConnecting,setWifiConnecting] = useState<boolean>(false);
  const [mWifiConnectData,setWifiConnectData] = useState<any>([]);

  const [mWifiDeviceRemove,setMyWifiDeviceRemove] = useState<any>([]);
  
  const [isRequestUpdate,setIsRequestUpdate] = useState<boolean>(false);

  

  const {currentSelectDeviceId,currentSelectIndex,setCurrentSelectIndex,setCurrentSelectDeviceId} = useContext(ADBSelectContext)

  function setWifiDataByIndex(tag:boolean,val:string,index:number,device?:any){
    var data = mWifiConnectData;
    data[index] = device?[tag,val,device]:[tag,val];
    setWifiConnectData(data);
  }

  function cleanWifiData(){
    setWifiConnectData([]);
  }

  function setWifiNetworkIsConnecting(tag:boolean){
    setWifiConnecting(tag);
  }

  function setDeivceArrayAndLength(tag: any) {
    setDeivceArr(tag);
    setDeivceCounts(tag.length);
    console.log('list deivce: ' + tag)
    console.log('list deivce counts: ' + tag.length)
  }

  function setRealDeviceArrayAndLength(tag:any,listTag:any){

    //console.log(tag)
    var data:any = [];
    new Promise((resolve, reject) =>{
      for(var i=0;i<tag.length;i++){
        if(tag[i].includes(':')){
          execCMDPromise(`adb -s ${tag[i]} shell getprop ro.serialno`,function(val:any){
            //console.log(val)
            data.push(val.replace(/(\r\n|\n|\r)/gm, ""))
            resolve(data)
          })
        }
        else{
          data.push(tag[i])
        }
      }

      // TODO!!!!
      //resolve(data)
      
    }).then(function(val:any){
      //console.log(val)
      new Promise((resolve, reject) =>{

        function remove_duplicates_es6(arr:any) {
          let s = new Set(arr);
          let it = s.values();
          return Array.from(it);
        }
        resolve(remove_duplicates_es6(val))
      }).then(function(value:any){
        setRealDeviceArr(value)
        setRealDeviceCounts(value.length);
        console.log('real deivce: ' + value)
        console.log('real deivce counts: ' + value.length)

        console.log('pass list deivce: ' + listTag)
        console.log('pass list counts: ' + listTag.length)


        var reupdateCondition = !(value.length === listTag.length)
        console.log(reupdateCondition)
        if(reupdateCondition){
          console.log('reupdate')
          //cleanWifiData();
          setIsRequestUpdate(true);
          requestReupdateData(value,listTag)
        }
        else{
          console.log('hold')
          setIsRequestUpdate(false)
          //holdUpDateData(listTag)
        }
      })
    })
  
  }

  function setWifiDeivceRemoveAndSave(tag: any) {
    setMyWifiDeviceRemove(tag)
  }

  function cleanWifiDeviceRemoveData(){
    setMyWifiDeviceRemove([]);
  }

  useEffect( () => {
    const client = adb.createClient()


    execCMDPromise('adb disconnect',function(val:any){

      client.trackDevices()
      .then(function(tracker:any) {
        tracker.on('add', function(device:any) {
          console.log('Device %s was plugged', device.id);
          // 应该只刷一次
  
          listAddUpdateFuns()
  
        })
        tracker.on('remove', function(device:any) {
          console.log('Device %s was unplugged', device.id);
          listRemoveUpdateFuns()
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

    })



    const listAddUpdateFuns = () =>{
      new Promise((resolve, reject) =>{
        var shouldReupdate = true;
        var wifiIndex = -1;
        for(var i = 0;i<mWifiConnectData.length;i++){
          shouldReupdate = true;
          wifiIndex = -1;
          if(mWifiConnectData[i][0] === true){
            shouldReupdate = false;
            wifiIndex = i;
            break;
          }
        }
        resolve([shouldReupdate,wifiIndex,mWifiConnectData])
      }).then(function(val:any){
        if(val[0] === true){
          console.log('add update')
          //setMyWifiDeviceRemove(false)
          var removeData = [];for(var i=0;i<val[2].length;i++){removeData.push(false);}
          setWifiDeivceRemoveAndSave(removeData);
          setCurrentSelectIndex(-1)
          client.listDevices()
          .then(function(devices:any) {
            // var removeData = [];for(var i=0;i<devices.length;i++){removeData.push(false);}
            // setWifiDeivceRemoveAndSave(removeData);
            setDevicesNameByTracking(devices)
            setDevicesWifiByTracking(devices)
            setDevicesDisplayInfoByTracking(devices)
          })
          .catch(function(err:any) {
            console.error('Something went wrong:', err.stack)
          })
  
        }
        else{
          console.log('add hold')
          console.log('list device ' + deviceCounts);
          console.log('real device ' + realDeviceCounts);
          //setMyWifiDeviceRemove(false)
          setCurrentSelectIndex(val[1])
          //TODO
          //console.log(val[2][val[1]][2])
          //if(val[2][val[1]][2]) setCurrentSelectDeviceId(val[2][val[1]][2])
          //else 
          setCurrentSelectDeviceId(val[2][val[1]][1])
          
          var removeData = [];for(var i=0;i<val[2].length;i++){removeData.push(false);}
          setWifiDeivceRemoveAndSave(removeData);
          client.listDevices()
          .then(function(devices:any) {


            setRealDeviceCountsAndSave(devices,val[2])

            setDevicesNameNotUpdateWifiState(val[2])
            setDevicesWifiNotUpdateWifiState(devices)
            setDevicesDisplayInfoNotUpdateWifiState(val[2])
          })
          .then(function(){
          })
          .catch(function(err:any) {
            console.error('Something went wrong:', err.stack)
          })
        }
      })
    }

    //remove if(currendId != deviceID) | remove hold deviceId's position

    const listRemoveUpdateFuns = () =>{
      new Promise((resolve, reject) =>{
        var shouldReupdate = true;
        var wifiIndex = -1;

        console.log(mWifiConnectData)
        for(var i = 0;i<mWifiConnectData.length;i++){
          shouldReupdate = true;
          wifiIndex = -1;
          if(mWifiConnectData[i][0] === true){
            shouldReupdate = false;
            wifiIndex = i;
            break;
          }
        }
        resolve([shouldReupdate,wifiIndex,mWifiConnectData])
      }).then(function(val:any){
        if(val[0] === true){
          console.log('remove update')
          //setMyWifiDeviceRemove(false)
          var removeData = [];for(var i=0;i<val[2].length;i++){removeData.push(false);}
          setWifiDeivceRemoveAndSave(removeData);
          setCurrentSelectIndex(-1)
          client.listDevices()
          .then(function(devices:any) {
            setDevicesNameByTracking(devices)
            setDevicesWifiByTracking(devices)
            setDevicesDisplayInfoByTracking(devices)
          })
          .catch(function(err:any) {
            console.error('Something went wrong:', err.stack)
          })
  
        }
        else{
          console.log('remove hold')
          console.log('list device ' + deviceCounts);
          console.log('real device ' + realDeviceCounts);
          //setMyWifiDeviceRemove(true)
          var removeData:any = [];
          setCurrentSelectIndex(val[1])
          //TODO
          //if(val[2][val[1]][2]) setCurrentSelectDeviceId(val[2][val[1]][2])
          //else 
          setCurrentSelectDeviceId(val[2][val[1]][1])

          for(var i=0;i<val[2].length;i++){if(i === val[1]){removeData.push(true);}else{removeData.push(false);}}
          setWifiDeivceRemoveAndSave(removeData);
          client.listDevices()
          .then(function(devices:any) {


            setRealDeviceCountsAndSave(devices,val[2])

            setDevicesNameNotUpdateWifiState(val[2])
            setDevicesWifiNotUpdateWifiState(devices)
            setDevicesDisplayInfoNotUpdateWifiState(val[2])
          })
          .then(function(){
          })
          .catch(function(err:any) {
            console.error('Something went wrong:', err.stack)
          })
        }
      })
    }



  },[]);
  

  const requestReupdateData = (realData:any,listData:any) =>{
    
    var wifiData = mWifiConnectData;
    for(var i=0;i<listData.length - realData.length;i++){
      wifiData.pop()
      console.log('pop')
    }
    setWifiConnectData(wifiData);

    console.log(currentSelectIndex)
    if(currentSelectIndex !=0)
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
      var realCurrentData:any = [];
      new Promise((resolve, reject) =>{
        for(var i = 0;i < devices.length;i++){
          if(devices[i].id && !devices[i].id.includes(":")){
            currentData.push(`${devices[i].id}`)
          }
          realCurrentData.push(`${devices[i].id}`)
        }
        resolve([currentData,realCurrentData])
      }).then(function(val:any){
        setDeivceArrayAndLength(val[0])
        //setRealDeviceArrayAndLength(val[1],val[0])
        //setRealDeviceCountsAndSave(val[1],val[0])
      })
  }

  const setRealDeviceCountsAndSave = (devices:any,listDevices:any)=>{
    new Promise((resolve, reject) =>{
      var realCurrentData:any = [];
      var listCurrentData:any = [];
      for(var i = 0;i < devices.length;i++){
        realCurrentData.push(`${devices[i].id}`)
      }

      for(var i = 0;i < listDevices.length;i++){
        listCurrentData.push(`${listDevices[i][1]}`)
      }
      resolve([realCurrentData,listCurrentData])
    }).then(function(val:any){
      setRealDeviceArrayAndLength(val[0],val[1])
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
        //console.log('wifi' + val)
        return endlessWifiInfo(data,devices,counts+1);
      }
      else{
        data.push(val);
        //console.log('wifi' + val)
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
        //console.log('wifi' + val)
        return endlessWifiInfo(data,devices,counts+1);
      }
      else{
        data.push(val);
        //console.log('wifi' + val)
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
        //,`${devices[counts]} - ${val?val:`display ${counts}`}`
        data.push([`${devices[counts]} - ${val?val:`display ${counts}`}`]);
        return endlessDevicesDisplayInfo(data,devices,counts+1);
      }
      else{
        //,`${devices[counts]} - ${val?val:`display ${counts}`}`
        data.push([`${devices[counts]} - ${val?val:`display ${counts}`}`]);
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
        // if(devices[i][1] && !devices[i][1].includes(":")){
        //   logicalDevices.push(devices[i][1])
        // }
        logicalDevices.push(devices[i][1])
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
    setWifiDataByIndex(false,deviceId,deviceIndex,'');
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
        realConnectedDevice:realDeviceArr,
        realConnectedDeviceCounts:realDeviceCounts,
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

        isReUpdate:isRequestUpdate,
        updateData:requestReupdateData,

      }}>
      {children}
    </ADBConnectContext.Provider>
  );
};

export default ADBConnectProvider;