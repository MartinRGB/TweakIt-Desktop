import React, { createContext, useState,useEffect} from "react";
import initState from "@Config/init_state.json";
import {execCMD,execCMDPromise,exec} from '@Helpers/ADBCommand/ADBCommand';
import adb from 'adbkit';

export var ADBConnectContext = createContext({
  currentSelectId:'',
  setCurrentSelectId:(tag:string) => {},
  connectedDevice: [],
  connectedDeviceLength:0,
  displayInfo: [],
  displayCounts:0,
  deviceWifi:[],
  startWifiConnection:(tag:string) => {},
});

var ADBConnectProvider: React.FC<{}> = ({ children }) => {
  const [selectId,setSelectId] = useState<string>('');
  const [deviceArr, setDeivceArr] = useState<any>([]);
  const [deviceLen, setDeivceLen] = useState<number>(0);
  const [mDisplayInfo,setDisplayInfo] = useState<any>([]);
  const [mDisplayCounts,setDisplayCounts] = useState<number>(0);
  const [mDeviceWifi,setDeviceWifi] = useState<any>([]);

  function setSelctIdAndSave(tag:string){
    setSelectId(tag)
  }

  function setDeivceArrayAndLength(tag: any) {
    setDeivceArr(tag);
    setDeivceLen(tag.length);
  }

  useEffect( () => {
    const client = adb.createClient()

    client.trackDevices()
    .then(function(tracker:any) {
      tracker.on('add', function(device:any) {
        console.log('Device %s was plugged', device.id);


          client.listDevices()
          .then(function(devices:any) {
            setDevicesNameByTracking(devices)
            setDevicesWifiByTracking(devices)
            setDevicesDisplayInfo(devices)
          })
          .catch(function(err:any) {
            console.error('Something went wrong:', err.stack)
          })

      })
      tracker.on('remove', function(device:any) {
        console.log('Device %s was unplugged', device.id);
        
          client.listDevices()
          .then(function(devices:any) {
            setDevicesNameByTracking(devices)
            setDevicesWifiByTracking(devices)
            setDevicesDisplayInfo(devices)
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
      var currentData = [];
      for(var i = 0;i < devices.length;i++){
        if(devices[i].id && !devices[i].id.includes(":")){
          currentData.push({ value: `${devices[i].id}`})
        }
      }
      setDeivceArrayAndLength(currentData)
  }

  const setDevicesWifiByTracking = (devices:any) =>{


    var currentData:any = [];

    var p1 = new Promise((resolve, reject) => {
      for(var i = 0;i < devices.length;i++){
        if(devices[i].id && !devices[i].id.includes(":")){
  
          exec(`adb -s ${devices[i].id} shell ip addr show wlan0 | grep 'inet\\s' | awk '{print $2}' | awk -F'/' '{print $1}'`, function(error:any, stdout:any, stderr:any){
            console.log(stdout)
            currentData.push(stdout)
          })

          if(i === devices.length - 1){

            
          }
  
        }
      }
      resolve(currentData)
    });
    
    p1.then(value => {
      setDeviceWifi(value)
      console.log(value)
    }, reason => {
      console.error(reason); // 出错了！
    });

    

  
  }

  const setDevicesDisplayInfo = (devices:any) => {

    var currentData:any = [];
    for(var i = 0;i < devices.length;i++){
      if(devices[i].id && !devices[i].id.includes(":")){

        var currentId = devices[i].id;

        execCMDPromise(`adb -s ${devices[i].id} shell dumpsys display | grep 'mBaseDisplayInfo=DisplayInfo{"' | awk -F'",' '{print $1}'`,'',(value:any)=>{
          var mValue = value.split('mBaseDisplayInfo=DisplayInfo{"')[1].split(', ')[1].replace("Id","");
          currentData.push({ value: `${currentId} - ${mValue}`});
    
        });
      }
    }

    setDisplayInfo(currentData);
    setDisplayCounts(currentData.length)
    
  }

  const setWifiConnection = (deviceId:string) =>{
    var ipArr = '';
    var portNum = '9999'

    exec('adb disconnect;adb root;', function(error:any, stdout:any, stderr:any){
        if(error) {
            console.error('error: ' + error);
            return;
        }

        console.log(stdout)

        console.log(`adb -s ${deviceId} shell ip addr show wlan0 | grep 'inet\\s' | awk '{print $2}' | awk -F'/' '{print $1}'`)
        exec(`adb -s ${deviceId} shell ip addr show wlan0 | grep 'inet\\s' | awk '{print $2}' | awk -F'/' '{print $1}'`, function(error:any, stdout:any, stderr:any){
            if(error) {
                console.error('error: ' + error);
                return;
            }
    
            console.log(stdout)
            console.log(stderr)
            ipArr = stdout.toString();
            //connectionEl.innerHTML = '设备 IP 地址为 ' + ipArr + ' ,连接中';
            console.log('设备 IP 地址为 ' + ipArr + ' ,连接中')

            exec(`adb -s ${deviceId} tcpip ` + portNum, function(error:any, stdout:any, stderr:any){
                if(error) {
                    console.error('error: ' + error);
                    return;
                }
        
                console.log(stdout)
                //connectionEl.innerHTML = '端口为 ' + portNum +' ,连接中';
                console.log('端口为 ' + portNum +' ,连接中');

                var ipAddressWithoutBr = (ipArr + ':'+portNum).replace(/\n|\r/g, "")
                exec(`adb -s ${deviceId} connect ` + ipAddressWithoutBr, function(error:any, stdout:any, stderr:any){
                    if(error) {
                        console.error('error: ' + error);
                        return;
                    }

                    console.log(stdout)
                    console.log(stderr)
                    exec("adb devices", function(error:any, stdout:any, stderr:any){
                        if(error) {
                            console.error('error: ' + error);
                            return;
                        }
        
                        console.log(stdout.toString());
                        if(stdout.toString().includes(ipAddressWithoutBr)){
                            //connectionEl.innerHTML = '无线连接成功，请拔掉数据线,地址为 ' + ipAddressWithoutBr;
                            console.log('无线连接成功，请拔掉数据线,地址为 ' + ipAddressWithoutBr)
                        }
                        
                    });
                    
                });
            });
        });
      });
  }

  return (
    <ADBConnectContext.Provider
      value={{
        currentSelectId:selectId,
        setCurrentSelectId:setSelctIdAndSave,
        connectedDevice:deviceArr,
        connectedDeviceLength:deviceLen,
        displayInfo:mDisplayInfo,
        displayCounts:mDisplayCounts,
        deviceWifi:mDeviceWifi,
        startWifiConnection:setWifiConnection,
      }}>
      {children}
    </ADBConnectContext.Provider>
  );
};

export default ADBConnectProvider;