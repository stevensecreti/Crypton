import React, {useState} from 'react';
import Stack from '@mui/material/Stack';
import Button from '@mui/material/Button';

const FriendProfileFriend = (props) => {

    function handleViewFriend(){
        props.viewFriend(props.name);
    }

    return(
        <div className="profileListItem">
            <Button id="profileListButton" onClick={handleViewFriend} style={{color: "white"}}>{props.name}</Button>
        </div>
    );
}

export default FriendProfileFriend;