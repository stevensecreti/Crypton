import React, { useState } 	from 'react';
import { WModal, WMHeader, WMMain, WMFooter, WButton, WInput } from 'wt-frontend';
import {WCol, WRow} from 'wt-frontend';

const StartChallenge = (props) =>{
    const [betAmount, setBetAmount] = useState("");
    const [chalFriend, setChalFriend] = useState("");
    const [init, setInit] = useState(false);
    const friends = props.friends;
    const gname = "Start "+props.gname+" Challenge";
    
    if(!init)
    {
        if(friends.length > 0)
        {
            setChalFriend(friends[0]);
        }
        setBetAmount("0");
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

    const startChallenge = async () =>
    {
        if(!isNaN(parseInt(betAmount)))
        {
            const hasBucks = await props.updateCryptonBucks(parseInt(betAmount),false,"");
            console.log("Has Bucks: "+hasBucks);
            if(hasBucks)
            {
                props.sendChal(parseInt(betAmount)+"",props.gname,chalFriend,"CB");
                props.setShowStartChallenge();
            }
            else
            {
                alert("Insufficient Funds");
            }
        }
        else
        {
            alert("Enter a valid whole number amount");
        }
    }

    return(<>
        <WModal className="modal" cover={true} visible={true} animation="slide-fade-left">
        <WMHeader className="modal-header" onClose={() => props.setShowStartChallenge()}>
				{gname}
			</WMHeader>
            <WMMain className="chal-main">
                <WRow>
                    <WCol size="6">
                        <label className="modal-algo" htmlFor="friend-select">Choose a friend:</label>
                        <select id="friend-select" className="friend-drop" onBlur={updateFriend}>
                        {friends.map((friend, idx) => {
                                        return(<option className="modal-algo" key={idx} value={friend}>{friend}</option>);
                                    })}   
                        </select>
                    </WCol>
                    <WCol size="6">
                        <WInput className="modal-input" onBlur={updateInput} name='bet' labelAnimation="up" barAnimation="solid" labelText="Coin Amount" wType="outlined" inputType='text' />
                    </WCol>
                </WRow>
                <div className="modal-button" onClick={startChallenge}>
                            Start Challenge
                </div>
            </WMMain>
        </WModal>
        </>);
}

export default StartChallenge;