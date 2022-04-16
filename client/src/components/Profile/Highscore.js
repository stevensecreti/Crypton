import React, {useState} from 'react';
import Stack from '@mui/material/Stack';
import Button from '@mui/material/Button';

const Highscore = (props) => {
    const hs = props.highscore.split(",");
    const game = hs[0];
    const score = hs[1];
    return(
        <div className="highscore">
           <div className="game">{game}: {score}</div>
        </div>
    );
}

export default Highscore;