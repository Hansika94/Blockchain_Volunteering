const web3 = require('./web3')
const VOGenPoints = require('./build/contracts/VOGenPoints.json')

// Create the instance from the contract deployed in the Rinkeby network.
const instance = new web3.eth.Contract(
    VOGenPoints.abi,
    '0x4b5c007aa29c61b63dad684c731bd8a5e62997f5'
);

//export default instance
module.exports = instance;