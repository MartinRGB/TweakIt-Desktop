import React, { createContext, useState,useEffect} from "react";
import initState from "@Config/init_state.json";
import {execCMD,execCMDPromise,exec} from '@Helpers/ADBCommand/ADBCommand';
import adb from 'adbkit';

export var ADBConnectContext = createContext({
  connectedDevice: [],
  setConnectedDevice: (tag: any) => {},
  connectedDeviceLength:0,
  displayInfo: [],
  displayCounts:0,
  deviceWifi:'',
  startWifiConnection:() => {},
});

var ADBConnectProvider: React.FC<{}> = ({ children }) => {
  const [deviceArr, setDeivceArr] = useState<any>([]);
  const [deviceLen, setDeivceLen] = useState<number>(0);
  const [mDisplayInfo,setDisplayInfo] = useState<any>([]);
  const [mDisplayCounts,setDisplayCounts] = useState<number>(0);
  const [mDeviceWifi,setDeviceWifi] = useState<string>('');

  function setDeivceArrAndSave(tag: any) {
    setDeivceArr(tag);
    setDeivceLen(tag.length);
  }


  useEffect( () => {
    const client = adb.createClient()
//     client.getDHCPIpAddress(serial[, iface][, callback])
// Attemps to retrieve the IP address of the device. Roughly analogous to adb shell getprop dhcp.<iface>.ipaddress.

// serial The serial number of the device. Corresponds to the device ID in client.listDevices().
// iface Optional. The network interface. Defaults to 'wlan0'.
// callback(err, ip) Optional. Use this or the returned Promise.
// err null when successful, Error otherwise.
// ip The IP address as a String.


    client.trackDevices()
    .then(function(tracker:any) {
      tracker.on('add', function(device:any) {
        //if(!device.id.includes(":")){
          getDisplayInfo(device.id);
        //}
       
        if(!device.id.includes(":")){
          getDisplayWifi(device.id)
        }
        var deviceInList = false;
        for(var i = 0; i < deviceArr.length; i++) {
            if (deviceArr[i].value && deviceArr[i].value === `${device.id}`) {
                deviceInList = true;
                break;
            }
        }
        if(!deviceInList){
          var currentData = deviceArr;
          currentData.push({ value: `${device.id}`})
          setDeivceArrAndSave(currentData)
        }

      })
      tracker.on('remove', function(device:any) {
        console.log('Device %s was unplugged', device.id);
        
        var currentData = deviceArr;

        for (var i = 0; i < currentData.length; i++){
          if (currentData[i].value && currentData[i].value === device.id) { 
              currentData.splice(i, 1);
              break;
          }
        }

        // TODO

        setDeivceArrAndSave(currentData)

      })
      tracker.on('end', function() {
        console.log('Tracking stopped')
      })
    })
    .catch(function(err:any) {
      console.error('Something went wrong:', err.stack)
    })}
  ,[]);

  const getDisplayWifi = (device:any) => {
    var k:any = [];
    var v:any = [];
    var s:any = [];
    execCMDPromise(`adb -s ${device} shell ip addr show wlan0 | grep 'inet\\s' | awk '{print $2}' | awk -F'/' '{print $1}'`,'',(value:any)=>{
        var stdString = value.toString();
        // var mValue = value.split('inet')[1].split(' ')[1].split('/')[0];

        // console.log(mValue)
        setDeviceWifi(stdString)
    });
    
  }

  const setWifiConnection = () =>{
    var ipArr = '';
    var portNum = '9999'

    // exec('adb disconnect;adb root;')
    // .then(exec("adb shell ip addr show wlan0 | grep 'inet\\s' | awk '{print $2}' | awk -F'/' '{print $1}'"))
    // .then(exec("adb tcpip " + portNum))
    // .then(exec("adb connect " + mDeviceWifi +':' +portNum))
    // .then(exec("adb devices"))
    
    exec('adb disconnect;adb root;', function(error:any, stdout:any, stderr:any){
        if(error) {
            console.error('error: ' + error);
            return;
        }

        console.log(stdout)

        exec("adb shell ip addr show wlan0 | grep 'inet\\s' | awk '{print $2}' | awk -F'/' '{print $1}'", function(error, stdout, stderr){
            if(error) {
                console.error('error: ' + error);
                return;
            }
    
            console.log(stdout)
            ipArr = stdout.toString();
            //connectionEl.innerHTML = '设备 IP 地址为 ' + ipArr + ' ,连接中';
            console.log('设备 IP 地址为 ' + ipArr + ' ,连接中')

            exec("adb tcpip " + portNum, function(error:any, stdout:any, stderr:any){
                if(error) {
                    console.error('error: ' + error);
                    return;
                }
        
                console.log(stdout)
                //connectionEl.innerHTML = '端口为 ' + portNum +' ,连接中';
                console.log('端口为 ' + portNum +' ,连接中');

                var ipAddressWithoutBr = (ipArr + ':'+portNum).replace(/\n|\r/g, "")
                exec("adb connect " + ipAddressWithoutBr, function(error:any, stdout:any, stderr:any){
                    if(error) {
                        console.error('error: ' + error);
                        return;
                    }

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

  const getDisplayInfo = (device:string) =>{
    var k:any = [];
    var v:any = mDisplayInfo;
    var s:any = [];
    var counts = 0;
    execCMDPromise(`adb -s ${device} shell dumpsys display | grep "mBaseDisplayInfo=DisplayInfo"`,'',(value:any)=>{
        //console.log(value)

        var stdString = value.toString();
        stdString = stdString.match(/(?<=\")(.*?)(?=\")/g);

        var mValue = value.split(', uniqueId')[0].split('"')[1].split(', ')[1];
        v.push({ value: `${device} - ${mValue.replace("Id","")}`});

        // for(var i = 0;i<stdString.length;i++){
        //     if(stdString[i].includes('displayId')){
        //         counts++;
        //         s.push(stdString[i]);
        //     }
        // }

        // for(var a=0;a<s.length;a++){
        //     //k.push(s[a].split(', display')[0]);
        //     //v.push(s[a].split(', displayId ')[1]);
        //     v.push({ value: `${device} - ${s[a].split(', ')[1]}`});
        // }

        setDisplayInfo(v)
        setDisplayCounts(counts)
    });
    
  }

  return (
    <ADBConnectContext.Provider
      value={{
        connectedDevice:deviceArr,
        setConnectedDevice: setDeivceArrAndSave,
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