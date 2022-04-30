import React, { useState }                            from 'react';
import Request from './Request';
import Score from './Score';
import GameChoice from './GameChoice';
import Memory from './Games/Memory/Memory';
import SimonSays from './Games/SimonSays/SimonSays';
import Button from '@mui/material/Button';
import { use } from 'passport';

const GameCenter = (props) => {
    const chalReqs = props.challenges;
    const gcBalance = props.gcBalance != undefined ? props.gcBalance : 0;
    const highscores = props.highscores;
    const games = ["Reaction","Simon Says"];
    const [screen, setScreen] = useState(0);
    const [screenName, setScreenName] = useState("Game Center");
    const [isChal, setIsChal] = useState(false);
    const [chalInfo, setChalInfo] = useState(""); //Info about the challenge

    const chalGame = (gameName) =>
    {
        props.setShowStartChallenge(gameName);
    }

    const accChal = async (gameName,chal) =>
    {
        let chalAmt = parseInt(chal.split(",")[2].split(" ")[0]);
        const hasFunds = await props.updateCryptonBucks(chalAmt,false,"");
        if(hasFunds)
        {
            setChalInfo(chal);
            setIsChal(true);
            playGame(gameName);
        }
        else
        {
            alert("Insufficient funds");
        }
    }

    const endChal = async (game,score) =>
    {
        let chalAmt = parseInt(chalInfo.split(",")[2].split(" ")[0]);
        let challenger = chalInfo.split(",")[0];
        const chalScore = await props.getChalScore(challenger,game);
        let win = score > chalScore;
        let winner = win ? "" : challenger;
        const fin = await props.updateCryptonBucks(2*chalAmt,true,winner);
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
        await props.updateHighscore(game,score);
        goBack();
    }

    return(
            <>
            <div className="screenContainer">
                <div className="screenHeader">
                    {screenName}
                </div>
                <div className="screenHeader" id="gcBalanceHeader">
                        <div>Balance: {gcBalance} CryptonBucks</div>
                        <Button id='gcBalanceButton' onClick={props.showCryptoBucks}>
                            Add Funds
                        </Button>
                </div>
                <div className='screenMain' id="gameCenterFull">
                    {
                        screen == 0 && //Game Center Home
                        (
                            <div className="screenMain gameCenterHome">
                                <div className='gameCenterCard'>
                                    <div className="gameCenterCardHeader">
                                        Challenge a Friend
                                    </div>
                                    <div className="gameCenterCardButtons">
                                        <div className="gameCenterCardButton" onClick={startChallenge}>
                                            Start Challenge
                                        </div>
                                        <div className="gameCenterCardButton" onClick={acceptChallenge}>
                                            Accept Challenge
                                        </div>
                                    </div>
                                </div>
                                <div className="gameCenterCard">
                                    <div className="gameCenterCardHeader">
                                        Practice
                                    </div>
                                    <div className="gameCenterCardButtons">
                                        <div className="gameCenterCardButton" onClick={practiceGame}>
                                            Practice Game
                                        </div>
                                        <div className="gameCenterCardButton" onClick={viewHighscores}>
                                            Highscores
                                        </div>
                                    </div>
                                </div>
                            </div>
                        ) ||
                        screen == 1 && //Screen 1 is Chal Requests
                        (
                            <>
                                <div className='gcList'>
                                    {
                                        chalReqs.map((thisReq,rind) =>( //Rind = ReqIndex
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
                        screen == 2 && //Screen 2 is Highscores
                        (
                            <>
                                <div className='gcList'>
                                    {
                                        highscores.map(thisScore =>(
                                            <Score req ={thisScore}>
                                            </Score>
                                        ))
                                    }
                                </div>
                            </>
                        ) ||
                        screen == 3 && //Practice Game Screen
                        (
                            <>
                            <div className="gcList">
                                    {
                                        games.map(thisGame =>(
                                            <GameChoice 
                                            req ={thisGame}
                                            playGame = {playGame}
                                            isChal = {false} //If game is a challenge
                                            chalGame = {chalGame}
                                            >
                                            </GameChoice>
                                        ))
                                    }
                            </div>
                            </>
                        ) ||
                        screen == 4 && //Start Challenge Screen
                        (<>
                            <div className='gcList'>
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
                        screen == 5 && //Memory Game
                        (<>
                        <Memory endGame = {endGame}></Memory>
                        </>)
                        ||
                        screen == 6 && //Simon Says Game
                        (<>
                        <SimonSays endGame = {endGame}></SimonSays>
                        </>)
                        }
                        {
                            (screen != 0 && screen < 5) &&
                            <div className='gc-back' onClick={goBack}>
                                Back To Game Center...
                            </div>
                        }
                </div>
                
            </div>
            </>
    );
}

export default GameCenter;