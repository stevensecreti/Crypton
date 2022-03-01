import React from 'react';
import { LOGOUT } from '../../cache/mutations';
import { useMutation, useApolloClient } from '@apollo/client';
import { WButton, WNavItem } from 'wt-frontend';

const LoggedIn = (props) => {
    const client = useApolloClient();
    const [Logout] = useMutation(LOGOUT);


    const handleLogout = async(e) => {
        Logout();
        const { data } = await props.fetchUser();
        if (data) {
            let reset = await client.resetStore();
        }
    };

    let name = props.displayName;
    return ( 
    <div id = "menu-outer" >
        <div class = "table" >
            <ul id = "horizontal-list" >
                <WNavItem hoverAnimation = "lighten" >
                <WButton className = "navbar-options"
                onClick = { props.setShow }
                wType = "texted" >
                Home </WButton> </WNavItem> 
                <WNavItem hoverAnimation = "lighten" >
                <WButton className = "navbar-options"
                onClick = { props.setShowExchange }
                wType = "texted" >
                Exchange </WButton> </WNavItem> 
                <WNavItem hoverAnimation = "lighten" >
                <WButton className = "navbar-options"
                onClick = { props.setShowWallet }
                wType = "texted" >
                Wallet </WButton> </WNavItem> 
                <WNavItem hoverAnimation = "lighten" >
                <WButton className = "navbar-options"
                onClick = { props.setShowTrading }
                wType = "texted" >
                Trading Bot </WButton> </WNavItem> 
                <WNavItem hoverAnimation = "lighten" >
                <WButton className = "navbar-options"
                onClick = { props.setShowEducation }
                wType = "texted" >
                Education Center </WButton> </WNavItem> 
                <WNavItem hoverAnimation = "lighten" >
                <WButton className = "navbar-options"
                onClick = { props.setShowGamingCenter }
                wType = "texted" >
                Gaming Center </WButton> </WNavItem> 
                <WNavItem hoverAnimation = "lighten" >
                <WButton className = "navbar-options"
                onClick = { props.setShowAccount }
                wType = "texted" > Settings </WButton> 
                </WNavItem> 
                <WNavItem hoverAnimation = "lighten" >
                <WButton className = "navbar-options"
                onClick = { props.setShowProfile }
                wType = "texted" > { name } </WButton> 
                </WNavItem> 
                <WNavItem hoverAnimation = "lighten" >
                <WButton className = "navbar-options"
                onClick = { handleLogout }
                wType = "texted" >
                Logout </WButton> </WNavItem> 
            </ul> 
        </div> 
        </div>
    );
};

const LoggedOut = (props) => {
    return ( 
        <div id = "menu-outer" >
        <div class = "table" >
            <ul id = "horizontal-list" >
                <WNavItem hoverAnimation = "lighten" >
                <WButton className = "navbar-options"
                onClick = { props.setShow }
                wType = "texted" >
                Home </WButton> </WNavItem> 
                <WNavItem hoverAnimation = "lighten" >
                <WButton className = "navbar-options"
                onClick = { props.setShowExchange }
                wType = "texted" >
                Exchange </WButton> </WNavItem> 
                <WNavItem hoverAnimation = "lighten" >
                <WButton className = "navbar-options"
                onClick = { props.setShowWallet }
                wType = "texted" >
                Wallet </WButton> </WNavItem> 
                <WNavItem hoverAnimation = "lighten" >
                <WButton className = "navbar-options"
                onClick = { props.setShowTrading }
                wType = "texted" >
                Trading Bot </WButton> </WNavItem> 
                <WNavItem hoverAnimation = "lighten" >
                <WButton className = "navbar-options"
                onClick = { props.setShowEducation }
                wType = "texted" >
                Education Center </WButton> </WNavItem> 
                <WNavItem hoverAnimation = "lighten" >
                <WButton className = "navbar-options"
                onClick = { props.setShowGamingCenter }
                wType = "texted" >
                Gaming Center </WButton> </WNavItem> 
                <WNavItem hoverAnimation = "lighten" >
                <WButton className = "navbar-options"
                onClick = { props.setShowLogin }
                wType = "texted" >  Login </WButton> 
                </WNavItem> 
                <WNavItem hoverAnimation = "lighten" >
                <WButton className = "navbar-options"
                onClick = { props.setShowCreate }
                wType = "texted" >
                Create Account </WButton> </WNavItem> 
            </ul> 
        </div> 
        </div>      
    );
};


const NavbarOptions = (props) => {
    return ( <> 
        {
            props.auth === false ? < LoggedOut setShowLogin = { props.setShowLogin }
            setShowCreate = { props.setShowCreate }
            setShowAccount = { props.setShowAccount }
            setShowExchange = { props.setShowExchange }
            setShowEducation = { props.setShowEducation }
            setShowProfile = { props.setShowProfile }
            setShowGamingCenter = { props.setShowGamingCenter }
            setShowHome = { props.setShowHome }
            setShowTrading = { props.setShowTrading }
            setShowWallet = { props.setShowWallet }
            /> :
                < LoggedIn fetchUser = { props.fetchUser }
            logout = { props.logout }
            displayName = { props.displayName }
            setShowUpdate = { props.setShowUpdate }
            setShowAccount = { props.setShowAccount }
            setShowExchange = { props.setShowExchange }
            setShowEducation = { props.setShowEducation }
            setShowProfile = { props.setShowProfile }
            setShowGamingCenter = { props.setShowGamingCenter }
            setShowHome = { props.setShowHome }
            setShowTrading = { props.setShowTrading }
            setShowWallet = { props.setShowWallet }
            />
        } </>

    );
};

export default NavbarOptions;