import React, {useState} from 'react';
import Button from '@mui/material/Button';
import FriendProfileFriend from './FriendProfileFriend';
import Highscore from '../Highscore';

const FriendProfile = (props) => {
    console.log("VIEWING FREIND PROFILE");
    const friendUser = props.friendProfile;
    console.log("FriendUser: ", friendUser);
    const banner = friendUser.banner;
    const pfp = friendUser.pfp;
    const firstName = friendUser.firstName;
    const lastName = friendUser.lastName;
    const displayName = firstName + " " + lastName;
    const userName = friendUser.userName;
    const highscores = friendUser.highscores;
    const challenges = friendUser.challenges;
    const friendsList = friendUser.friendsList;

    function closeFriend(){
        props.closeFriend();
    }

    return(<>
        <div className="profileScreen">
            <div className="profileHeaderWrapper">
                <div className="screenHeader" id="profileHeaderWrapped">
                    <div className="profileHeader">
                        <label className="-label" htmlFor="file">
                            <span className="glyphicon glyphicon-camera"></span>
                        </label>
                        <img src={pfp} id="output" className="pfp"/>
                        <div className="listHeader" id="usernameProfile">
                            {userName}
                        </div>
                    </div>
                </div>
                <div className="profileHeaderBackground">
                    <img className="profileBanner" src={banner}/>
                </div>
            </div>
            <div className="screenMain" id="profileMain">
                <div className="profileCard">
                    <div className="profileListHeader">
                        Highscores
                        <Button className="profileListButton" onClick={closeFriend} style={{color: "white"}}><i className="material-icons">close</i></Button>
                    </div>
                    <div className="profileListMain">
                        {//Here map each crypto held into list w bullet points
                            highscores.map((highscore) => 
                            <Highscore
                                highscore={highscore}
                            />
                            )
                        }
                    </div>
                </div>
                <div className="profileCard">
                    <div className="profileListHeader">
                        Friends List
                    </div>                    
                    <div className="profileListMain">
                        {//Here map each friend in list to a new friend component <Friend/>
                            friendsList ? 
                            friendsList.map((friend) => 
                                <FriendProfileFriend 
                                    name={friend} 
                                    viewFriend={props.viewFriend}
                                />
                            ) 
                            : 
                            <></>
                        }
                    </div>
                </div>
            </div>
        </div>    
    </>);
}
export default FriendProfile;