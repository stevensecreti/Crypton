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
import PictureModal from '../modals/PictureModal';
import ChangeName from '../modals/ChangeName';
import ChangeEmail from '../modals/ChangeEmail';
import ChangePassword from '../modals/ChangePassword';
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
        const userAssets = ["ALG","BTC"];

        const [chalGameName, setChalGameName] = useState("");
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
        const [showPicture, toggleShowPicture] = useState(false);
        const [showChangeName, toggleShowChangeName] = useState(false);
        const [showChangeEmail, toggleShowChangeEmail] = useState(false);
        const [showChangePassword, toggleShowChangePassword] = useState(false);

        const [QRCode, setQRCode] = useState([{
            show: false,
            account: ""
        }]);
        const [temp, setTemp] = useState([])
        const [UpdateHighscore] = useMutation(mutations.UPDATE_HIGHSCORE);
        const [RemoveFriend] = useMutation(mutations.REMOVE_FRIEND);
        const [UpdateBanner] = useMutation(mutations.UPDATE_BANNER);
        const [SendChallenge] = useMutation(mutations.SEND_CHALLENGE);
        const [DeclineChallenge] = useMutation(mutations.DECLINE_CHALLENGE);
        const [GetChallengeScore] = useMutation(mutations.GET_CHALLENGE_SCORE);
        const [UpdatePfp] = useMutation(mutations.UPDATE_PFP);

        const auth = props.user === null ? false : true;
        let displayName = "";
        //const banner = "https://static.vecteezy.com/system/resources/thumbnails/000/701/690/small/abstract-polygonal-banner-background.jpg"; //Default Banner
        let banner = "https://static.vecteezy.com/system/resources/thumbnails/000/701/690/small/abstract-polygonal-banner-background.jpg";
        let pfp = "https://images.squarespace-cdn.com/content/v1/5d8bded71a675f210c969aa5/1570063393205-X7CWFW08UJGTR4QZNVGC/squish+112.png";
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
            console.log(props.user) //PRINT USER
            friends = props.user.friendsList;
            highscores = props.user.highscores;
            //banner = props.user.banner;
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
            toggleShowPicture(false);
            toggleShowChangeName(false);
            toggleShowChangeEmail(false);
            toggleShowChangePassword(false);
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

        const setShowQRCode = (defaultAccount) => {
            toggleShowQRCode(!showQRCode);
            const QRCode = produce(temp, draft => {
                draft.push({show: function(){toggleShowQRCode(false)}, account: defaultAccount})
            })
          setQRCode(QRCode);
        };

        const setShowBanner = () => {
            toggleShowBanner(!showBanner);
        };

        const setShowPicture = () => {
            toggleShowPicture(!showPicture);
        };

        const setShowChangeName = () => {
            toggleShowChangeName(!showChangeName);
        };

        const setShowChangeEmail = () => {
            toggleShowChangeEmail(!showChangeEmail);
        };

        const setShowChangePassword = () => {
            toggleShowChangePassword(!showChangePassword);
        };

        const setShowAddFriend = () => {
            toggleShowAddFriend(!showAddFriend);
        }

        const setShowStartChallenge = (gname) => {
            toggleShowStartChallenge(!showStartChallenge);
            setChalGameName(gname);
        }

        const updateHighscores = async (game,score) => {
            const updt = await UpdateHighscore({variables:{game: game,score: score,user: email}, refetchQueries: [{ query: GET_DB_USER }]});
        }

        const sendChallenge = async (amount,game,friend,coin) => {
            const updt = await SendChallenge({variables:{game: game,user: email,friend: friend,coin: coin,bet: amount}});
        }

        const declineChallenge = async (index) => {
            const updt = await DeclineChallenge({variables:{user: email,index: index}, refetchQueries: [{query: GET_DB_USER}]});
        }

        const getChallengeScore = async (user,game) => {
            const { data, loading, error } = await GetChallengeScore({variables:{user: user,game: game}});
            const score = data.getChallengeScore;
            return score;
        }

        //console.log("BEFORE BANNER: " + banner);
        const updateBanner = async (string) => {
            //console.log(string)
            //banner = string;

            //console.log(props.user);

            UpdateBanner({variables:{banner: string, user: email}, refetchQueries: [{ query: GET_DB_USER }]});

            //console.log(props.user);
            //console.log(banner);
        }
        //console.log("BANNER: " + banner);

        //console.log(banner)
        //banner = banner;

        const updatePfp = async (string) => {
            //console.log("UPDATE PFP FUNCTION")
            UpdatePfp({variables:{pfp: string, user: email}, refetchQueries: [{ query: GET_DB_USER }]});
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
                        banner = {banner}
                        pfp = {pfp}
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
                        QRCode = {QRCode}
                        setShowBanner = {setShowBanner}
                        setShowPicture = {setShowPicture}
                        setShowChangeName = {setShowChangeName}
                        setShowChangeEmail = {setShowChangeEmail}
                        setShowChangePassword = {setShowChangePassword}
                        balance = {userBalance}
                        buyingPower = {userBuyingPower}
                        balanceData = {userBalanceData}
                        walletHex = {userWalletHex}
                        addFriend={setShowAddFriend}
                        deleteFriend={handleDeleteFriend}
                        acceptFriendRequest={handleAcceptFriendRequest}
                        declineFriendRequest={handleDeclineFriendRequest}
                        updateHighscore={updateHighscores}
                        banner = {banner}
                        updateBanner={updateBanner}
                        pfp = {pfp}
                        updatePfp={updatePfp}
                        friendsList={friends}
                        friendRequests={friendRequests}
                        highscores={highscores}
                        challenges={challenges}
                        setShowStartChallenge = {setShowStartChallenge}
                        declineChallenge = {declineChallenge}
                        displayName = {displayName}
                        userEmail={email}
                        user = {props.user}
                        getChalScore = {getChallengeScore}
                    />
                    :
                    <Welcome />
                } 
                </div> 
                {showCreate && (<CreateAccount fetchUser = {props.fetchUser} setShowCreate = { setShowCreate }/>)}
                {showLogin && ( < Login fetchUser = { props.fetchUser } setShowLogin = { setShowLogin }/>)}
                {showUpdate && ( < Update fetchUser = { props.fetchUser } setShowUpdate = {setShowUpdate} userId = {props.user._id} user = {props.user}/>)}
                {showQRCode && (<QRCodeModal QRCode = {QRCode} ></QRCodeModal>)}
                {showBanner && (<BannerModal setShowBanner = {setShowBanner} ></BannerModal>)}
                {showPicture && (<PictureModal setShowPicture = {setShowPicture} ></PictureModal>)}
                {showChangeName && (<ChangeName setShowChangeName = {setShowChangeName} ></ChangeName>)}
                {showChangeEmail && (<ChangeEmail setShowChangeEmail = {setShowChangeEmail} ></ChangeEmail>)}
                {showChangePassword && (<ChangePassword setShowChangePassword = {setShowChangePassword} ></ChangePassword>)}
                {showAddFriend && (<AddFriend setShowAddFriend = {setShowAddFriend} userEmail={email}></AddFriend>)}
                {showStartChallenge && (<StartChallenge setShowStartChallenge = {setShowStartChallenge} friends = {friends} assets = {userAssets} gname = {chalGameName} sendChal = {sendChallenge}></StartChallenge>)}
            </div>
        );
};
export default Homescreen;