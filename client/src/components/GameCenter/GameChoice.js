import React, { useState }                            from 'react';

const GameChoice = (props) =>
{
    const game = props.req;
    const isChal = props.isChal;
    return(
    <>
    {
        isChal ?
        <div className='gcListItem'>
            <div className='gameChoiceName'>
                {game}
            </div>
            <div className='gamePlayButton' onClick={() => props.chalGame(game)}>
                Start Challenge
            </div>
        </div>
        :
        <div className='gameChoice'>
            <div className='gameChoiceInfo'>
                <div className="gameChoicePicture">     
                    <img className="gameChoicePic" src="https://external-content.duckduckgo.com/iu/?u=https%3A%2F%2Fpngimg.com%2Fuploads%2Fstopwatch%2Fstopwatch_PNG91.png&f=1&nofb=1"/>
                </div>
                <div className='gameChoiceName'>
                    {game}
                </div>
                <div className="gameChoiceDescription">
                    Click the square with the X to test your reaction times!
                </div>
            </div>
            <div className='gamePlayButton' onClick={() => props.playGame(game)}>
                Play
            </div>
        </div>
    }
    </>
    );
}

export default GameChoice;