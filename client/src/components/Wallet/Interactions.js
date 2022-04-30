import React, {useRef, useState} from "react";
import { loadStdlib } from '@reach-sh/stdlib'


const reach = loadStdlib("ALGO")

const Interactions = ({account, getBalance}) => {
    const transferAmount = useRef()
    const receiverAddress = useRef()
    const [isLoading, setLoading] = useState(false)
    const [transferHash, setTransferHash] =useState('')

    const transferFund = async () =>{
        try{
        setLoading(true)
        const receiver = await reach.connectAccount({
             addr: receiverAddress.current
         })
         if(transferAmount.current <= 0){
             window.alert('More than 0 should be inserted')
             return false;
         }
         let txt = await reach.transfer(account.current, receiver, reach.parseCurrency(transferAmount.current))
         await getBalance()
         setLoading(false)
         
         receiverAddress.current.reset();
         transferAmount.current.reset();

        window.alert('Safely transferred')
        }catch(err){
            console.log(err)
            setLoading(false)
        }
     }
    return(
        <div>
            <div className="walletInteractionsHeader">
                Send Funds
            </div>
            <div className="walletInteractionsMain">
                <input className="walletInput" onChange = {(e) => receiverAddress.current = e.target.value} placeholder="Receiver address" id = 'receive'/>
                <input className="walletInput" onChange = {(e) => transferAmount.current = e.target.value} placeholder="Amount" id = 'amount'/>
                <button className="walletInteractionButton" onClick ={transferFund}>{isLoading ? "loading...": "Transfer Funds"}</button>  
            </div>            
        </div>
    )
}

export default Interactions