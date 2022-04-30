import React, {useState} from 'react';
import Stack from '@mui/material/Stack';
import Button from '@mui/material/Button';

const Friend = (props) => {

    function handleDelete(){
        props.deleteFriend(props.name);
    }

    function handleViewFriend(){
        props.viewFriend(props.name);
    }

    return(
        <div className="profileListItem">
            <Button id="profileListButton" onClick={handleViewFriend} style={{color: "white"}}>{props.name}</Button>
            <Button id="profileListButton" onClick={handleDelete}><i className="material-icons" style={{color: "white"}}>delete</i></Button>
        </div>
    );
}

export default Friend;