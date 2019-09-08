Computing Science Master's Degree thesis project at University College Cork(UCC).

The purpose of this project is to show a complete Ethereum DApp allowing volunteers to earn reward points for volunteering for older people.

### :building_construction: __Architecture__

The main component:

__❍__ Next: server connected to the blockchain.

### :page_with_curl: __Instructions__:

**1)** Go on the Infura website to get an Infura key: [infura.io](https://infura.io).

**2)** Get a mnemonic passphrase, an easy way is to get a Metamask one: [metamask.io](https://metamask.io/)

**3)** Fire up your favourite console & clone this repo somewhere:


**4)** Enter this directory & install dependencies:

__`❍ cd vogen-reward_points-system && npm install`__

**5)** Go in `ethereum` folder & compile the code:

__`❍ cd ethereum && npx truffle compile`__

**6)** In `ethereum`, create a new file `apikeys.js` & add the mnemonic passphrase and the Infura key to it, such as:

```javascript
// apikeys.js example

module.exports = {
  mnemonic: 'word1 word2 word3 word4 word5 word6 word7 word8 word9 word10 word11 word12',
  infuraKey: 'your key here'
}

**7)** Deploy the contracts with Truffle on a testnet, such as Rinkeby:

__`❍ npx truffle  deploy --network rinkeby`__

**8)** In the main folder start the Next server:

__`❍ npm run dev`__


### :black_nib: Notes

__❍__ Note that your own Infura key and the Metamask passphrase must be kept secure. The ones provided here are simply placeholders.

__❍__ The frontend application for the loyalty point system is reachable at https://localhost:3000/

__*Happy developing!*__


// volunteer1@user.com: 1234567
// organisation1@org.com: 1234567
// h.shishodia@gmail.com: 12345678