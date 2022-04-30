import React, { useState, useEffect }                            from 'react';

import { Context, SnakeGame } from "react-game-snake";

const Snake = (props) =>
{
    const endGame = (score) =>
    {
        props.endGame("Snake",score);
    }

    return(
    <div className="gameMain">
        <div className = "gameScore">
            <br></br>
        </div>
        <div className="gameContent">
            <SnakeGame
                colors={{
                    field: "#bdc3c7",
                    food: "#9b59b6",
                    snake: "#3498db",
                }}
                countOfHorizontalFields={20}
                countOfVerticalFields={20}
                fieldSize={20}
                loopTime={100}
                pauseAllowed={false}
                restartAllowed={false}
                onLoose={context => endGame(context.game.points)}
                onWin={context => endGame(context.game.points)}
            />
        </div>
    </div>
    );
}

export default Snake;