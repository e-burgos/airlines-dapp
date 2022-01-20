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