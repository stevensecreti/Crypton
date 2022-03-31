import React, { useState }                            from 'react';

const GameChoice = (props) =>
{
    const game = props.req;
    const isChal = props.isChal;
    return(
    <>
    {
        isChal ?
        <div className='score-main'>
            <div className='score-info'>
                {game}
            </div>
            <div className='play-button' onClick={() => props.chalGame(game)}>
                Start Challenge
            </div>
        </div>
        :
        <div className='score-main'>
            <div className='score-info'>
                {game}
            </div>
            <div className='play-button' onClick={() => props.playGame(game)}>
                Play
            </div>
        </div>
    }
    </>
    );
}

export default GameChoice;