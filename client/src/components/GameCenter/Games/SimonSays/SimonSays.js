import React, { useState, useEffect }                            from 'react';
import MemGrid from './MemGrid';
import useInterval from 'react-useinterval';

const SimonSays = (props) =>
{
    const timeDelay = 20;
    const [init,setInit] = useState(true);
    const [timer,setTimer] = useState(timeDelay);
    const [score, setScore] = useState(0);
    const [showColors, setShowColors] = useState(true);
    const [numCorrect, setNumCorrect] = useState(0);
    const [blueTiles, setBlueTiles] = useState([]);
    const [solvedTiles, setSolvedTiles] = useState([]);
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
        const newGrid = Array(5)
        .fill()
        .map(() =>
          Array(3)
            .fill()
            .map(() => null));
        const numBlueTiles = Math.floor(Math.random()*4)+2;
        let bTiles = [];
        for(let i = 0;i<numBlueTiles;i++)
        {
            const rrow = Math.floor(Math.random()*5);
            const rcol = Math.floor(Math.random()*3);
            const newTile = rrow+","+rcol;
            if(bTiles.includes(newTile))
            {
                i--;
            }
            else
            {
                bTiles.push(newTile);
            }
        }
        for(let i = 0;i<5;i++)
        {
            for(let j = 0;j<3;j++)
            {
                const thisTile = i+","+j;
                if(bTiles.includes(thisTile))
                {
                    newGrid[i][j] = "ss-blue-tile";
                }
                else
                {
                    newGrid[i][j] = "ss-red-tile";
                }
            }
        }
        console.log(newGrid);
        setBlueTiles(bTiles);
        setGrid(newGrid);
        setTimer(timeDelay);
        setNumCorrect(0);
        setShowColors(true);
        setSolvedTiles([]);
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
            <div className="gameScore">
                Score: {score}
            </div>
            <div className="gameContent">
                <MemGrid grid = {grid} score = {score} setScore = {setScore} changeGrid = {changeGrid}
                endGame = {props.endGame} timer = {timer} setShowColors = {setShowColors} showColors = {showColors}
                blueTiles = {blueTiles} numCorrect = {numCorrect} setNumCorrect = {setNumCorrect}
                solvedTiles = {solvedTiles} setSolvedTiles = {setSolvedTiles}
                ></MemGrid>
            </div>
        </div>
    );
}

export default SimonSays;