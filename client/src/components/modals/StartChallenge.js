import React, { useState } 	from 'react';
import { WModal, WMHeader, WMMain, WMFooter, WButton, WInput } from 'wt-frontend';
import {WCol, WRow} from 'wt-frontend';

const StartChallenge = (props) =>{
    const [betAmount, setBetAmount] = useState("");
    const [chalFriend, setChalFriend] = useState("");
    const [chalCoin, setChalCoin] = useState("");
    const [init, setInit] = useState(false);
    const assets = props.assets;
    const friends = props.friends;
    const gname = "Start "+props.gname+" Challenge";
    
    if(!init)
    {
        if(assets.length > 0)
        {
            setChalCoin(assets[0]);
        }
        if(friends.length > 0)
        {
            setChalFriend(friends[0]);
        }
        setBetAmount("0.0");
        setInit(true);
    }

    const updateInput = (e) =>
    {
        const { name, value } = e.target;
        setBetAmount(value);
    }

    const updateFriend = (e) =>
    {
        const { name, value } = e.target;
        setChalFriend(value);
    }

    const updateCoin = (e) =>
    {
        const { name, value } = e.target;
        setChalCoin(value);
    }

    const startChallenge = () =>
    {
        props.sendChal(betAmount,props.gname,chalFriend,chalCoin);
        props.setShowStartChallenge();
    }

    return(<>
        <WModal className="login-modal" cover={true} visible={true}>
        <WMHeader className="qr-header" onClose={() => props.setShowStartChallenge()}>
				{gname}
			</WMHeader>
            <WMMain className="chal-main">
                <WRow>
                    <WCol size="6">
                        <label className="chal-label" htmlFor="friend-select">Choose a friend:</label>
                        <select id="friend-select" className="friend-drop" onBlur={updateFriend}>
                        {friends.map((friend, idx) => {
                                        return(<option key={idx} value={friend}>{friend}</option>);
                                    })}   
                        </select>
                        <WInput className="modal-input" onBlur={updateInput} name='bet' labelAnimation="up" barAnimation="solid" labelText="Coin Amount" wType="outlined" inputType='text' />
                    </WCol>
                    <WCol size="6">
                        <label className="chal-label" htmlFor="coin-select">Choose a coin:</label>
                        <select id="coin-select" className="friend-drop" onBlur={updateCoin}>
                        {assets.map((asset, idx) => {
                                        return(<option key={idx} value={asset}>{asset}</option>);
                                    })}   
                        </select>
                        <div className="chal-button" onClick={startChallenge}>
                            Start Challenge
                        </div>
                    </WCol>
                </WRow>
            </WMMain>
        </WModal>
        </>);
}

export default StartChallenge;