import React, {useState} from 'react';
import Stack from '@mui/material/Stack';
import Button from '@mui/material/Button';

const FriendRequest = (props) => {
    function handleAccept(){
        props.acceptFriend(props.name);
    }

    function handleDecline(){
        props.declineFriend(props.name);
    }

    return(
        <div className="friend">
            <Button className="friendProfileButton">{props.name}</Button>
            <Button className="friendRemoveButton" onClick={handleAccept}><i className="material-icons">check</i></Button>
            <Button className="friendRemoveButton" onClick={handleDecline}><i className="material-icons">delete</i></Button>
        </div>
    );
}

export default FriendRequest;