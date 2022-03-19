import React, { useState }                            from 'react';
import Request from './Request';
import Score from './Score';
import GameChoice from './GameChoice';
import Memory from './Games/Memory/Memory';

const GameCenter = (props) => {
    const chalReqs = ["GFreezzee,BloonsTD,500","Mastermind,Soccer,200","Pridey,COS,300"];
    const highscores = ["BloonsTD,11000","Soccer,4500","Call of Shooty,6000"];
    const games = ["Reaction"];
    const [screen, setScreen] = useState(0);
    const [screenName, setScreenName] = useState("Game Center");

    const playGame = (gameName) =>
    {
        const gameInd = games.indexOf(gameName)+5;
        setScreen(gameInd);
        setScreenName(gameName);
    }

    const acceptChallenge = () =>
    {
        setScreen(1);
        setScreenName("Challenges");
    }

    const viewHighscores = () =>
    {
        setScreen(2);
        setScreenName("Highscores");
    }

    const practiceGame = () =>
    {
        setScreen(3);
        setScreenName("Practice");
    }

    const goBack = () =>
    {
        setScreen(0);
        setScreenName("Game Center");
    }

    return(
            <>
            <div id="gc-container">
                <div className='gc-header'>
                    {screenName}
                </div>
                <div className='gc-main'>
                    {
                        screen == 0 &&
                        (
                            <>
                            <div className='gc-pannel-l'>
                                <div className='gc-button'>
                                    Start Challenge
                                </div>
                                <div className='gc-button' onClick={acceptChallenge}>
                                    Accept Challenge
                                </div>
                            </div>
                            <div className='gc-pannel-r'>
                            <div className='gc-button' onClick={practiceGame}>
                                    Practice Game
                                </div>
                                <div className='gc-button' onClick={viewHighscores}>
                                    Highscores
                                </div>
                            </div>
                            </>
                        ) ||
                        screen == 1 &&
                        (
                            <>
                                <div className='req-list'>
                                    {
                                        chalReqs.map(thisReq =>(
                                            <Request req ={thisReq}>
                                            </Request>
                                        ))
                                    }
                                </div>
                            </>
                        ) ||
                        screen == 2 &&
                        (
                            <>
                                <div className='req-list'>
                                    {
                                        highscores.map(thisScore =>(
                                            <Score req ={thisScore}>
                                            </Score>
                                        ))
                                    }
                                </div>
                            </>
                        ) ||
                        screen == 3 &&
                        (
                            <>
                            <div className='req-list'>
                                    {
                                        games.map(thisGame =>(
                                            <GameChoice req ={thisGame}
                                            playGame = {playGame}
                                            >
                                            </GameChoice>
                                        ))
                                    }
                                </div>
                            </>
                        ) ||
                        screen == 4 &&
                        (<></>) ||
                        screen == 5 &&
                        (<>
                        <Memory endGame = {goBack}></Memory>
                        </>)
                        }
                </div>
                {
                    screen != 0 &&
                    <div className='gc-back' onClick={goBack}>
                        Back To Game Center...
                    </div>
                }
            </div>
            </>
    );
}

export default GameCenter;