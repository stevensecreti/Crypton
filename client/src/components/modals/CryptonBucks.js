import React, { useState, useRef, useEffect } 	from 'react';
//import { FRIEND_REQUEST } 			from '../../cache/mutations';
import { useMutation }    	from '@apollo/client';

import { WModal, WMHeader, WMMain, WMFooter, WButton, WInput } from 'wt-frontend';
import { parseValue } from 'graphql';
import { display } from '@mui/system';
import Wallet from '../Wallet/Wallet';
import { loadStdlib } from '@reach-sh/stdlib'
const reach = loadStdlib("ALGO")
const CryptonBucks = (props) => {
    const [numCryptonBucks, setNumCryptonBucks] = useState(0);
    const [priceUSD, setPriceUSD] = useState('0.00');
    const [amountAlgo, setAmountAlgo] = useState('0.00');
    const sender = useRef()
    const receiverAddress = useRef()
    const currentAlgo = useRef()
    const [loading, toggleLoading] = useState(false);
	const [showErr, displayErrorMsg] = useState(false);
	const errorMsg = "Error. Transaction Cancelled.";
    //const [FriendRequest] = useMutation(FRIEND_REQUEST);
    const[algPrice, setAlgPrice] = useState("0.00");
    const ws = useRef(null);

    let first = useRef(false);
    const url = "https://api.pro.coinbase.com";

    useEffect(() => {
        ws.current = new WebSocket("wss://ws-feed.pro.coinbase.com");
        //Wait until websocket is open
        ws.current.onopen =(() => {
            let msg = {
                type: "subscribe",
                product_ids: ["ALGO-USD"],
                channels: ["ticker"]
            }
            let jsonMsg = JSON.stringify(msg);
            ws.current.send(jsonMsg);
            
            first.current = true;
        })
    },[]);

    if(ws.current){
        ws.current.onmessage = (event) => {
            let data = JSON.parse(event.data);
            if(data.type === "ticker"){
                setAlgPrice(data.price);
                displayErrorMsg(false);
                if(numCryptonBucks > 0){
                    let usdValue = numCryptonBucks / 100;
                    let amountOfAlgoNeeded = usdValue / algPrice;
                    setPriceUSD(("" + usdValue.toFixed(2)));
                    setAmountAlgo(("" + amountOfAlgoNeeded.toFixed(2)));
                }
            }
            else{
                console.log("Unknown message type: ", data.type);
                setAlgPrice("-1.00");
                displayErrorMsg(true);
            }
        }
    }
    const updateInput = (e) => {
		const { name, value } = e.target;
        let numCryptonBucksRequested = parseFloat(value);
        let algoPrice = parseFloat(algPrice);
        setNumCryptonBucks(numCryptonBucksRequested);
        if(numCryptonBucksRequested > 0 && algoPrice > 0){
            let usdValue = numCryptonBucksRequested / 100;
            let amountOfAlgoNeeded = usdValue / algoPrice;
            setPriceUSD(("" + usdValue.toFixed(2)));
            setAmountAlgo(("" + amountOfAlgoNeeded.toFixed(2)));
        }
        else if(numCryptonBucksRequested < 0){
            displayErrorMsg(true);
        }
        else{
            displayErrorMsg(false);
        }
	}

    const handleAddAlgorand = async (e) => {
        let numAlgo = parseFloat(amountAlgo);
        if(priceUSD != "0.00"){
            if(props.account == '' || props.balance == 0 ||  (props.balance - numAlgo)< 0){
                window.alert('Please check the wallet status and retry');
                return false;
            }
            try{
                const receiver = await reach.connectAccount({
                     addr: "PGA2GVPRKN34PXD26YM6H35VZCCFXFHFVJYLP2FGNQL3R24JM2M63KIV7E"
                 })
                 currentAlgo.current = numAlgo;
                 let txt = await reach.transfer(props.account.current, receiver, reach.parseCurrency(currentAlgo.current));
                 props.addCryptonBucks(numCryptonBucks, numAlgo);
                 window.alert('Purchase Complete');
                 props.setShowCryptonBucks();
            }
            catch(err){
                console.log(err)
            }
        }
        else{
            alert("Please wait until the price is updated.");
        }
    }

    return(

        <WModal className="modal" cover={true} visible={true} animation="slide-fade-left">
        <WMHeader className="modal-header" onClose={() => props.setShowCryptonBucks()}>
            Add CryptonBucks
        </WMHeader>

        {
            loading ? <div />
                : <WMMain className="modal-main">

                    <WInput className="modal-input" onChange={updateInput} name='numCryptonBucks' labelAnimation="up" barAnimation="solid" labelText="Amount of CryptonBucks" wType="outlined" inputType='text' />
                    <div className="modal-spacer">&nbsp;</div>
                    {
                        showErr ? <div className='modal-error'>
                            {errorMsg}
                        </div>
                            : priceUSD != "0.00" ? <div className='modal-algo'>
                                    Amount USD: ${priceUSD}, Amount ALGO: {amountAlgo}
                                </div> :
                                <div className="modal-algo">Loading...</div>
                    }
                    <div className="modal-spacer">&nbsp;</div>
                    <div className="modal-button-1" onClick={handleAddAlgorand}>
                        Add
                    </div>
                </WMMain>
                
        }
    </WModal>

    );
}
export default CryptonBucks;