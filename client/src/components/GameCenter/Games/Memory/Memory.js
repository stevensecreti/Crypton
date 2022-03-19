import React, { useState, useEffect }                            from 'react';
import Grid from './Grid';

const Memory = (props) =>
{
    const [timer,setTimer] = useState(true);
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
    }

    if(timer)
    {
        setTimer(false);
        changeGrid();
    }

    

    return(
        <>
            <Grid grid = {grid} score = {score} setScore = {setScore} changeGrid = {changeGrid}
            endGame = {props.endGame}
            ></Grid>
            <div className = "mem-score">
                Score: {score}
            </div>
        </>
    );
}

export default Memory;