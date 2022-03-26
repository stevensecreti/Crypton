import React, {useState} from 'react';
import Friend from "../Account/Friend";


const Account = (props) => {

    let friendsList = props.friendsList;
    console.log("Friends List", friendsList);
    function addFriend(){
        props.addFriend();
    }

    return(<>
        <div className="accountScreen">
            <div className="accountHeader">
                Account Settings
            </div>
            <div className="accountMain">
                <div className="accountInfo">
                    Display Name: 
                    <div className="accountCryptosHeld">
                        Current Email:
                        <div className="accountCryptoList">
                            {//Here map each crypto held into list w bullet points
                            }
                            Current Password: <br/> <br/>
                        </div>
                        Enable 2FA:
                    </div>
                    Enable 2FA:
                </div>
                <div className="accountFriends">
                    Banner
                    <div className="accountFriendsList">
                        {//Here map each friend in list to a new friend component <Friend/>
                            friendsList ? friendsList.map((friend) => <Friend name={friend}/>) : <></>
                        }
                    </div>
                    <button className="accountAddFriend" onClick={addFriend}>Click Here to Change Banner</button>
                </div>
            </div>
        </div>    
    </>);

}
export default Account;