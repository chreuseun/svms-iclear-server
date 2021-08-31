'use strict';

const { networkInterfaces, platform } = require('os');
const nets = networkInterfaces();

//  windows machine handler
const windowsOps =  () => {
    try{
        const wifi = nets['Wi-Fi']
        const parseIpV4 = wifi.find(_wifi => _wifi.family === 'IPv4');
        const {address =''} = parseIpV4 || {}

        return  address || '127.0.0.1' 
    }catch(e){
        return  '127.0.0.1' 
    }
   
}

// mac machine handler
const macOps =  () => {
    try{
    const wifi = nets['en0']
    const parseIpV4 = wifi.find(_wifi => _wifi.family === 'IPv4');
    const {address =''} = parseIpV4 || {};

     return  address || '127.0.0.1'
    }catch(e){
        return '127.0.0.1'
    }
}

const OPERATING_SYS =  {
    darwin: macOps,
    win32: windowsOps,
    win64: windowsOps,
    linux: macOps
}

const empt = () => {
    console.log('----- IP EMPTY')
    return '127.0.0.1'
}

const osNetwork = OPERATING_SYS[platform()] ||  empt;
const IP_V4 = osNetwork();

module.exports = IP_V4;