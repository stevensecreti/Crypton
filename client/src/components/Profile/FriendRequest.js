import React, {useState} from 'react';
import Stack from '@mui/material/Stack';
import Button from '@mui/material/Button';

const FriendRequest = (props) => {
    function handleAccept(){
        props.acceptFriendRequest(props.name);
    }

    function handleDecline(){
        props.declineFriendRequest(props.name);
    }

    return(
        <div className="profileListItem">
            <Button id="profileListButton" style={{color: "white"}}>{props.name}</Button>
            <Button id="profileListButton" onClick={handleAccept} style={{color: "white"}}><i className="material-icons">check</i></Button>
            <Button id="profileListButton" onClick={handleDecline} style={{color: "white"}}><i className="material-icons">delete</i></Button>
        </div>
    );
}

export default FriendRequest;