import React, { useState, useEffect }                            from 'react';
import { Chart as ChartJS, registerables } from "chart.js";
import Chart from "./Chart";
import produce from "immer";
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
import ls from 'local-storage'

const Wallet = (props) => {
    // const balance = props.balance;
    // const buyingPower = props.buyingPower;
    // const balancesum = [];
    // const walletHex = props.walletHex;
    //const currentTrend = trendData[trendData.length-1]-trendData[0];
    //const trend = "Current Trend: " + (currentTrend >= 0 ? "+"+currentTrend+"%" : "-"+(-currentTrend)+"%");
    //const trendStyle = currentTrend >= 0 ? "wallet-trend-pos" : "wallet-trend-neg";
    ChartJS.register(...registerables);
      const toggleQRCode = () => {
        props.setShowQRCode(defaultAccount);
      }
    let contractAddress = '0xEFBdA78Efd27da42dB314820514fCA7b79348B27';

	const [errorMessage, setErrorMessage] = useState(null);
	const [defaultAccount, setDefaultAccount] = useState(null);
    const [newAccount, setNewAccount] = useState(null);
	const [connButtonText, setConnButtonText] = useState('Connect Wallet');
  const [refreshButton, setRefreshButton] = useState('Refresh');

	const [provider, setProvider] = useState(null);
	const [signer, setSigner] = useState(null);
	const [contract, setContract] = useState(null);

	const [tokenName, setTokenName] = useState("Token");
	const [balance, setBalance] = useState(null);
  const [latestBalance, setLatestBalance] = useState(0);
  //const [date, setDate] = useState(new Date().toLocaleDateString()+new Date().toLocaleTimeString());
  const [finalTrend, setFinalTrend] = useState([
    {
      account: "",
      balance: 0,
      time: ""
    },
  ]);
  const [trendSum, setTrendSum] = useState([]);
  const [index, setIndex] = useState(1);
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
        setNewAccount("Account:"+newAccount);
		updateEthers();
	}

    const LongText = ({content,limit}) => {
        const [showAll, setShowAll] = useState(false);
      
        const showMore = () => setShowAll(true);
        const showLess = () => setShowAll(false);
        if(!content) return false;
        if (content.length <= limit) {
          // there is nothing more to show
          return <div>{content}</div>
        }
        if (showAll) {
          // We show the extended text and a link to reduce it
          return <div> 
            {content} 
            <button onClick={showLess}>Read less</button> 
          </div>
        }
        // In the final case, we show a text with ellipsis and a `Read more` button
        const toShow = content.substring(0, limit) + "...";
        return <div> 
          {toShow} 
          <button onClick={showMore}>Read more</button>
        </div>
      }



    const updateBalance = async () => {
		let balanceBigN = await contract.balanceOf(defaultAccount);
		let balanceNumber = balanceBigN.toNumber();

		let tokenDecimals = await contract.decimals();

		let tokenBalance = balanceNumber / Math.pow(10, tokenDecimals);

		setBalance(toFixed(tokenBalance));	
    }

    const updateLatestBalance = async () => {
      console.log("last balance",latestBalance);
      console.log("balance",balance);
      if(balance !== latestBalance){
        var date='';
        date = date.concat(new Date().toLocaleDateString()+new Date().toLocaleTimeString())
        const finalTrend = produce(trendSum, draft => {
              draft.push({account: defaultAccount, balance: toFixed(balance), time: date})
          })
        setFinalTrend(finalTrend);
      }
      setLatestBalance(balance);
    }

  //     const updateChart = () => {
  //   return <Chart data={balance}/>
  // }
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
        updateBalance();
	}

  const refreshHandler =() => {
    updateBalance();
    updateLatestBalance();
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
	}, [contract, latestBalance, balance]);

    const updateTokenName = async () => {
		setTokenName(await contract.name());
	}

    return(
        <>
            <div id="wallet-container">
                <div className={styles.walletCard}>
                </div>
                <div className="wallet-main">
                        <div className='wallet-div'>
                            <div id="wallet-balance">
                                <LongText content = {newAccount} limit = {20} /> 
                            </div>
                            <div id="wallet-balance">
                                Balance: {balance}ST
                            </div>
                            <div id="wallet-button" onClick={() => {toggleQRCode()}}>
                                QRCode...
                            </div>
                            <button id="wallet-button" onClick={() => {connectWalletHandler()}}>{connButtonText}</button>
                            <button id="wallet-button" onClick={() => {refreshHandler()}}>{refreshButton}</button>
                            {errorMessage}
                            <Chart finalTrend={finalTrend}/>
                            <Interactions contract={contract}/>
                        {errorMessage}
                </div>
                </div>
            </div>
</>
    );
}
export default Wallet;
