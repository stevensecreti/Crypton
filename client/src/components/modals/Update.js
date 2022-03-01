import React, { useState } 	from 'react';
import { UPDATE }			from '../../cache/mutations';
import { useMutation }    	from '@apollo/client';

import { WModal, WMHeader, WMMain, WMFooter, WButton, WInput, WRow, WCol } from 'wt-frontend';

const Update = (props) => {
	const [input, setInput] = useState({ email: '', password: '', firstName: '', lastName: '' , _id: props.userId});
	const [loading, toggleLoading] = useState(false);
	const [Update] = useMutation(UPDATE);

	
	const updateInput = (e) => {
		const { name, value } = e.target;
		const updated = { ...input, [name]: value };
		setInput(updated);
	};

	const handleUpdateAccount = async (e) => {
		for (let field in input) {
			if (!input[field]) {
				alert('All fields must be filled out to register');
				return;
			}
		}
        console.log("we made it");
		const { loading, error, data } = await Update({ variables: { ...input}});
        
		if (loading) { toggleLoading(true) };
		if (error) { return `Error: ${error.message}` };
		if (data) {
			console.log(data)
			toggleLoading(false);
			props.setShowUpdate(false);
            props.fetchUser();
		};
	};

	return (
        // Replace div with WModal

		<WModal className="login-modal" cover={true} visible={true}>
			<WMHeader className="qr-header" onClose={() => props.setShowUpdate(false)}>
				Update Account Info
			</WMHeader>

			{
				loading ? <div />
					: <WMMain className = "qr-main">
						<WRow className="modal-col-gap signup-modal">
							<WCol size="6">
								<WInput 
									className="" onBlur={updateInput} name="firstName" labelAnimation="up" 
									barAnimation="solid" labelText="First Name" wType="outlined" inputType="text" defaultValue={props.user.firstName}
								/>
							</WCol>
							<WCol size="6">
								<WInput 
									className="" onBlur={updateInput} name="lastName" labelAnimation="up" 
									barAnimation="solid" labelText="Last Name" wType="outlined" inputType="text" defaultValue={props.user.lastName}
								/>
							</WCol>
						</WRow>

						<div className="modal-spacer">&nbsp;</div>
						<WInput 
							className="modal-input" onBlur={updateInput} name="email" labelAnimation="up" 
							barAnimation="solid" labelText="Email Address" wType="outlined" inputType="text" defaultValue={props.user.email}
						/>
						<div className="modal-spacer">&nbsp;</div>
						<WInput 
							className="modal-input" onBlur={updateInput} name="password" labelAnimation="up" 
							barAnimation="solid" labelText="Password" wType="outlined" inputType="password" 
						/>
						<div id="qr-button" onClick={handleUpdateAccount}>
							Submit
						</div>
					</WMMain>
			}
		</WModal>
	);
}

export default Update;