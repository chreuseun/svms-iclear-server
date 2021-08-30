'use strict';

const { networkInterfaces, platform } = require('os');
const nets = networkInterfaces();

//  windows machine handler
const windowsOps =  () => {
    const wifi = nets['Wi-Fi']
    const parseIpV4 = wifi.find(_wifi => _wifi.family === 'IPv4');

    const {address =''} = parseIpV4 || {}
    return  address || ''
}

// mac machine handler
const macOps =  () => {
    const wifi = nets['en0']
    const parseIpV4 = wifi.find(_wifi => _wifi.family === 'IPv4');
    const {address =''} = parseIpV4 || {};

     return  address || ''
}


const OPERATING_SYS =  {
    darwin: macOps,
    win32: windowsOps,
    win64: windowsOps,
    linux: macOps
}

const empt = () => {
    return '###no-ip'
}

const osNetwork = OPERATING_SYS[platform()] ||  empt;
const IP_V4 = osNetwork();

module.exports = IP_V4;