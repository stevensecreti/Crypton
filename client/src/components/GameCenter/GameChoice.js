import React, { useState }                            from 'react';

const GameChoice = (props) =>
{
    const game = props.req;
    return(
    <>
        <div className='score-main'>
            <div className='score-info'>
                {game}
            </div>
            <div className='play-button' onClick={() => props.playGame(game)}>
                Play
            </div>
        </div>
    </>
    );
}

export default GameChoice;