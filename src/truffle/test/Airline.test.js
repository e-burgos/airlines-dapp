/* eslint-disable no-undef */
const Airline = artifacts.require('Airline');

let instance;

beforeEach(async () => {
    instance = await Airline.new();
});

contract('Airline', accounts => {
    it('should have availale flights', async() => {
        let total = await instance.totalFlights();
        assert(total > 0);
    });

    it('should allow customers to buy a flight providing its price', async() => {
        
        // Tokio flight
        let flight = await instance.flights(0);
        let flightName = flight[0];
        let price = flight[1];

        // Madrid flight
        let flight2 = await instance.flights(2);
        let flightName2 = flight2[0];
        let price2 = flight2[1];
        
        // buy 2 flight
        await instance.buyFlight(0, {from: accounts[0], value: price});
        await instance.buyFlight(2, {from: accounts[0], value: price2});
        let customerFlight1 = await instance.customerFlights(accounts[0], 0);
        let customerFlight2 = await instance.customerFlights(accounts[0], 1);
        let customerTotalFlights = await instance.customerTotalFlights(accounts[0]);
      
        assert.equal(customerFlight1[0], flightName);
        assert.equal(customerFlight1[1].toNumber(), price);
        assert.equal(customerFlight2[0], flightName2);
        assert.equal(customerFlight2[1].toNumber(), price2);
        assert.equal(customerTotalFlights, 2);
    });

    it('should not allow customers to buy flights under the price', async() => {
        
        // Tokio flight
        let flight = await instance.flights(0);

        // Get price and less 5000 wei
        let price = flight[1] - 5000;

        try {
            await instance.buyFlight(0, {from: accounts[0], value: price});
        } catch(e){ 
            return;
        }
        assert.fail();
    });

    it('should get the real balance of the contract', async() => {

        //get prices
        let flight1 = await instance.flights(0);
        let flight2 = await instance.flights(1);
        let flight3 = await instance.flights(2);

        let total = flight1[1].toNumber() + flight2[1].toNumber() + flight3[1].toNumber(); 

        // buy 3 flights
        await instance.buyFlight(0, {from: accounts[1], value: flight1[1]});
        await instance.buyFlight(1, {from: accounts[2], value: flight2[1]});
        await instance.buyFlight(2, {from: accounts[3], value: flight3[1]});

        let totalBalance = await instance.getAirlineBalance();
        assert.equal(totalBalance.toNumber(), total);
    });

    it('should allow customers to redeem loyalty points', async() => {

        let flight = await instance.flights(1);
        let price = flight[1];

        await instance.buyFlight(1, {from: accounts[0], value: price});

        let balance = await web3.eth.getBalance(accounts[0]);
        await instance.redeemLoyaltyPoints({from: accounts[0]});
        let finalBalance = await web3.eth.getBalance(accounts[0]);

        let customer = await instance.customers(accounts[0]);
        let loyaltyPoints = customer[0];

        assert(balance < finalBalance);
        assert(loyaltyPoints, 0);
    })
})