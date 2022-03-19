import React, { useState }                            from 'react';

const Score = (props) =>
{
    const game = props.req.split(",")[0];
    const score = props.req.split(",")[1];
    return(
    <>
        <div className='score-main'>
            <div className='score-info'>
                {game}
            </div>
            <div className='score-info'>
                {score}
            </div>
        </div>
    </>
    );
}

export default Score;