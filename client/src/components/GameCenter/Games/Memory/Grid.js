import React, { useState, useEffect }                            from 'react';

const Grid = (props) =>
{
    const grid = props.grid;

    const checkClick = (val) =>
    {
        console.log(val);
        if(val != null)
        {
            props.setScore(props.score+1);
            props.changeGrid();
        }
        else
        {
            props.endGame("Reaction",props.score);
        }
    }

    if(props.timer <= 0)
    {
      props.endGame("Reaction",props.score);
    }

    return(
    <div className='mem-main'>
      <div className='mem-grid'>
        {grid.map((row, rowIdx) =>
          row.map((cell, colIdx) => (
            // We put the colIdx first because that is our X-axis value
            // and the rowIdx second because that is our Y-axis value
            // Getting in the habit makes using 2d grids much easier
            <Cell key={`${colIdx}-${rowIdx}`} cell={cell} handleClick = {checkClick}/>
            
          ))
        )}
      </div>
    </div>
    );
}

export default Grid;
  
function Cell({ cell , handleClick }) {
    return (
      <div className='mem-cell' onClick = {() => handleClick(cell)}>
          {cell}
      </div>
    )
}
