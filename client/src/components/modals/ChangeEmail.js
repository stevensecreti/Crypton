import React, { useState } 	from 'react';
import { REGISTER }			from '../../cache/mutations';
import { useMutation }    	from '@apollo/client';

import { WModal, WMHeader, WMMain, WMFooter, WButton, WInput, WRow, WCol } from 'wt-frontend';

const ChangeEmail = (props) => {
	const [input, setInput] = useState({ email: '', password: '', firstName: '', lastName: '' });
	const [loading, toggleLoading] = useState(false);
	const [Register] = useMutation(REGISTER);
	
	const updateInput = (e) => {
		const { name, value } = e.target;
		const updated = { ...input, [name]: value };
		setInput(updated);
	};

	const handleChangeEmail = async (e) => {
		for (let field in input) {
			if (!input[field]) {
				alert('All fields must be filled out to register');
				return;
			}
		
		}
		console.log("Before Register:)")
		const { loading, error, data } = await Register({ variables: { ...input } });
		if (loading) { toggleLoading(true) };
		if (error) { return `Error: ${error.message}` 
			console.log(`Error: ${error.message}`)
		};
		if (data) {
			console.log(data)
			toggleLoading(false);
			if(data.register.email === 'already exists') {
				alert('User with that email already registered');
			}
			else {
				props.fetchUser();
			}
			props.setShowChange(false);

		};
	};

	return (
        // Replace div with WModal

		<WModal className="login-modal" cover={true} visible={true}>
			<WMHeader className="qr-header" onClose={() => props.setShowChangeEmail(false)}>
				Change Email
			</WMHeader>

			{
				loading ? <div />
					: <WMMain className = "qr-main">
						<WRow className="modal-col-gap signup-modal">
							<WCol size="6">
								
							</WCol>
							
						</WRow>

						<div className="modal-spacer">&nbsp;</div>
						<WInput 
							className="modal-input" onBlur={updateInput} name="email" labelAnimation="up" 
							barAnimation="solid" labelText="Email Address" wType="outlined" inputType="text" 
						/>
						<div className="modal-spacer">&nbsp;</div>
						
						<div id="qr-button" onClick={handleChangeEmail}>
							Submit
						</div>
					</WMMain>
			}
		</WModal>
	);
}

export default ChangeEmail;
