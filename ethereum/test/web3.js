const Web3 = require('web3');
let web3;

// Check if Metamask is available or not; typeof used to see if a variable is defined.
if (typeof window !== 'undefined' && typeof window.web3 !== 'undefined') {
    // We are in the browser and Metamask is running.
    web3 = new Web3(window.web3.currentProvider);

} else {
    // We are on the browser *OR* the user is not running Metamask.
    const RINKEBY_WSS = `wss://rinkeby.infura.io/ws/v3/733e434f42a0449e83a9371d211f6e96`
    web3 = new Web3(new Web3.providers.WebsocketProvider(RINKEBY_WSS))
}
module.exports = web3;