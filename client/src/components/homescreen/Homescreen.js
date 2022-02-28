import React, { useState, useEffect } from 'react';
import Logo from '../navbar/Logo';
import NavbarOptions from '../navbar/NavbarOptions';
import Login from '../modals/Login';
import Update from '../modals/Update';
import CreateAccount from '../modals/CreateAccount';
import Account from '../modals/Account';
import EducationCenter from '../modals/EducationCenter';
import Exchange from '../modals/Exchange';
import GamingCenter from '../modals/GamingCenter';
import GFreezzee from '../modals/GFreezzee';
import Home from '../modals/Home';
import Welcome from '../main/Welcome';
import TradingBot from '../modals/TradingBot';
import Wallet from '../modals/Wallet';
import MainContents from '../main/MainContents';
import * as mutations from '../../cache/mutations';
import { useMutation, useQuery } from '@apollo/client';
import { isObjectType } from 'graphql';


const Homescreen = (props) => {
        const [showLogin, toggleShowLogin] = useState(false);
        const [showCreate, toggleShowCreate] = useState(false);
        const [showUpdate, toggleShowUpdate] = useState(false);
        const [showAccount, toggleShowAccount] = useState(false);
        const [showExchange, toggleShowExchange] = useState(false);
        const [showEducation, toggleShowEducation] = useState(false);
        const [showGaming, toggleShowGaming] = useState(false);
        const [showGFreezzee, toggleShowGFreezzee] = useState(false);
        const [showHome, toggleShowHome] = useState(false);
        const [showTrading, toggleShowTrading] = useState(false);
        const [showWallet, toggleShowWallet] = useState(false);



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
            toggleShowAccount(!showUpdate);
        };

        const setShowEducation = () => {
            toggleShowEducation(!showUpdate);
        };

        const setShowExchange = () => {
            toggleShowExchange(!showUpdate);
        };

        const setShowGaming = () => {
            toggleShowGaming(!showUpdate);
        };

        const setShowGFreezzee = () => {
            toggleShowGFreezzee(!showUpdate);
        };

        const setShowHome = () => {
            toggleShowHome(!showUpdate);
        };

        const setShowTrading = () => {
            toggleShowTrading(!showUpdate);
        };

        const setShowWallet = () => {
            toggleShowWallet(!showUpdate);
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
                        setShowGFreezzee = { setShowGFreezzee }
                        setShowGaming = { setShowGaming }
                        setShowHome = { setShowHome }
                        setShowTrading = { setShowTrading }
                        setShowWallet = { setShowWallet }/> 
                    </ul> 
                    </div> 
                </div> 
                <div className = "main" >{
                    auth ?
                    <MainContents />
                    :
                    <Welcome />
                } 
                </div> 
                {showAccount && ( <Account fetchUser = { props.fetchUser }setShowAccount = { setShowAccount }/>)} 
                {showCreate && (<CreateAccount fetchUser = {props.fetchUser} setShowCreate = { setShowCreate }/>)}
                {showLogin && ( < Login fetchUser = { props.fetchUser } setShowLogin = { setShowLogin }/>)}
                {showUpdate && ( < Update fetchUser = { props.fetchUser } setShowUpdate = {setShowUpdate} userId = {props.user._id} user = {props.user}/>)}
            </div>
        );
};
export default Homescreen;