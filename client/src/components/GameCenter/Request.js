import React, { useState }                            from 'react';

const Request = (props) =>
{
    const name = props.req.split(",")[0];
    const game = props.req.split(",")[1];
    const bet = props.req.split(",")[2];
    const score = props.req.split(",")[3];
    const index = props.rind;

    const acceptChal = () =>
    {
        props.accChal(game,props.req);
        props.declineReq(index,"",0);
    }

    const declineChal = () => {
        let refundAmt = parseInt(bet.split(" ")[0]);
        props.declineReq(index,name,refundAmt);
    }

    return(
    <>
        <div className='req-main'>
            <div className='req-info'>
                {name}
            </div>
            <div className='req-info'>
                {game}
            </div>
            <div className='req-info'>
                {bet}
            </div>
            <div className='req-info'>
                {score}
            </div>
            <div className='req-acc' onClick = {acceptChal}>
                O
            </div>
            <div className='req-dec' onClick = {declineChal}>
                X
            </div>
        </div>
    </>
    );
}

export default Request;