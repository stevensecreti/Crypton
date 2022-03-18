import React, { useState }                            from 'react';
import Request from './Request';

const GameCenter = (props) => {
    const chalReqs = ["GFreezzee,BloonsTD,500","Mastermind,Soccer,200"];
    const [startScreen, setStart] = useState(true);
    const [accChalScreen, setAccChal] = useState(false);

    const acceptChallenge = () =>
    {
        setStart(false);
        setAccChal(true);
    }

    const goBack = () =>
    {
        setStart(true);
        setAccChal(false);
    }

    return(
            <>
            <div id="gc-container">
                <div className='gc-header'>
                    Game Center
                </div>
                <div className='gc-main'>
                    {
                        startScreen &&
                        (
                            <>
                            <div className='gc-pannel-l'>
                                <div className='gc-button'>
                                    Start Challenge
                                </div>
                                <div className='gc-button' onClick={acceptChallenge}>
                                    Accept Challenge
                                </div>
                            </div>
                            <div className='gc-pannel-r'>
                            <div className='gc-button'>
                                    Start Duel
                                </div>
                                <div className='gc-button'>
                                    Accept Duel
                                </div>
                            </div>
                            </>
                        ) ||
                        accChalScreen &&
                        (
                            <>
                                <div className='req-list'>
                                    {
                                        chalReqs.map(thisReq =>(
                                            <Request req ={thisReq}>
                                            </Request>
                                        ))
                                    }
                                </div>
                            </>
                        )
                        }
                </div>
                {
                    !startScreen &&
                    <div className='gc-back' onClick={goBack}>
                        Back To Game Center...
                    </div>
                }
            </div>
            </>
    );
}

export default GameCenter;