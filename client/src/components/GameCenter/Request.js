import React, { useState }                            from 'react';

const Request = (props) =>
{
    const name = props.req.split(",")[0];
    const game = props.req.split(",")[1];
    const bet = props.req.split(",")[2];
    const index = props.rind;

    const declineChal = () => {
        props.declineReq(index);
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
            <div className='req-acc'>
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