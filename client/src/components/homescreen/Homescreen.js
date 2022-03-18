import React, { useState, useEffect, useRef } from 'react';
import Logo from '../navbar/Logo';
import NavbarOptions from '../navbar/NavbarOptions';
import Login from '../modals/Login';
import Update from '../modals/Update';
import CreateAccount from '../modals/CreateAccount';
import Welcome from '../main/Welcome';
import QRCodeModal from '../modals/QRCodeModal';
import AddFriend from '../modals/AddFriend';
import MainContents from '../main/MainContents';
import * as mutations from '../../cache/mutations';
import { useMutation, useQuery } from '@apollo/client';
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

        const auth = props.user === null ? false : true;
        let displayName = "";
        let email = "";
        if (auth) {
            const firstName = props.user.firstName;
            const lastName = props.user.lastName;
            email = props.user.email;
            displayName = firstName + " " + lastName;
        } else {
            displayName = "";
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

        const setShowAddFriend = () => {
            toggleShowAddFriend(!showAddFriend);
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
                        showMarket = {showMarket}
                        showProfile = {showProfile}
                        setShowQRCode = {setShowQRCode}
                        balance = {userBalance}
                        buyingPower = {userBuyingPower}
                        balanceData = {userBalanceData}
                        walletHex = {userWalletHex}
                        addFriend={setShowAddFriend}
                    />
                    :
                    <Welcome />
                } 
                </div> 
                {showCreate && (<CreateAccount fetchUser = {props.fetchUser} setShowCreate = { setShowCreate }/>)}
                {showLogin && ( < Login fetchUser = { props.fetchUser } setShowLogin = { setShowLogin }/>)}
                {showUpdate && ( < Update fetchUser = { props.fetchUser } setShowUpdate = {setShowUpdate} userId = {props.user._id} user = {props.user}/>)}
                {showQRCode && (<QRCodeModal setShowQRCode = {setShowQRCode} ></QRCodeModal>)}
                {showAddFriend && (<AddFriend setShowAddFriend = {setShowAddFriend} userEmail={email}></AddFriend>)}
            </div>
        );
};
export default Homescreen;