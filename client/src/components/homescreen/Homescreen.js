import React, { useState, useEffect } from 'react';
import Logo from '../navbar/Logo';
import NavbarOptions from '../navbar/NavbarOptions';
import Login from '../modals/Login';
import Update from '../modals/Update';
import CreateAccount from '../modals/CreateAccount';
import Account from '../modals/Account';
import Welcome from '../main/Welcome';
import QRCodeModal from '../modals/QRCodeModal';
import MainContents from '../main/MainContents';
import * as mutations from '../../cache/mutations';
import { useMutation, useQuery } from '@apollo/client';
import { isObjectType } from 'graphql';


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
        const [showExchange, toggleShowExchange] = useState(false);
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

        const setShowExchange = () => {
            toggleShowExchange(!showExchange);
        };

        const setShowGaming = () => {
            toggleShowGaming(!showGaming);
        };

        const setShowProfile = () => {
            toggleShowProfile(!showProfile);
        };

        const setShowHome = () => {
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
                    <ul>
                        <div className = "logo" >
                            <Logo className = 'logo'/>
                        </div> </ul> 
                    <ul>
                        <NavbarOptions fetchUser = { props.fetchUser }
                        auth = { auth }
                        setShowCreate = { setShowCreate }
                        setShowLogin = { setShowLogin }
                        setShowUpdate = { setShowUpdate }
                        setShowAccount = { setShowAccount }
                        setShowEducation = { setShowEducation }
                        setShowExchange = { setShowExchange }
                        setShowProfile = { setShowProfile }
                        setShowGaming = { setShowGaming }
                        setShowHome = { setShowHome }
                        setShowTrading = { setShowTrading }
                        setShowWallet = { setShowWallet }
                        displayName = {displayName}
                        /> 
                    </ul> 
                    </div> 
                </div> 
                <div className = "main" >{
                    auth ?
                    <MainContents 
                        showWallet = {showWallet}
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
                {showAccount && ( <Account fetchUser = { props.fetchUser }setShowAccount = { setShowAccount }/>)} 
                {showCreate && (<CreateAccount fetchUser = {props.fetchUser} setShowCreate = { setShowCreate }/>)}
                {showLogin && ( < Login fetchUser = { props.fetchUser } setShowLogin = { setShowLogin }/>)}
                {showUpdate && ( < Update fetchUser = { props.fetchUser } setShowUpdate = {setShowUpdate} userId = {props.user._id} user = {props.user}/>)}
                {showQRCode && (<QRCodeModal setShowQRCode = {setShowQRCode} ></QRCodeModal>)}
            </div>
        );
};
export default Homescreen;