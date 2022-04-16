import React, { useState }                            from 'react';
import Request from './Request';
import Score from './Score';
import GameChoice from './GameChoice';
import Memory from './Games/Memory/Memory';
import { use } from 'passport';

const GameCenter = (props) => {
    const chalReqs = props.challenges;
    const highscores = props.highscores;
    const games = ["Reaction"];
    const [screen, setScreen] = useState(0);
    const [screenName, setScreenName] = useState("Game Center");
    const [isChal, setIsChal] = useState(false);
    const [chalInfo, setChalInfo] = useState("");

    const chalGame = (gameName) =>
    {
        props.setShowStartChallenge(gameName);
    }

    const accChal = (gameName,chal) =>
    {
        setChalInfo(chal);
        setIsChal(true);
        playGame(gameName);
    }

    const endChal = async (game,score) =>
    {
        let challenger = chalInfo.split(",")[0];
        const chalScore = await props.getChalScore(challenger,game);
        let win = score >= chalScore;
        setChalInfo("");
        setIsChal(false);
        return win;
    }

    const playGame = (gameName) =>
    {
        const gameInd = games.indexOf(gameName)+5;
        setScreen(gameInd);
        setScreenName(gameName);
    }

    const startChallenge = () =>
    {
        setScreen(4);
        setScreenName("Start Challenge");
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

    const endGame = async (game,score) =>
    {
        if(isChal)
        {
            const chalWin = await endChal(game,score);
            if(chalWin)
            {
                alert("You Won The Challenge!");
            }
            else
            {
                alert("You Lost The Challenge.");
            }
        }
        props.updateHighscore(game,score);
        goBack();
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
                                <div className='gc-button' onClick={startChallenge}>
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
                                        chalReqs.map((thisReq,rind) =>(
                                            <Request req ={thisReq}
                                            accChal = {accChal}
                                            declineReq = {props.declineChallenge}
                                            rind = {rind}>
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
                                            <GameChoice 
                                            req ={thisGame}
                                            playGame = {playGame}
                                            isChal = {false}
                                            chalGame = {chalGame}
                                            >
                                            </GameChoice>
                                        ))
                                    }
                                </div>
                            </>
                        ) ||
                        screen == 4 &&
                        (<>
                            <div className='req-list'>
                                {
                                    games.map(thisGame =>(
                                        <GameChoice 
                                        req ={thisGame}
                                        playGame = {playGame}
                                        isChal = {true}
                                        chalGame = {chalGame}
                                        >
                                        </GameChoice>
                                    ))
                                }
                            </div>
                        </>) ||
                        screen == 5 &&
                        (<>
                        <Memory endGame = {endGame}></Memory>
                        </>)
                        }
                </div>
                {
                    (screen != 0 && screen < 5) &&
                    <div className='gc-back' onClick={goBack}>
                        Back To Game Center...
                    </div>
                }
            </div>
            </>
    );
}

export default GameCenter;