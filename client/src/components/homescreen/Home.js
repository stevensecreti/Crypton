import React, {useState} from 'react';
import Button from '@mui/material/Button';
import cryptonLogo from '../images/CryptonLogo@2x.png';
import wallet from '../images/wallet.png';
import controller from '../images/controller.png';
import chart from '../images/graph.png';


import walletHover from '../images/walletHover.png';
import controllerHover from '../images/controllerHover.png';
import chartHover from '../images/graphHover.png';



const Home = (props) => {
    return(
    <div className="screenContainer">
        <div className="screenHeader">
        <img src={cryptonLogo} alt="Crypton" className='homeImage'></img>
        <div className="homeImageText">RYPTON</div>
        </div>
        <div className="screenHeader">
            Welcome Back {props.userName}!
        </div>
        <div className="screenMain" id="homeScreenMain">
            <div className="homeCard">
                <div className="homeImageWrapper">
                    <img src={controller} className="homeImageButtons" alt="controller" height="203px" width="208px"
                    onMouseOver={e => e.currentTarget.src=controllerHover}
                    onMouseOut={e => e.currentTarget.src=controller}
                    onClick={props.setShowGaming}></img>
                    
                </div>
                <div className="homeText">
                    Explore our gaming center, where you can play games by yourself or wager friends for CryptonBucks to see who has the better skills!
                </div>
            </div>
            <div className="homeCard">
                <div className="homeImageWrapper">
                    <img src={wallet} className="homeImageButtons" alt="wallet" height="203px" width="208px"
                    onMouseOver={e => e.currentTarget.src=walletHover}
                    onMouseOut={e => e.currentTarget.src=wallet}
                    onClick={props.setShowWallet}/>
                </div>
                <div className="homeText">
                    Manage your wallet, where you can access your balance, send funds, and view how your account has changed over time.
                </div>
            </div>
            <div className="homeCard">
                <div className="homeImageWrapper">
                    <img src={chart} className="homeImageButtons" alt="chart" height="203px" width="208px"
                    onMouseOver={e => e.currentTarget.src=chartHover}
                    onMouseOut={e => e.currentTarget.src=chart}
                    onClick={props.setShowMarket}></img>
                </div>
                <div className="homeText">
                    Check out the market, where you can look at tons of different cryptocurrencies and their exchanges!
                </div>
            </div>
        </div>
    </div>
    );
}

export default Home;