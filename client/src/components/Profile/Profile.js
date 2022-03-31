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
            <div className="profileHeader">
                Here is Profile Header!
            </div>
            <div className="profileMain">
                <div className="profileInfo">
                    User Info
                    <div className="profileCryptosHeld">
                        Cryptocurriencies Held:
                        <div className="profileCryptoList">
                            {//Here map each crypto held into list w bullet points
                            }
                            -BTC <br/>
                            -ETH <br/>
                            -ALGO
                        </div>
                        Tendencies: Bullish
                    </div>
                </div>
                <div className="profileFriends">
                    <div className="friendsListHeader">
                        Friends List
                        <Button onClick={addFriend}><i className="material-icons">add</i></Button>
                    </div>                    
                    <div className="profileFriendsList">
                        {//Here map each friend in list to a new friend component <Friend/>
                            friendsList ? friendsList.map((friend) => <Friend name={friend} deleteFriend={props.deleteFriend}/>) : <></>
                        }
                    </div>
                    <div className="friendRequestsHeader">
                        Friend Requests
                    </div>
                    <div className="friendRequestsList">
                        {
                            friendRequests ? friendRequests.map((friendRequest) => <FriendRequest
                            name={friendRequest}
                            acceptFriendRequest={props.acceptFriendRequest}
                            declineFriendRequest={props.declineFriendRequest}
                            />)
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