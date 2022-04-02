import React, { useState, useEffect }                            from 'react';
import { Chart as ChartJS, registerables } from "chart.js";
import {Line} from 'react-chartjs-2';
import WMHeader from 'wt-frontend/build/components/wmodal/WMHeader';
import WMMain from 'wt-frontend/build/components/wmodal/WMMain';
import WLayout from 'wt-frontend/build/components/wlayout/WLayout';
import WCol from 'wt-frontend/build/components/wgrid/WCol';
import WRow from 'wt-frontend/build/components/wgrid/WRow';
import QRCode from '../modals/QRCodeModal';
import {ethers} from 'ethers'
import styles from './Wallet.module.css'
import Interactions from './Interactions';
import simple_token_abi from '../Contracts/simple_token_abi.json'

const Wallet = (props) => {
    // const balance = props.balance;
    const buyingPower = props.buyingPower;
    const trendData = props.balanceData;
    const walletHex = props.walletHex;
    const currentTrend = trendData[trendData.length-1]-trendData[0];
    const trend = "Current Trend: " + (currentTrend >= 0 ? "+"+currentTrend+"%" : "-"+(-currentTrend)+"%");
    const trendStyle = currentTrend >= 0 ? "wallet-trend-pos" : "wallet-trend-neg";
    ChartJS.register(...registerables);
    
    const state = {
        labels: ['January', 'February', 'March',
                 'April', 'May', 'June', 'July', 'August', 'Septmeber', 'October', 'November', 'December'],
        datasets: [
          {
            label: 'Balance',
            fill: false,
            lineTension: 0.5,
            backgroundColor: '#013292',
            borderColor: '#013292',
            borderWidth: 2,
            data: trendData
          }
        ]
      }

      const toggleQRCode = () => {
        props.setShowQRCode();
      }

    let contractAddress = '0xEFBdA78Efd27da42dB314820514fCA7b79348B27';

	const [errorMessage, setErrorMessage] = useState(null);
	const [defaultAccount, setDefaultAccount] = useState(null);
	const [connButtonText, setConnButtonText] = useState('Connect Wallet');

	const [provider, setProvider] = useState(null);
	const [signer, setSigner] = useState(null);
	const [contract, setContract] = useState(null);

	const [tokenName, setTokenName] = useState("Token");
	const [balance, setBalance] = useState(null);

    const connectWalletHandler = () => {
		if (window.ethereum && window.ethereum.isMetaMask) {

			window.ethereum.request({ method: 'eth_requestAccounts'})
			.then(result => {
				accountChangedHandler(result[0]);
				setConnButtonText('Wallet Connected');
			})
			.catch(error => {
				setErrorMessage(error.message);
			
			});

		} else {
			console.log('Need to install MetaMask');
			setErrorMessage('Please install MetaMask browser extension to interact');
		}
	}
    

    const accountChangedHandler = (newAccount) => {
		setDefaultAccount(newAccount);
		updateEthers();
	}

    const updateBalance = async () => {
		let balanceBigN = await contract.balanceOf(defaultAccount);
		let balanceNumber = balanceBigN.toNumber();

		let tokenDecimals = await contract.decimals();

		let tokenBalance = balanceNumber / Math.pow(10, tokenDecimals);

		setBalance(toFixed(tokenBalance));	

	}

    function toFixed(x) {
        if (Math.abs(x) < 1.0) {
           var e = parseInt(x.toString().split('e-')[1]);
           if (e) {
              x *= Math.pow(10, e - 1);
              x = '0.' + (new Array(e)).join('0') + x.toString().substring(2);
           }
        } else {
           var e = parseInt(x.toString().split('+')[1]);
           if (e > 20) {
              e -= 20;
              x /= Math.pow(10, e);
              x += (new Array(e + 1)).join('0');
           }
        }
        return x;
     }

     const chainChangedHandler = () => {
		// reload the page to avoid any errors with chain change mid use of application
		window.location.reload();
	}

    window.ethereum.on('accountsChanged', accountChangedHandler);

	window.ethereum.on('chainChanged', chainChangedHandler);

	const updateEthers = () => {
		let tempProvider = new ethers.providers.Web3Provider(window.ethereum);
		setProvider(tempProvider);

		let tempSigner = tempProvider.getSigner();
		setSigner(tempSigner);

		let tempContract = new ethers.Contract(contractAddress, simple_token_abi, tempSigner);
		setContract(tempContract);	
	}

	useEffect(() => {
		if (contract != null) {
			updateBalance();
			updateTokenName();
		}
	}, [contract]);

    const updateTokenName = async () => {
		setTokenName(await contract.name());
	}

    return(
        <>
            <div id="wallet-container">
                <div className={styles.walletCard}>
                </div>
                <div className="wallet-main">
                <button className={styles.button6} onClick={connectWalletHandler}>{connButtonText}</button>
                        <ul className='wallet-div'>
                            <div id="wallet-balance">
                                Balance: ${balance}
                            </div>
                            <div id="wallet-balance">
                                Account Address: ${defaultAccount}
                            </div>
                            <div id="wallet-balance">
                                Buying Power: ${buyingPower}
                            </div>
                            <div id={trendStyle}>
                                {trend}
                            </div>
                            <div id="wallet-button" onClick={toggleQRCode}>
                                QRCode...
                            </div>
                            {errorMessage}
                            <div className='line-graph'>
                                <Line
                                data={state}
                                options={{
                                    title:{
                                    display:true,
                                    text:'Average Rainfall per month',
                                    fontSize:20
                                    },
                                    legend:{
                                    display:true,
                                    position:'right'
                                    }
                                }}
                                />
                            </div>
                        </ul>
                        {errorMessage}
                </div>
                <Interactions contract={contract}/>
            </div>
</>
    );
}
export default Wallet;