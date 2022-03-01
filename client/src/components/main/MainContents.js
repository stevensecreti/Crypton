import React            from 'react';
import Wallet           from '../Wallet/Wallet'
import { PromiseProvider } from 'mongoose';
import cryptonLogo         from '../images/CryptonLogo@2x.png'

const MainContents = (props) => {
    return (
        <>
        {
            props.showWallet && 
            (<Wallet
                setShowQRCode = {props.setShowQRCode}
                balance = {props.balance}
                buyingPower = {props.buyingPower}
                balanceData = {props.balanceData}
                walletHex = {props.walletHex}
            ></Wallet>)
        }
        </>
    );
};

export default MainContents;