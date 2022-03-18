import React, {useState} from 'react';

const Profile = (props) => {

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
                    Friends List
                    <div className="profileFriendsList">
                        {//Here map each friend in list to a new friend component <Friend/>
                        }
                    </div>
                    <button className="profileAddFriend" onClick={addFriend}>Add Friend</button>
                </div>
            </div>
        </div>    
    </>);

}
export default Profile;