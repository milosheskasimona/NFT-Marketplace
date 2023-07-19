require('@nomiclabs/hardhat-waffle');

//require('@nomicfoundation/hardhat-waffle');

const projectId='projectId from polygon project'
const fs=require('fs')

const keyData=fs.readFileSync('./p-key.txt',{
  encoding:'utf8', 
  flag:'r'
})

module.exports = {
  defaultNetwork:
    'hardhat',

  
  allowUnlimitedContractSize: true,
  networks:{
    hardhat:{
      chainId: 1337 //config standard
    },
    mumbai:{
      url:`https://polygon-mumbai.infura.io/v3/${projectId}`,
      accounts:[keyData], //private key from wallet (MetaMask),
      
    },
    mainnet:{
      url:`https://polygon-mainnet.infura.io/v3/${projectId}`,
      accounts:[keyData], //private key from wallet (MetaMask),
    

    }
  },
  solidity: {
    version:"0.8.17",
    settings:{
      optimizer:{
        enabled:true,
        runs: 200,
      }
    }
  }
};

