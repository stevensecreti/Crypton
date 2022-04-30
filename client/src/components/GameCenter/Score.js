import React, { useState }                            from 'react';

const Score = (props) =>
{
    const game = props.req.split(",")[0];
    const score = props.req.split(",")[1];
    return(
    <>
        <div className='gcListItem'>
            <div className='gameChoiceName'>
                {game}
            </div>
            <div className='gameHighScore'>
                {score}
            </div>
        </div>
    </>
    );
}

export default Score;