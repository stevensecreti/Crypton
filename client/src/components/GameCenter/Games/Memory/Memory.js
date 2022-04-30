import React, { useState, useEffect }                            from 'react';
import Grid from './Grid';
import useInterval from 'react-useinterval';

const Memory = (props) =>
{
    const timeDelay = 10;
    const [init,setInit] = useState(true);
    const [timer,setTimer] = useState(timeDelay);
    const [score, setScore] = useState(0);
    function generateGrid(rows, columns, mapper) {
        return Array(rows)
          .fill()
          .map(() =>
            Array(columns)
              .fill()
              .map(mapper)
          )
      }
    const newTicTacToeGrid = () => generateGrid(3, 3, () => null);
    const [grid,setGrid] = useState(newTicTacToeGrid());

    const changeGrid = () =>
    {
        const newGrid = Array(3)
        .fill()
        .map(() =>
          Array(3)
            .fill()
            .map(() => null));
        const rrow = Math.floor(Math.random()*3);
        const rcol = Math.floor(Math.random()*3);
        newGrid[rrow][rcol] = "X";
        setGrid(newGrid);
        setTimer(timeDelay);
    }

    const decTimer = () =>
    {
        setTimer(timer-1);
    }

    if(init)
    {
        setInit(false);
        changeGrid();
    }

    useInterval(decTimer, 100);

    return(
        <div className="gameMain">
            <div className = "gameScore">
                Score: {score}
            </div>
            <div className="gameContent">
                <Grid grid = {grid} score = {score} setScore = {setScore} changeGrid = {changeGrid}
                                    endGame = {props.endGame} timer = {timer}
                ></Grid>
            </div>
        </div>
    );
}

export default Memory;