import React, { useState } 	from 'react';
import { FRIEND_REQUEST } 			from '../../cache/mutations';
import { useMutation }    	from '@apollo/client';

import { WModal, WMHeader, WMMain, WMFooter, WButton, WInput } from 'wt-frontend';

const AddFriend = (props) => {
    const [input, setInput] = useState({ userName: '', user: props.userName});
    const [loading, toggleLoading] = useState(false);
	const [showErr, displayErrorMsg] = useState(false);
	const errorMsg = "User not found.";
    const [FriendRequest] = useMutation(FRIEND_REQUEST);

    const updateInput = (e) => {
		const { name, value } = e.target;
		const updated = { ...input, [name]: value };
		setInput(updated);
	}

    const handleAddFriend = async (e) => {
        const updated = {...input, user: props.userName};
        setInput(updated);
        console.log("input: ", input);
        const added = await FriendRequest({variables: { ...input}});
        console.log("Added?", added);
        if(!added.data.friendRequest){
            displayErrorMsg(true);
            return;
        }
        else{
            alert("Successfully Added Friend!");
            props.setShowAddFriend(false);
        };

    }

    return(

    <WModal className="modal" cover={true} visible={true} animation="slide-fade-top">
        <WMHeader className="modal-header" onClose={() => props.setShowAddFriend(false)}>
            Send Friend Request
        </WMHeader>
        {
            loading ? <div />
                : <WMMain className="modal-main">

                    <WInput className="modal-input" onBlur={updateInput} name='userName' labelAnimation="up" barAnimation="solid" labelText="Friend's Username" wType="outlined" inputType='text' />

                    {
                        showErr ? <div className='modal-error'>
                            {errorMsg}
                        </div>
                            : <div className='modal-error'>&nbsp;</div>
                    }
                    <div className="modal-button-1" onClick={handleAddFriend}>
                        Add
                    </div>
                </WMMain>  
        }
    </WModal>
    );
}

export default AddFriend;