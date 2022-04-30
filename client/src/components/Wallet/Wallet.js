import React, { useState, useEffect, useRef }                            from 'react';
import { Chart as ChartJS, registerables } from "chart.js";
import Chart from "./Chart";
import produce from "immer";
import { loadStdlib } from '@reach-sh/stdlib'
import { ALGO_MyAlgoConnect as MyAlgoConnect } from '@reach-sh/stdlib';
// import ConnectWalletButton from './ConnectButton/ConnectWalletBtn';
// import TransferFund from './Transferfund';
import QRCode from '../modals/QRCodeModal';
import styles from './Wallet.module.css'
import Interactions from './Interactions';
import simple_token_abi from '../Contracts/simple_token_abi.json'

const reach = loadStdlib("ALGO")

reach.setWalletFallback(reach.walletFallback({
  providerEnv: 'TestNet', MyAlgoConnect })); 

const Wallet = (props) => {

    ChartJS.register(...registerables);
      const toggleQRCode = () => {
        if(account.current == null){
          window.alert('Need to connect to the account first');
          return false;
        } else{
          props.setShowQRCode(accountAddress);
        }
      }
    //let contractAddress = '0xEFBdA78Efd27da42dB314820514fCA7b79348B27';

	const [errorMessage, setErrorMessage] = useState(null);
	const [defaultAccount, setDefaultAccount] = useState(null);

  //const [connectAccount, setConnectAccount] = useState(null);
  
	const [connButtonText, setConnButtonText] = useState('Connect Wallet');
  const [refreshButton, setRefreshButton] = useState('Refresh');
  const [moreBalanceButton, setMoreBalanceButton] = useState('Add Funds');

	const [provider, setProvider] = useState(null);
	const [signer, setSigner] = useState(null);
	const [contract, setContract] = useState(null);

	const [tokenName, setTokenName] = useState("Token");
  
	const account = useRef()
    const balance = useRef()


    const [accountBal, setAccountBal] = useState(0);
    const [accountAddress, setAccountAddress] = useState('');


    const connectWallet = async () =>{
        try{
            await getAccount()
            await getBalance()
        }catch(err){
            console.log(err)
        }
    }

    const getAccount = async () => {
      try{
         account.current = await reach.getDefaultAccount()
          setAccountAddress(account.current.networkAccount.addr)
          console.log("Account :" + account.current.networkAccount.addr)
          localStorage.setItem("connectAccount", accountAddress);
          setConnButtonText('Status: Connected');
      }catch(err){
          console.log(err)
      }
  }

  const getBalance = async () => {
      try{
            let rawBalance = await reach.balanceOf(account.current)
              balance.current = reach.formatCurrency(rawBalance, 4)
              setAccountBal(balance.current)
          console.log("Balance :" + balance.current)
          updateLatestBalance(balance.current);
      }catch(err){
          console.log(err)
      }
    
  }

  const [connected, setConnected] = useState(false);
  const [WalletConnect, setWalletConnect] = useState(false)
  const [finalTrend, setFinalTrend] = useState([
    {
      accounts: "",
      balance: 0,
      time: ""
    },
  ]);
  const [trendSum, setTrendSum] = useState([]);
  const [index, setIndex] = useState(1);
  //   const connectWalletHandler = () => {
	// 	if (window.ethereum && window.ethereum.isMetaMask) {
	// 		window.ethereum.request({ method: 'eth_requestAccounts'})
	// 		.then(result => {
	// 			accountChangedHandler(result[0]);
  //       localStorage.setItem("connectAccount", result[0]);
	// 		})
	// 		.catch(error => {
	// 			setErrorMessage(error.message);

	// 		});

	// 	} else {
	// 		console.log('Need to install MetaMask');
	// 		setErrorMessage('Please install MetaMask browser extension to interact');
	// 	}
	// }
    

    const accountChangedHandler = (newAccount) => {
      try {
      if(accountAddress != null && newAccount != accountAddress){
        setConnected(true);
        window.location.reload();
      }
      //setDefaultAccount(newAccount);
      //updateEthers();
      } catch(error) {
        console.log(error)
      }
	}

    const LongText = ({content,limit}) => {
        const [showAll, setShowAll] = useState(false);
      
        const showMore = () => setShowAll(true);
        const showLess = () => setShowAll(false);
        if(!content) return false;
        if (content.length <= limit) {
          // there is nothing more to show
          return <div>account:{content}</div>
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



    // const updateBalance = async () => {
    //   try {
    //     let balanceBigN = await contract.balanceOf(defaultAccount);
    //     let balanceNumber = balanceBigN.toNumber();
    
    //     let tokenDecimals = await contract.decimals();
    
    //     let tokenBalance = balanceNumber / Math.pow(10, tokenDecimals);
    
    //     setBalance(toFixed(tokenBalance));	
    //     updateLatestBalance(toFixed(tokenBalance));
    //   } catch (error) {
    //     console.log(error)
    //   }
      
    // }

    const updateLatestBalance = async (data) => {

        var date='';
        date = date.concat(new Date().toLocaleDateString()+new Date().toLocaleTimeString())
        const finalTrend = produce(trendSum, draft => {
              draft.push({accounts: account.current.networkAccount.addr, balance: data, time: date})
          })
        setFinalTrend(finalTrend);
        console.log(finalTrend);
    }

    // function toFixed(x) {
    //     if (Math.abs(x) < 1.0) {
    //        var e = parseInt(x.toString().split('e-')[1]);
    //        if (e) {
    //           x *= Math.pow(10, e - 1);
    //           x = '0.' + (new Array(e)).join('0') + x.toString().substring(2);
    //        }
    //     } else {
    //        var e = parseInt(x.toString().split('+')[1]);
    //        if (e > 20) {
    //           e -= 20;
    //           x /= Math.pow(10, e);
    //           x += (new Array(e + 1)).join('0');
    //        }
    //     }
    //     return x;
    //  }

  //    const chainChangedHandler = () => {
	// 	// reload the page to avoid any errors with chain change mid use of application
  //       window.location.reload();
	// }

  const refreshHandler =() => {
    if(account.current == null){
      window.alert('Need to connect to wallet first');
      return false;
    }
    getBalance();
    window.alert('Refresh Complete. Latest status');
  }
	useEffect(() => {
		
    if(localStorage.getItem('connectAccount') == null || localStorage.getItem('connectAccount') != null){
      connectWallet();
    }
	}, [(localStorage.getItem('connectAccount'))]);

    return(
        <div className="screenContainer">
            <div className="screenHeader">
                My Wallet
            </div>
            <div className="screenMain">
              <div className='wallet-div'>
                  <div className="walletButtonsRow">
                    <div className="walletInteractions">
                      <div className="walletInteractionsHeaderB">
                          Balance:
                          <br/>
                          {accountBal}
                      </div>
                      <div className="walletInteractionsMain">
                        <button className="walletInteractionButton" id="moreAlgorand" onClick={() => window.open('https://dispenser.testnet.aws.algodev.network/')}>
                          {moreBalanceButton}
                        </button>
                      </div>
                    </div>
                    <div className="walletInteractions" id="sendFunds">
                      <Interactions account={account} getBalance = {getBalance}/>
                    </div>
                  </div>
                  <div  className="chartWalletButtonsRow">
                    <div className="walletChart">
                        <Chart finalTrend={finalTrend} accountAddress = {accountAddress} />
                    </div>
                  </div>
                  <div className="walletButtonsRow">
                    <button className="walletButton" onClick={() => {toggleQRCode()}}>
                          Account #
                    </button>
                    <button className="walletButton" onClick={() => {refreshHandler()}}>
                      {refreshButton}
                    </button>
                    <button className="walletButton" onClick={() => {connectWallet()}} disabled={connected}>
                      {connButtonText}
                    </button>
                  </div>
                  <div className="walletComponentsGroup">
                    {errorMessage}
                    
                    
                    {errorMessage}
                  </div>
              </div>
            </div>
        </div> 
    );
}
export default Wallet;
