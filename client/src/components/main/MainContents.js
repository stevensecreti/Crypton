import React            from 'react';
import Wallet           from '../Wallet/Wallet'
import { PromiseProvider } from 'mongoose';
import cryptonLogo         from '../images/CryptonLogo@2x.png'

const MainContents = (props) => {
    return (
        <>
        {
            props.showWallet && 
            (<Wallet>

            </Wallet>)
        }
        </>
    );
};

export default MainContents;