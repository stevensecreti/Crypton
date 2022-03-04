import React            from 'react';
import { PromiseProvider } from 'mongoose';
import cryptonLogo         from '../images/CryptonLogo@2x.png'
import Wallet from '../Wallet/Wallet';
import Market from '../Market/Market'

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
            ></Wallet>) ||
            props.showMarket &&
            (<Market>
                
            </Market>)
        }
        </>
    );
};

export default MainContents;