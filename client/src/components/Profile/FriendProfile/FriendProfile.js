import React, {useState} from 'react';
import Button from '@mui/material/Button';
import FriendProfileFriend from './FriendProfileFriend';

const FriendProfile = (props) => {
    console.log("VIEWING FREIND PROFILE");
    const friendUser = props.friendProfile;
    console.log("FriendUser: ", friendUser);
    const banner = friendUser.banner;
    const pfp = friendUser.pfp;
    const firstName = friendUser.firstName;
    const lastName = friendUser.lastName;
    const displayName = firstName + " " + lastName;
    const highscores = friendUser.highscores;
    const challenges = friendUser.challenges;
    const friendsList = friendUser.friendsList;

    function closeFriend(){
        props.closeFriend();
    }

    return(<>
        <div className="profileScreen">
            <div className="profileHeaderWrapper">
                <div className="profileHeader">
                    <label className="-label" htmlFor="file">
                        <span className="glyphicon glyphicon-camera"></span>
                    </label>
                    <img src={pfp} id="output" className="pfp"/>
                    <div className="listHeader">
                        {displayName}
                    </div>
                </div>
                <div className="profileHeaderBackground">
                    <img className="profileBanner" src={banner}/>
                </div>
            </div>
            <div className="profileMain">
                <div className="profileInfo">
                    <div className="listHeader">
                        User Info
                        <Button className="friendProfileButton" onClick={closeFriend}><i className="material-icons">delete</i></Button>
                    </div>
                    <div className="profileGames">
                        <div className="listHeader">
                            Top Games
                        </div>
                        <div className="profileCryptoList">
                            {//Here map each crypto held into list w bullet points
                            }
                            -Memory <br/>
                            -Uno <br/>
                            -Simon Says
                        </div>
                    </div>
                </div>
                <div className="profileFriends">
                    <div className="friendsListHeader">
                        Friends List
                    </div>                    
                    <div className="profileFriendsList">
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