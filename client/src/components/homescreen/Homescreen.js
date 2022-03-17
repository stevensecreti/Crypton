import React, { useState, useEffect, useRef } from 'react';
import Logo from '../navbar/Logo';
import NavbarOptions from '../navbar/NavbarOptions';
import Login from '../modals/Login';
import Update from '../modals/Update';
import CreateAccount from '../modals/CreateAccount';
import Welcome from '../main/Welcome';
import QRCodeModal from '../modals/QRCodeModal';
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
        if (auth) {
            const firstName = props.user.firstName;
            const lastName = props.user.lastName;
            displayName = firstName + " " + lastName;
        } else {
            displayName = "";
        }

        function clearScreen(){
            console.log("Here");
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
            toggleShowAccount(!showAccount);
        };

        const setShowEducation = () => {
            toggleShowEducation(!showEducation);
        };

        const setShowMarket = () => {
            clearScreen();
            toggleShowMarket(!showMarket);
        };

        const setShowGaming = () => {
            toggleShowGaming(!showGaming);
        };

        const setShowProfile = () => {
            toggleShowProfile(!showProfile);
        };

        const setShowHome = () => {
            console.log("in Set show Home");
            clearScreen();
            toggleShowHome(!showHome);
        };

        const setShowTrading = () => {
            toggleShowTrading(!showTrading);
        };

        const setShowWallet = () => {
            toggleShowWallet(!showWallet);
        };

        const setShowQRCode = () => {
            toggleShowQRCode(!showQRCode);
        };


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
                        setShowQRCode = {setShowQRCode}
                        balance = {userBalance}
                        buyingPower = {userBuyingPower}
                        balanceData = {userBalanceData}
                        walletHex = {userWalletHex}
                    />
                    :
                    <Welcome />
                } 
                </div> 
                {showCreate && (<CreateAccount fetchUser = {props.fetchUser} setShowCreate = { setShowCreate }/>)}
                {showLogin && ( < Login fetchUser = { props.fetchUser } setShowLogin = { setShowLogin }/>)}
                {showUpdate && ( < Update fetchUser = { props.fetchUser } setShowUpdate = {setShowUpdate} userId = {props.user._id} user = {props.user}/>)}
                {showQRCode && (<QRCodeModal setShowQRCode = {setShowQRCode} ></QRCodeModal>)}
            </div>
        );
};
export default Homescreen;