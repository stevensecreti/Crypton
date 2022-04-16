import React, {useState} from 'react';
import Friend from "../Profile/Friend";
import FriendRequest from "../Profile/FriendRequest";
import Highscore from "../Profile/Highscore";
import Button from '@mui/material/Button';


const Profile = (props) => {
    let friendsList = props.friendsList;
    let friendRequests = props.friendRequests;

    function addFriend(){
        props.addFriend();
    }
    return(<>
        <div className="profileScreen">
            <div className="profileHeaderWrapper">
                <div className="profileHeader">
                    <label className="-label" htmlFor="file">
                        <span className="glyphicon glyphicon-camera"></span>
                    </label>
                    <img src={props.pfp} id="output" className="pfp"/>
                    <div className="listHeader">
                        {props.userName}
                    </div>
                </div>
                <div className="profileHeaderBackground">
                    <img className="profileBanner" src={props.banner}/>
                </div>
            </div>
            <div className="profileMain">
                <div className="profileInfo">
                    <div className="listHeader">
                        User Info
                    </div>
                    <div className="profileGames">
                        <div className="listHeader">
                            Top Games
                        </div>
                        <div className="profileCryptoList">
                            {//Here map each crypto held into list w bullet points
                                props.highscores.map((highscore) => 
                                    <Highscore
                                        highscore={highscore}
                                    />
                                )
                            }
                        </div>
                    </div>
                </div>
                <div className="profileFriends">
                    <div className="friendsListHeader">
                        Friends List
                        <div className="addFriendButton">
                            <Button onClick={addFriend}><i className="material-icons" id="addFriendIcon">add</i></Button>
                        </div>
                    </div>                    
                    <div className="profileFriendsList">
                        {//Here map each friend in list to a new friend component <Friend/>
                            friendsList ? 
                            friendsList.map((friend) => 
                                <Friend 
                                    name={friend} 
                                    deleteFriend={props.deleteFriend}
                                    viewFriend={props.viewFriend}
                                />
                            ) 
                            : 
                            <></>
                        }
                    </div>
                    <div className="listHeader">
                        Friend Requests
                    </div>
                    <div className="friendRequestsList">
                        {
                            friendRequests ? 
                            friendRequests.map((friendRequest) => 
                                <FriendRequest
                                    name={friendRequest}
                                    acceptFriendRequest={props.acceptFriendRequest}
                                    declineFriendRequest={props.declineFriendRequest}
                                    
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
export default Profile;