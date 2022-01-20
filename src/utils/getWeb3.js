import Web3 from 'web3';
import AirlineContract from '../truffle/build/contracts/Airline.json';

let selectedAccount;

let airlineContract = null;

let initialize = false;

let web3; 

export const init = async() => {
    if(process.env.NODE_ENV === 'debug'){
        console.log('holis')
    }
    let provider = window.ethereum;
        if(typeof provider !== undefined){
            // Metamask is installed!
            provider
                .request({ method: 'eth_requestAccounts' })
                .then((accounts) => {
                    selectedAccount = accounts[0];
                    console.log(`Selected account is ${selectedAccount}`);
                })
                .catch((err) => {
                    console.log(err);
                });
                
            window.ethereum.on('accountsChanged', function(accounts){
                selectedAccount = accounts[0];
                console.log(`Selected account changed to ${selectedAccount}`);
            })
        };
    web3 = new Web3(provider);
    await web3.eth.net.getId();
    initialize = true;
    return web3;
};

export const getInit = async () => {
    if(!initialize){
        web3 = await init();
    };
	return web3;
};

export const getSelectedAccount = async () => {
	if(!initialize){
        web3 = await init();
    };
	return selectedAccount;
};

export const getAirlineContract = async () => {
	if(!initialize){
        web3 = await init();
    };
    const networkId = await web3.eth.net.getId();
    const getAirlineContract = new web3.eth.Contract(
        AirlineContract.abi,
        AirlineContract.networks[networkId].address
    );
    airlineContract = getAirlineContract;
    console.log(`AirlineContract is deploy with address ${airlineContract._address.toLowerCase()}`);
	return airlineContract;
};

export const getBalance = async () => {
    if(!initialize){
        web3 = await init();
    };
    let balance = await web3.eth.getBalance(selectedAccount);
    return balance;
};

export const convertToEther = (value) => {
    let result = Web3.utils.fromWei(value.toString(), 'ether');
    return result;
};

export const getFlights = async() => {
    if(!initialize) web3 = await init();
    if(airlineContract === null) await getAirlineContract();

    const totalFlights = await airlineContract?.methods?.totalFlights().call();
    const total = Number(totalFlights);
    let flights = [];
    for (let i = 0; i < total; i++) {
        let flight = await airlineContract?.methods?.flights(i).call();
        flights.push({name: flight[0], price: Number(flight[1])});
    }
    return flights;
};

export const purchaseFlight = async(flightIndex, flight) => {
    if(!initialize) web3 = await init();
    if(airlineContract === null) await getAirlineContract();
    try {
        const order = await airlineContract?.methods?.buyFlight(flightIndex).send({from: selectedAccount, value: flight.price});
        console.log(console.log(`Transaction event info: ${order?.events}`));
        return `Your orden is complete! transactionHash: ${order?.transactionHash}`;
    } catch (error) {
        return `Sorry, your purchase could not go through, please try again, thank you!`;
    }
};

export const getCustomerTotalFlights = async () => {
    if(!initialize) web3 = await init();
    if(airlineContract === null) await getAirlineContract();

    const totalFlights = await airlineContract?.methods?.customerTotalFlights(selectedAccount).call();
    let flights = [];
    for (let i = 0; i < Number(totalFlights); i++) {
        let flight = await airlineContract?.methods?.customerFlights(selectedAccount, i).call();
        flights.push({name: flight[0], price: Number(flight[1])});
    }
    return flights;
};

export const getCustomer = async () => {
    if(!initialize) web3 = await init();
    if(airlineContract === null) await getAirlineContract();

    const customer = await airlineContract?.methods?.customers(selectedAccount).call();
    return [{loyaltyPoints: customer?.loyaltyPoints, totalFlights: customer?.totalFlights}];
};

export const getRefundableEther = async () => {
    if(!initialize) web3 = await init();
    if(airlineContract === null) await getAirlineContract();

    const refundableEther = await airlineContract?.methods?.getRefundableEther().call();
    return refundableEther;
};

export const getAirlineBalance = async () => {
    if(!initialize) web3 = await init();
    if(airlineContract === null) await getAirlineContract();

    const balance = await airlineContract?.methods?.getAirlineBalance().call();
    return balance;
};

export const getEtherPerPoint = async () => {
    if(!initialize) web3 = await init();
    if(airlineContract === null) await getAirlineContract();

    const etherPerPoint = await airlineContract?.methods?.getEtherPerPoint().call();
    return etherPerPoint;
};

export const redeemLoyaltyPoints = async() => {
    if(!initialize) web3 = await init();
    if(airlineContract === null) await getAirlineContract();
    try {
        const redeem = await airlineContract?.methods?.redeemLoyaltyPoints().send({from: selectedAccount});
        console.log(`Transaction info: ${redeem}`)
        return `Your redeem is complete! transactionHash: ${redeem?.transactionHash}`;
    } catch (error) {
        return `Sorry, your redeem could not go through, please try again, thank you!`;
    }
};