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
    const newTicTacToeGrid = () => generateGrid(5, 5, () => null);
    const [grid,setGrid] = useState(newTicTacToeGrid());

    const changeGrid = () =>
    {
        const newGrid = Array(5)
        .fill()
        .map(() =>
          Array(5)
            .fill()
            .map(() => null));
        const rrow = Math.floor(Math.random()*5);
        const rcol = Math.floor(Math.random()*5);
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

    useInterval(decTimer, 1000);

    return(
        <>
            <Grid grid = {grid} score = {score} setScore = {setScore} changeGrid = {changeGrid}
            endGame = {props.endGame} timer = {timer}
            ></Grid>
            <div className = "mem-score">
                Score: {score}
            </div>
        </>
    );
}

export default Memory;