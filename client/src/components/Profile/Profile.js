import React, {useState} from 'react';
import Friend from "../Profile/Friend";
import FriendRequest from "../Profile/FriendRequest";
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
                    <img src="https://images.squarespace-cdn.com/content/v1/5d8bded71a675f210c969aa5/1570063393205-X7CWFW08UJGTR4QZNVGC/squish+112.png" id="output" className="pfp"/>
                    <div className="listHeader">
                        {props.displayName}
                    </div>
                </div>
                <div className="profileHeaderBackground">
                    <img className="profileBanner" src="https://static.vecteezy.com/system/resources/thumbnails/000/701/690/small/abstract-polygonal-banner-background.jpg"/>
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