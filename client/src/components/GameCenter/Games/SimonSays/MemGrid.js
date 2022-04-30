import React, { useState, useEffect }                            from 'react';

const MemGrid = (props) =>
{
    const grid = props.grid;

    const checkClick = (val,row,col) =>
    {
        console.log(val);
        if(val.localeCompare("ss-blue-tile") == 0)
        {
            const clicked = row+","+col;
            let sTiles = props.solvedTiles;
            if(!sTiles.includes(clicked))
            {
                props.setNumCorrect(props.numCorrect+1);
                sTiles.push(clicked);
                props.setSolvedTiles(sTiles);
            }
        }
        else
        {
            props.endGame("Simon Says",props.score);
        }
    }

    if(props.timer <= 0)
    {
        props.setShowColors(false);
    }

    if(props.numCorrect == props.blueTiles.length)
    {
        props.setScore(props.score+1);
        props.changeGrid();
    }

    return(
        <div className='mem-main'>
      <div className='mem-grid'
      >
        {grid.map((row, rowIdx) =>
          row.map((cell, colIdx) => (
            // We put the colIdx first because that is our X-axis value
            // and the rowIdx second because that is our Y-axis value
            // Getting in the habit makes using 2d grids much easier
            <Cell key={`${colIdx}-${rowIdx}`} cell={cell} handleClick = {checkClick} showColors ={props.showColors}
            row = {rowIdx} col = {colIdx} sTiles = {props.solvedTiles}/>
            
          ))
        )}
      </div>
    </div>
    );
}

export default MemGrid;
  
  function Cell({ cell , handleClick, showColors, row, col, sTiles }) {
    const thisCell = row+","+col;
    const isClicked = sTiles.includes(thisCell);
    return (
    <>
        {
            !showColors && !isClicked ?
            <div className='mem-cell' onClick = {() => handleClick(cell,row,col)}>
                -
            </div>
            :
            <div className={cell}>
                -
            </div>
        }
    </>
    )
  }
