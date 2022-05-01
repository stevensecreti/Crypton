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
        props.setDefaultAccount(account)
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
        props.setCurrentBalance(balance.current);
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

    const updateLatestBalance = async (data) => {

        var date='';
        date = date.concat(new Date().toLocaleDateString()+new Date().toLocaleTimeString())
        const finalTrend = produce(trendSum, draft => {
              draft.push({accounts: account.current.networkAccount.addr, balance: data, time: date})
          })
        setFinalTrend(finalTrend);
        console.log(finalTrend);
    }
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
