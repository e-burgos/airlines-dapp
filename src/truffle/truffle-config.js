const HDWalletProvider = require("@truffle/hdwallet-provider");
const mnemonic = 'mountains supernatural bird ...';
const urlInfuraProvider = 'https://rinkeby.infura.io/v3/YOUR-PROJECT-ID';

module.exports = {
  networks: {
    development: {      
      host: 'localhost',
      port: 7545,
      network_id: '*',
      gas: 5000000
    },
    rinkeby: {      
      provider: () => new HDWalletProvider(mnemonic, urlInfuraProvider),
      network_id: '4',
    }
  },
  compilers: {
    solc: {
      version: "0.8.0",
      settings: {
       optimizer: {
         enabled: false,
         runs: 200
       }
      }
    }
  }
};

