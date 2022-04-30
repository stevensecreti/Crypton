import React, { useState } from 'react';
import Button from '@mui/material/Button';
const CoinSelection = (props) => {
    
    function coinClicked(){
        props.handleSelect(props.value);
    }
    
    return(
        <div className="marketCoinListItem" onClick={coinClicked}>
            {props.name}
        </div>
    );
}
export default CoinSelection;