import React, {useState} from 'react'
import styles from './Wallet.module.css';
import Chart from './Chart'
const Interactions = (props) => {

	const [transferHash, setTransferHash] = useState();
	// const [accountSum, setAccountSum] = useState(() => {
    //     const saved = localStorage.getItem("accountSum");
    //     const initialValue = JSON.parse(saved);
    //     return initialValue || ""; 
    // });

    const [accountExist, setAccountExist] = useState(0);
    // const [transactionSum, setTransactionSum] = useState(() => {
    //     const saved = localStorage.getItem("transactionSum");
    //     const initialValue = JSON.parse(saved);
    //     return initialValue || ""; 
    // });
    // const [transactionCheck, setTransactionCheck] = useState(() => {
    //     const saved = localStorage.getItem("transactionCheck");
    //     const initialValue = JSON.parse(saved);
    //     return initialValue || ""; 
    // });

	//   const [trendData, settrendData] = useState(() => {
    //     const saved = localStorage.getItem("trendData");
    //     const initialValue = JSON.parse(saved);
    //     return initialValue || ""; 
    // });
    // const [trendSum, setTrendSum] = useState(() => {
    //     const saved = localStorage.getItem("trendSum");
    //     const initialValue = JSON.parse(saved);
    //     return initialValue || ""; 
    // });

	const transferHandler = async (e) => {
		e.preventDefault();
		let transferAmount = e.target.sendAmount.value;
		let recieverAddress = e.target.recieverAddress.value;

		let txt = await props.contract.transfer(recieverAddress, transferAmount);
		document.getElementById("form1").reset();
		//console.log(txt);
		setTransferHash("Transfer confirmation hash: " + txt.hash);
		
		
		//setTransactionCheck(new Date().toLocaleDateString()+new Date().toLocaleTimeString());
        //localStorage.setItem("transactionSum", JSON.stringify(transactionSum));
        //setTransactionSum([...transactionSum, transactionCheck]);
        //localStorage.setItem("transactionCheck", JSON.stringify(transactionCheck));

        // if(accountSum.includes(props.defaultAccount)){
        //     setAccountExist(1);
        // }
        // else{
        //     setAccountExist(0);
        //     setAccountSum([...accountSum, props.defaultAccount]);
        //     localStorage.setItem("accountSum", JSON.stringify(accountSum));
        //     settrendData([]);
        // }
        
        // if(accountExist == 0 && props.defaultAccount != null){
        //     setTrendSum(Object.keys(trendSum).map((x) => {
        //         return {...x, props.defaultAccount, trend: [...x.trend, trendData]}
        //     }));
        // }
        
        //settrendData([...trendData, e.contract.balance]);
        //console.log(accountSum);
        //localStorage.setItem("trendData", JSON.stringify(trendData));
        // setTrendSum(Object.keys(trendSum).map((x) => {
        //     if(x.account !== props.defaultAccount) return x;
        //     return {...x, trendSum: [...x.trend, trendData]}
        // }));
        // localStorage.setItem("trendSum", JSON.stringify(trendSum));
        // console.log(trendSum);
	}

	return (
		
			<div className={styles.interactionsCard}>
				<form id = "form1" onSubmit={transferHandler}>
					<h3> Transfer Coins </h3>
						<p> Reciever Address </p>
						<input type='tgext' id='recieverAddress' className={styles.addressInput}/>
						<p> Send Amount </p>
						<input type='number' id='sendAmount' min='0' step='1'/>
						<button type='submit' className={styles.button6}>Send</button>
						<div>
							{/* <Chart data={trendData}/> */}
						</div>
			</form>
			</div>
		)
	
}

export default Interactions;