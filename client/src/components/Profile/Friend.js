import React, {useState} from 'react';
import Stack from '@mui/material/Stack';
import Button from '@mui/material/Button';

const Friend = (props) => {
    console.log("Made it");
    return(
        <div className="friend">
            <Button className="friendProfileButton">{props.name}</Button>
            <Button className="friendRemoveButton"><i className="material-icons">delete</i></Button>
        </div>
    );
}

export default Friend;