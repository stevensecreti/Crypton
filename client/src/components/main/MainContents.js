import React            from 'react';
import { PromiseProvider } from 'mongoose';
import cryptonLogo         from '../images/CryptonLogo@2x.png'
import Wallet from '../Wallet/Wallet';
import Market from '../Market/Market';
import Account from "../Account/Account";
import Profile from "../Profile/Profile";
import GameCenter from '../GameCenter/GameCenter';

var marketSocket = null;
const MainContents = (props) => {
    function storeSock(sock){
        if(!marketSocket){
            marketSocket = sock; 
        }
    }
    function closeSock(){
        if(marketSocket){
            marketSocket.close();
            marketSocket = null;
        }
    }
    
    if(!props.showMarket){
        closeSock();
    }


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
            (<Market 
                storeSock={storeSock}
             ></Market>) || 
             props.showAccount &&
             (<Account
                addFriend={props.addFriend}
                friendsList={props.friendsList}
              ></Account>) ||
             props.showProfile &&
             (<Profile
                addFriend={props.addFriend}
                friendsList={props.friendsList}
                friendRequests={props.friendRequests}
                acceptFriendRequest={props.acceptFriendRequest}
                declineFriendRequest={props.declineFriendRequest}
                deleteFriend={props.deleteFriend}
              ></Profile>) ||
            props.showGaming &&
            (<GameCenter
                updateHighscore = {props.updateHighscore}
                highscores = {props.highscores}
                challenges = {props.challenges}
            >
            </GameCenter>)
        }
        </>
    );
};

export default MainContents;