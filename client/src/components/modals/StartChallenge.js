import React, { useState } 	from 'react';
import { WModal, WMHeader, WMMain, WMFooter, WButton, WInput } from 'wt-frontend';

const StartChallenge = (props) =>{
    const [betAmount, setBetAmount] = useState(0);
    const updateInput = (e) =>
    {
        const { name, value } = e.target;
        setBetAmount(value);
    }

    return(<>
        <WModal className="login-modal" cover={true} visible={true}>
        <WMHeader className="qr-header" onClose={() => props.setShowStartChallenge()}>
				Start Challenge
			</WMHeader>
            <WMMain className="chal-main">
                <WInput className="modal-input" onBlur={updateInput} name='bet' labelAnimation="up" barAnimation="solid" labelText="Bet Amount" wType="outlined" inputType='number' />
                <br></br>
                <select>
                {props.friends.map((friend, idx) => {
                                return(<option key={idx} value={friend}>{friend}</option>);
                            })}   
                </select>
            </WMMain>
        </WModal>
        </>);
}

export default StartChallenge;