import React            from 'react';
import { PromiseProvider } from 'mongoose';
import cryptonLogo         from '../images/CryptonLogo@2x.png'
import Wallet from '../Wallet/Wallet';
import Market from '../Market/Market';
import Account from "../Account/Account";
import Profile from "../Profile/Profile";
import FriendProfile from "../Profile/FriendProfile/FriendProfile";
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
                setShowBanner = {props.setShowBanner}
                setShowPicture = {props.setShowPicture}
                setShowChangeName = {props.setShowChangeName}
                setShowChangeEmail = {props.setShowChangeEmail}
                setShowChangePassword = {props.setShowChangePassword}
                addFriend={props.addFriend}
                friendsList={props.friendsList}
                displayName = {props.displayName}
                userEmail={props.userEmail}
                banner = {props.banner}
                updateBanner = {props.updateBanner}
                pfp = {props.pfp}
                updatePfp = {props.updatePfp}
                user = {props.user}
              ></Account>) ||
             props.showProfile &&
             (<Profile
                addFriend={props.addFriend}
                friendsList={props.friendsList}
                friendRequests={props.friendRequests}
                acceptFriendRequest={props.acceptFriendRequest}
                declineFriendRequest={props.declineFriendRequest}
                deleteFriend={props.deleteFriend}
                displayName={props.displayName}
                pfp={props.pfp}
                banner={props.banner}
                viewFriend={props.viewFriend}
                highscores={props.highscores}
                userName={props.userName}
                showCryptoBucks = {props.showCryptoBucks}
              ></Profile>) ||
            props.showFriendProfile && (<FriendProfile
                friendProfile = {props.friendProfile}
                viewFriend={props.viewFriend}
                closeFriend={props.setShowProfile}
            ></FriendProfile>) ||
            props.showGaming &&
            (<GameCenter
                updateHighscore = {props.updateHighscore}
                highscores = {props.highscores}
                challenges = {props.challenges}
                setShowStartChallenge = {props.setShowStartChallenge}
                declineChallenge = {props.declineChallenge}
                getChalScore = {props.getChalScore}
                gcBalance = {props.gcBalance}
                showCryptoBucks = {props.showCryptoBucks}
                updateCryptonBucks={props.updateCryptonBucks}
            >
            </GameCenter>)
        }
        </>
    );
};

export default MainContents;