import React, { useState }                            from 'react';

const GameChoice = (props) =>
{
    const game = props.req;
    const isChal = props.isChal;
    const desc = props.desc;
    const imgLink = props.imgLink;
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
                    <img className="gameChoicePic" src={imgLink}/>
                </div>
                <div className='gameChoiceName'>
                    {game}
                </div>
                <div className="gameChoiceDescription">
                    {desc}
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