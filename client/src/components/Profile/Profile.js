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
    function showCryptoBucks(){
        props.showCryptoBucks();
    }
    return(<>
        <div className="profileScreen">
            <div className="profileHeaderWrapper">
                <div className="screenHeader" id="profileHeaderWrapped">
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
            </div>
            <div className="screenMain" id="profileMain">
                <div className="profileCard">
                    <div className="profileListHeader">
                        User Info
                    </div>
                    <div className="profileListMain">
                            {
                                props.highscores.map((highscore) => 
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
                        <div className="addFriendButton">
                            <Button onClick={addFriend}><i className="material-icons" id="addFriendIcon">add</i></Button>
                            <Button onClick={showCryptoBucks}><i className="material-icons" id="addFriendIcon">local_atm</i></Button>
                        </div>
                    </div>                    
                    <div className="profileListMain">
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
                </div>
                <div className="profileCard">
                    <div className="profileListHeader">
                        Friend Requests
                    </div>
                    <div className="profileListMain">
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