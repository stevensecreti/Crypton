import React            from 'react';
import { PromiseProvider } from 'mongoose';
import cryptonLogo         from '../images/CryptonLogo@2x.png'
import Wallet from '../Wallet/Wallet';

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