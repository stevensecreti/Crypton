import React, {useRef, useState} from "react";
import { loadStdlib } from '@reach-sh/stdlib'
import { FormStyle } from "./Form.style";
import { Button, TransactionButton } from "./Button.styles";
import { BodyText } from "./MyAlgoWallet.styles";

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
            <br/>
            <BodyText>Transfer Fund</BodyText>
            <FormStyle onChange = {(e) => receiverAddress.current = e.target.value} placeholder="Receiver address" id = 'receive'/><br/>
            <FormStyle onChange = {(e) => transferAmount.current = e.target.value} placeholder="Amount" id = 'amount'/><br/>
            <TransactionButton onClick ={transferFund}>{isLoading ? "loading...": "Transfer Fund"}</TransactionButton>
        </div>
    )
}

export default Interactions