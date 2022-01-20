import React, { useEffect, useState } from 'react';
import Panel from './Panel';
import flightLogo from '../assets/flight-logo.png';
import ticket from '../assets/ticket.png';
import ethereum from '../assets/ethereum.png';
import redeem from '../assets/redeem.jpeg';
import points from '../assets/points.png';
import accountIcon from '../assets/account.png';
import wallet from '../assets/wallet.png';
import balanceIcon from '../assets/balance.png';
import {
	getSelectedAccount,
	getBalance,
	getFlights,
	purchaseFlight,
	getCustomerTotalFlights,
	getCustomer,
	getAirlineBalance,
	redeemLoyaltyPoints,
	getEtherPerPoint,
	convertToEther,
} from '../utils/getWeb3';
import Footer from './Footer';
import IconItem from './IconItem';

const Main = () => {
	const [account, setAccount] = useState('');
	const [balance, setBalance] = useState(0);
	const [airlineBalance, setAirlineBalance] = useState(0);
	const [flights, setFlights] = useState([]);
	const [customerFlights, setCustomerFlights] = useState([]);
	const [customer, setCustomer] = useState([]);
	const [refundEther, setRefundEther] = useState(0);
	const [msg, setMsg] = useState('');

	let provider = window.ethereum;
	if(typeof provider !== undefined){
		// Metamask is installed!
		provider
			.request({ method: 'eth_requestAccounts' })
			.then((accounts) => {
				setAccount(accounts[0]);
			})
			.catch((err) => {
				console.log(err);
			});
		window.ethereum.on('accountsChanged', function(accounts){
			setAccount(accounts[0]);
		})
	};


	const fetchAccount = () => {
		getSelectedAccount()
			.then((account) => {
				setAccount(account);
			})
			.catch((err) => {
				console.log('No es posible mostrar la cuenta, error: ' + err);
			});
	};

	const fetchBalance = () => {
		getBalance()
			.then((balance) => {
				setBalance(convertToEther(balance));
			})
			.catch((err) => {
				console.log('No es posible mostrar el balance, error: ' + err);
			});
	};

	const fetchFlights = async () => {
		const flights = await getFlights();
		setFlights(flights);
	};

	const buyFlight = async (flightIndex, flight) => {
		const response = await purchaseFlight(flightIndex, flight);
		showMessage(response);
	};

	const fetchCustomerFlights = async () => {
		const response = await getCustomerTotalFlights();
		setCustomerFlights(response);
	};

	const fetchCustomers = async () => {
		const etherPerPoint = await getEtherPerPoint();
		const customer = await getCustomer();
		setCustomer(customer);
		setRefundEther(
			convertToEther(etherPerPoint) * Number(customer[0]?.loyaltyPoints),
		);
	};

	const fetchAirlineBalance = async () => {
		const response = await getAirlineBalance();
		setAirlineBalance(convertToEther(response));
	};

	const fetchRedeemLoyaltyPoints = async () => {
		const response = await redeemLoyaltyPoints();
		showMessage(response);
	};

	const showMessage = (value) => {
		setMsg(value);
		setTimeout(() => {
			setMsg('');
		}, 10000);
	};

	useEffect(() => {
		fetchAccount();
		fetchBalance();
		fetchFlights();
		fetchCustomerFlights();
		fetchCustomers();
		fetchAirlineBalance();
	}, [account, balance, msg, refundEther]);

	return (
		<>
			<div className="p-4">
				<div className="jumbotron">
					<h4 className="display-4 text-center">
						Welcome to the Airline!
					</h4>
				</div>
				{msg !== '' ? (
					<div
						className="alert alert-info mt-4 mb-4 alert-dismissible fade show"
						role="alert"
					>
						{msg}
						<button
							onClick={() => setMsg('')}
							type="button"
							className="close"
							data-dismiss="alert"
							aria-label="Close"
						>
							<span aria-hidden="true">&times;</span>
						</button>
					</div>
				) : null}
				<div className="row">
					<div className="col-sm">
						<Panel title="Balance">
							{account ? (
								<>
									<IconItem
										image={accountIcon}
										title={`Current Account`}
										titleColor={``}
										subtitle={account}
										showButton={false}
										buttonClassName=""
										buttonFn={null}
										buttonText=""
									/>
									<IconItem
										image={wallet}
										title={`Current Account Balance`}
										titleColor={``}
										subtitle={`${balance} ETH`}
										showButton={false}
										buttonClassName=""
										buttonFn={null}
										buttonText=""
									/>
									<IconItem
										image={balanceIcon}
										title={`Airline Balance`}
										titleColor={``}
										subtitle={
											'This is the total airline balance'
										}
										showButton={true}
										buttonClassName=""
										buttonFn={null}
										buttonText={`${airlineBalance} ETH`}
									/>
								</>
							) : (
								<IconItem
									image={accountIcon}
									title={`Account Error!`}
									titleColor={``}
									subtitle={`Please check your conexion`}
									showButton
									buttonClassName=""
									buttonFn={() => fetchAccount()}
									buttonText="Get Account"
								/>
							)}
						</Panel>
					</div>
					<div className="col-sm">
						<Panel title="Loyalty points - refundable ether">
							{customer.length === 0 ? (
								<p>No loyalty points available yet!</p>
							) : (
								<>
									<IconItem
										image={flightLogo}
										title={'You have '}
										titleColor={customer[0].totalFlights}
										subtitle={`purchased trips`}
										showButton={false}
										buttonClassName=""
										buttonFn={null}
										buttonText=""
									/>
									<IconItem
										image={points}
										title={'You have '}
										titleColor={customer[0].loyaltyPoints}
										subtitle={`loyalty points`}
										showButton={false}
										buttonClassName=""
										buttonFn={null}
										buttonText=""
									/>
									<IconItem
										image={ethereum}
										title={`you have `}
										titleColor={`${refundEther} ETH`}
										subtitle={`available to redeem`}
										showButton={false}
										buttonClassName=""
										buttonFn={null}
										buttonText=""
									/>
									<IconItem
										image={redeem}
										title={`Will be returned `}
										titleColor={`0.1 ETH to you`}
										subtitle={`for every loyalty point you have`}
										showButton={
											refundEther !== 0 ? true : false
										}
										buttonClassName=""
										buttonFn={() =>
											fetchRedeemLoyaltyPoints()
										}
										buttonText="Redeem"
									/>
								</>
							)}
						</Panel>
					</div>
				</div>
				<div className="row">
					<div className="col-sm">
						<Panel title="Available flights">
							{flights.length === 0 ? (
								<p>No flights available yet!</p>
							) : (
								flights.map((flight, i) => (
									<IconItem
										key={flight.name + i}
										image={flightLogo}
										title={`Flight to - `}
										titleColor={flight.name}
										subtitle={`Just for ${convertToEther(
											flight.price,
										)} ETH`}
										showButton={true}
										buttonClassName=""
										buttonFn={() => buyFlight(i, flight)}
										buttonText="Purchase"
									/>
								))
							)}
						</Panel>
					</div>
					<div className="col-sm">
						<Panel title="Your flights">
							{customerFlights.length === 0 ? (
								<p>No flights available yet!</p>
							) : (
								customerFlights.map((flight, i) => (
									<IconItem
										key={flight.name + i}
										image={ticket}
										title={`${i + 1} - `}
										titleColor={flight.name}
										subtitle={`You pay ${convertToEther(
											flight.price,
										)} ETH`}
										showButton={false}
										buttonClassName=""
										buttonFn={null}
										button=""
									/>
								))
							)}
						</Panel>
					</div>
				</div>
			</div>
			<Footer />
		</>
	);
};

export default Main;
