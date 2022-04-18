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
        <div className="friend">
            <Button className="friendProfileButton" style={{color: "white"}}>{props.name}</Button>
            <Button className="friendRemoveButton" onClick={handleAccept} style={{color: "white"}}><i className="material-icons">check</i></Button>
            <Button className="friendRemoveButton" onClick={handleDecline} style={{color: "white"}}><i className="material-icons">delete</i></Button>
        </div>
    );
}

export default FriendRequest;