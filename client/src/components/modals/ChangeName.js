import React, { useState } 	from 'react';
import { UPDATE_NAME }			from '../../cache/mutations';
import { useMutation }    	from '@apollo/client';

import { WModal, WMHeader, WMMain, WMFooter, WButton, WInput, WRow, WCol } from 'wt-frontend';

const ChangeName = (props) => {
	const [input, setInput] = useState({ email: '', password: '', firstName: '', lastName: '' });
	const [loading, toggleLoading] = useState(false);
	const [UpdateName] = useMutation(UPDATE_NAME);

	
	const updateInput = (e) => {
		const { name, value } = e.target;
		const updated = { ...input, [name]: value };
		setInput(updated);
	};

	const handleChangeName = async (e) => {
		//console.log(input.firstName);
		//console.log(input.lastName);
		if (input.firstName == "") {
			alert('All fields must be filled out to update');
			return;
		}
		else if(input.lastName == "")
		{
			alert('All fields must be filled out to update');
			return;
		}
		else {
			console.log(input.firstName, input.lastName);
			props.updateName(input.firstName, input.lastName);
			//props.updateName("test10", "test10");
			//const { loading, error, data } = await UpdateName({ variables: { ...input } });
			alert('First Name was successfully changed');
			props.setShowChangeName(false)
		}
	};

	return (
        // Replace div with WModal

		<WModal className="modal" cover={true} visible={true} animation="slide-fade-left">
			<WMHeader className="modal-header" onClose={() => props.setShowChangeName(false)}>
				Change Username
			</WMHeader>

			{
				loading ? <div />
					: <WMMain className = "modal-main">
						
						<WInput 
							className="modal-input" onBlur={updateInput} name="firstName" labelAnimation="up" 
							barAnimation="solid" labelText="First Name" wType="outlined" inputType="text" 
						/>
						<div className="modal-spacer">&nbsp;</div>
						<WInput 
							className="modal-input" onBlur={updateInput} name="lastName" labelAnimation="up" 
							barAnimation="solid" labelText="Last Name" wType="outlined" inputType="text" 
						/>

						<div className="modal-spacer">&nbsp;</div>
						
						<div className="modal-button" onClick={handleChangeName}>
							Submit
						</div>
					</WMMain>
			}
		</WModal>
	);
}

export default ChangeName;
