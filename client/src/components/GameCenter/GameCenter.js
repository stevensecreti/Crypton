import React, { useState }                            from 'react';
import Request from './Request';
import Score from './Score';
import GameChoice from './GameChoice';
import Memory from './Games/Memory/Memory';
import SimonSays from './Games/SimonSays/SimonSays';
import Snake from "./Games/Snake/Snake";
import Button from '@mui/material/Button';
import TetrisGame from './Games/Tetris/Tetris';

import ReactionImg from '../images/Reaction.png';
import MemoryImg from '../images/Memory.png';
import SnakeImg from '../images/Snake.png';
import TetrisImg from '../images/Tetris.png';

import { use } from 'passport';

const GameCenter = (props) => {
    const chalReqs = props.challenges;//Users challenge requests
    const gcBalance = props.gcBalance != undefined ? props.gcBalance : 0;//Users KryptonBuck balance
    const highscores = props.highscores;//Users list of game highscores
    const games = ["Reaction","Memory","Snake","Tetris"];//List of playable games
    const [screen, setScreen] = useState(0);//Current game center screen index
    const [screenName, setScreenName] = useState("Game Center");//Name of current game center screen
    const [isChal, setIsChal] = useState(false);//Flag for if current game is a challenge
    const [isChaling, setIsChaling] = useState(false);
    const [chalInfo, setChalInfo] = useState("");//Info of challenge currently being played
    
    const images = [ReactionImg, MemoryImg, SnakeImg, TetrisImg];
    const descriptions = ["Remember OSU? Check out our NEW and IMPROVED version!","Lets see if you can remember where the blue tiles are. Be careful! One wrong move and its game over.","Keep munching those apples to continue to grow!","Classic Tetris. Try to beat your highscore!"];

    //Open challenge modal
    const chalGame = (gameName) =>
    {
        setIsChaling(true);
        playGame(gameName);
    }
    //Accept challenge from request list, start game, and check for user wager funds
    const accChal = async (gameName,chal) =>
    {
        let chalAmt = parseInt(chal.split(",")[2].split(" ")[0]);
        const hasFunds = await props.updateCryptonBucks(chalAmt,false,"");
        if(hasFunds)
        {
            setChalInfo(chal);
            setIsChal(true);
            playGame(gameName);
            console.log(gameName);
        }
        else
        {
            alert("Insufficient funds");
            let challenger = chal.split(",")[0];
            let chalAmt = parseInt(chal.split(",")[2].split(" ")[0]);
            const fin = await props.updateCryptonBucks(chalAmt,true,challenger);
        }
    }
    //Decide winner of challenge and give out winnings accordingly
    const endChal = async (game,score) =>
    {
        let chalAmt = parseInt(chalInfo.split(",")[2].split(" ")[0]);
        let challenger = chalInfo.split(",")[0];
        let chalScore = parseInt(chalInfo.split(",")[3]);
        let win = score > chalScore;
        let winner = win ? "" : challenger;
        const fin = await props.updateCryptonBucks(2*chalAmt,true,winner);
        setChalInfo("");
        setIsChal(false);
        return win;
    }
    //Start a game
    const playGame = (gameName) =>
    {
        const gameInd = games.indexOf(gameName)+5;
        setScreen(gameInd);
        setScreenName(gameName);
        console.log(gameInd);
    }
    //Go to start challenges screen
    const startChallenge = () =>
    {
        setScreen(4);
        setScreenName("Start Challenge");
    }
    //Go to challenge list screen
    const acceptChallenge = () =>
    {
        setScreen(1);
        setScreenName("Challenges");
    }
    //Go to highscores screen
    const viewHighscores = () =>
    {
        setScreen(2);
        setScreenName("Highscores");
    }
    //Go to playable games screen 
    const practiceGame = () =>
    {
        setScreen(3);
        setScreenName("Practice");
    }
    //Go back to main game center screen
    const goBack = () =>
    {
        setScreen(0);
        setScreenName("Game Center");
    }
    //Update highscores after game and alert player if challenge mode enabled
    const endGame = async (game,score) =>
    {
        if(isChaling)
        {
            setIsChaling(false);
            props.updateChalScore(score);
            props.setShowStartChallenge(game);
        }
        if(isChal)
        {
            setIsChal(false);
            const chalWin = await endChal(game,score);
            props.showResult(chalWin);
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
                        screen == 1 && //Screen 1 is Challenge Requests
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
                                        games.map((thisGame, i) =>(
                                            <GameChoice 
                                            req ={thisGame}
                                            playGame = {playGame}
                                            isChal = {false} //If game is a challenge
                                            chalGame = {chalGame}
                                            image={images[i]}
                                            description={descriptions[i]}
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
                        ||
                        screen == 7 && //Snake
                        (<>
                        <Snake endGame = {endGame}></Snake>
                        </>)
                        ||
                        screen == 8 && //Tetris
                        (<>
                        <TetrisGame endGame = {endGame}></TetrisGame>
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