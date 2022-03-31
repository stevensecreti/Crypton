import React, { useState, useEffect, useRef } from 'react';
import Logo from '../navbar/Logo';
import NavbarOptions from '../navbar/NavbarOptions';
import Login from '../modals/Login';
import Update from '../modals/Update';
import CreateAccount from '../modals/CreateAccount';
import Welcome from '../main/Welcome';
import QRCodeModal from '../modals/QRCodeModal';
import StartChallenge from '../modals/StartChallenge';
import BannerModal from '../modals/BannerModal';
import AddFriend from '../modals/AddFriend';
import MainContents from '../main/MainContents';
import * as mutations from '../../cache/mutations';
import { useMutation, useQuery } from '@apollo/client';
import {GET_DB_USER} from '../../cache/queries';
import { isObjectType } from 'graphql';
import { of } from 'zen-observable';


const Homescreen = (props) => {
        //User variables
        const userBalance = 12349.21;
        const userBuyingPower = 200.23;
        const userBalanceData = [0,4,6,7];
        const userWalletHex = "#AE473C";

        const [showLogin, toggleShowLogin] = useState(false);
        const [showCreate, toggleShowCreate] = useState(false);
        const [showUpdate, toggleShowUpdate] = useState(false);
        const [showAddFriend, toggleShowAddFriend] = useState(false);
        const [showAccount, toggleShowAccount] = useState(false);
        const [showMarket, toggleShowMarket] = useState(false);
        const [showEducation, toggleShowEducation] = useState(false);
        const [showGaming, toggleShowGaming] = useState(false);
        const [showProfile, toggleShowProfile] = useState(false);
        const [showHome, toggleShowHome] = useState(false);
        const [showTrading, toggleShowTrading] = useState(false);
        const [showWallet, toggleShowWallet] = useState(false);
        const [showQRCode, toggleShowQRCode] = useState(false);
        const [showStartChallenge, toggleShowStartChallenge] = useState(false);
        const [showBanner, toggleShowBanner] = useState(false);

        const [UpdateHighscore] = useMutation(mutations.UPDATE_HIGHSCORE);
        const [RemoveFriend] = useMutation(mutations.REMOVE_FRIEND);

        const auth = props.user === null ? false : true;
        let displayName = "";
        let email = "";
        let friends = [];
        let friendRequests = [];
        let highscores = [];
        let challenges = [];
        if (auth) {
            const firstName = props.user.firstName;
            const lastName = props.user.lastName;
            const friendsList = props.user.friendsList;
            const friendRequests = props.user.friendRequests;
            email = props.user.email;
            displayName = firstName + " " + lastName;
            friends = props.user.friendsList;
            highscores = props.user.highscores;
            challenges = props.user.challenges;
            console.log("challenges",challenges);
            console.log("friends", friends);
        } else {
            displayName = "";
        }



        const handleDeleteFriend = async (friend) => {
            if(email == null || friend == null) return;
            const input = {user: email, friend: friend};

            const deleted = await RemoveFriend({variables: {...input}});
            if(!deleted){
                console.log("Err Returned False");
            }
            else{
                props.fetchUser();
            }
        }

        const handleAcceptFriendRequest = async (friend) =>{
            return;
        }
        const handleDeclineFriendRequest = async (friend) =>{
            return;
        }


        function clearScreen(){
            toggleShowLogin(false);
            toggleShowCreate(false);
            toggleShowUpdate(false);
            toggleShowAccount(false);
            toggleShowEducation(false);
            toggleShowMarket(false);
            toggleShowGaming(false);
            toggleShowProfile(false);
            toggleShowHome(false);
            toggleShowTrading(false);
            toggleShowWallet(false);
            toggleShowQRCode(false);
            toggleShowBanner(false);
        }
        const setShowLogin = () => {
            toggleShowLogin(!showLogin);
        };

        const setShowCreate = () => {
            toggleShowCreate(!showCreate);
        };

        const setShowUpdate = () => {
            toggleShowUpdate(!showUpdate);
        };

        const setShowAccount = () => {
            clearScreen();
            toggleShowAccount(!showAccount);
        };

        const setShowEducation = () => {
            clearScreen();
            toggleShowEducation(!showEducation);
        };

        const setShowMarket = () => {
            clearScreen();
            toggleShowMarket(!showMarket);
        };

        const setShowGaming = () => {
            clearScreen();
            toggleShowGaming(!showGaming);
        };

        const setShowProfile = () => {
            clearScreen();
            toggleShowProfile(!showProfile);
        };

        const setShowHome = () => {
            clearScreen();
            toggleShowHome(!showHome);
        };

        const setShowTrading = () => {
            toggleShowTrading(!showTrading);
        };

        const setShowWallet = () => {
            clearScreen();
            toggleShowWallet(!showWallet);
        };

        const setShowQRCode = () => {
            toggleShowQRCode(!showQRCode);
        };

        const setShowBanner = () => {
            toggleShowBanner(!showBanner);
        };

        const setShowAddFriend = () => {
            toggleShowAddFriend(!showAddFriend);
        }

        const setShowStartChallenge = () => {
            toggleShowStartChallenge(!showStartChallenge);
        }

        const updateHighscores = async (game,score) => {
            UpdateHighscore({variables:{game: game,score: score,user: email}, refetchQueries: [{ query: GET_DB_USER }]});
        }


        return( 
            <div className = "homescreen" >
                <div className = "header" >
                    <div className = "navbar" >
                    <>
                        <NavbarOptions fetchUser = { props.fetchUser }
                        auth = { auth }
                        setShowCreate = { setShowCreate }
                        setShowLogin = { setShowLogin }
                        setShowUpdate = { setShowUpdate }
                        setShowAccount = { setShowAccount }
                        setShowEducation = { setShowEducation }
                        setShowMarket = { setShowMarket }
                        setShowProfile = { setShowProfile }
                        setShowGaming = { setShowGaming }
                        setShowHome = { setShowHome }
                        setShowTrading = { setShowTrading }
                        setShowWallet = { setShowWallet }
                        displayName = {displayName}
                        /> 
                    </> 
                    </div> 
                </div> 
                <div className = "main" >{
                    auth ?
                    <MainContents 
                        showWallet = {showWallet}
                        showGaming = {showGaming}
                        showMarket = {showMarket}
                        showAccount = {showAccount}
                        showProfile = {showProfile}
                        setShowQRCode = {setShowQRCode}
                        setShowBanner = {setShowBanner}
                        balance = {userBalance}
                        buyingPower = {userBuyingPower}
                        balanceData = {userBalanceData}
                        walletHex = {userWalletHex}
                        addFriend={setShowAddFriend}
                        deleteFriend={handleDeleteFriend}
                        acceptFriendRequest={handleAcceptFriendRequest}
                        declineFriendRequest={handleDeclineFriendRequest}
                        updateHighscore={updateHighscores}
                        friendsList={friends}
                        friendRequests={friendRequests}
                        highscores={highscores}
                        challenges={challenges}
                        setShowStartChallenge = {setShowStartChallenge}
                    />
                    :
                    <Welcome />
                } 
                </div> 
                {showCreate && (<CreateAccount fetchUser = {props.fetchUser} setShowCreate = { setShowCreate }/>)}
                {showLogin && ( < Login fetchUser = { props.fetchUser } setShowLogin = { setShowLogin }/>)}
                {showUpdate && ( < Update fetchUser = { props.fetchUser } setShowUpdate = {setShowUpdate} userId = {props.user._id} user = {props.user}/>)}
                {showQRCode && (<QRCodeModal setShowQRCode = {setShowQRCode} ></QRCodeModal>)}
                {showBanner && (<BannerModal setShowBanner = {setShowBanner} ></BannerModal>)}
                {showAddFriend && (<AddFriend setShowAddFriend = {setShowAddFriend} userEmail={email}></AddFriend>)}
                {showStartChallenge && (<StartChallenge setShowStartChallenge = {setShowStartChallenge} friends = {friends}></StartChallenge>)}
            </div>
        );
};
export default Homescreen;