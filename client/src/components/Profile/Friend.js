import React, {useState} from 'react';
import Stack from '@mui/material/Stack';
import Button from '@mui/material/Button';

const Friend = (props) => {

    function handleDelete(){
        props.deleteFriend(props.name);
    }

    return(
        <div className="friend">
            <Button className="friendProfileButton">{props.name}</Button>
            <Button className="friendRemoveButton" onClick={handleDelete}><i className="material-icons">delete</i></Button>
        </div>
    );
}

export default Friend;