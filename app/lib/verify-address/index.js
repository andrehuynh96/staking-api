const web3Util = require('web3-utils');
const bech32 = require('bech32');
const logger = require('app/lib/logger');

module.exports = (platform, address) => {
    if (platform == 'ATOM') {
        return verifyCosmosAddress(address);
    } else if (platform == 'IRIS') {
        return verifyIrisAddress(address);
    } else if (platform == 'ETH') {
        return verifyEthAddress(address);
    } else {
        return false;
    }
}

const verifyCosmosAddress = (address) =>{
    try{
        let result = bech32.decode(address.toLowerCase());
        return result.prefix == 'cosmos';
    }
    catch (e) {
        logger.error(e);
        return false;
    }
}

const verifyIrisAddress = (address) =>{
    try{
        let result = bech32.decode(address.toLowerCase());
        return result.prefix == 'iaa';
    }
    catch (e) {
        logger.error(e);
        return false;
    }
}

const verifyEthAddress = (address) => {
    try {
        if (!web3Util.isAddress(address)) {
            return false;
        }
        return web3Util.toChecksumAddress(address);
    } catch (e) {
        logger.error(e);
        return false;
    }
}