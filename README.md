# The Airline - An Ethereum learning DAPP

<img src="https://logos-marcas.com/wp-content/uploads/2020/12/Ethereum-Logo.png" width="128">

## Install dependencies
In the root folder of the project, run the following command
```sh
npm i
```

Then move to the truffle folder and repeat this process
```sh
cd src
cd truffle
npm i
```

## Build the contract
Run Ganache on http://localhost:7545 and write in the truffle folder the following command to build the contracts
```sh
npx truffle migrate
```

## Run the project
In the root folder, type the following command
```sh
npm run start
```
Don't forget to import at least two accounts to metamask to test the dapp.
Good luck!

## Deploy the contract in Rinkeby Test Network
1. Register or login to infura.io and create a new project, then get the rinkeby url like this > https://ropsten.infura.io/v3/YOUR-PROJECT-ID
2. Sign up or log in to Metamask Chrome extension and get your mnemonic.
3. Configure these values in the truffle-config.js file.
4. On your console, go to the truffle folder and run the following command:
```sh
npx truffle deploy --network rinkeby
```
5. Finally, deploy your reactjs app to vercel eg.