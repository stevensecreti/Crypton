import React, { useState } 	from 'react';
import { REGISTER }			from '../../cache/mutations';
import { useMutation }    	from '@apollo/client';

import { WModal, WMHeader, WMMain, WMFooter, WButton, WInput, WRow, WCol } from 'wt-frontend';

const ChangePassword = (props) => {
	const [input, setInput] = useState({ email: '', password: '', firstName: '', lastName: '' });
	const [loading, toggleLoading] = useState(false);
	const [Register] = useMutation(REGISTER);

	
	const updateInput = (e) => {
		const { name, value } = e.target;
		const updated = { ...input, [name]: value };
		setInput(updated);
	};

	const handleChangePassword = async (e) => {
		console.log(input.password); //SUBMITTED PASSWORD

		if (input.password == "") {
			alert('All fields must be filled out to update');
			return;
		}
		else {
			props.updatePassword(input.password);
			//props.updatePassword("test6");
			alert('Password was successfully changed');
			props.setShowChangePassword(false)
		}
	};

	return (
        // Replace div with WModal

		<WModal className="modal" cover={true} visible={true} animation="slide-fade-left">
			<WMHeader className="modal-header" onClose={() => props.setShowChangePassword(false)}>
				Change Password
			</WMHeader>

			{
				loading ? <div />
					: <WMMain className = "modal-main" >
						<WInput 
							className="modal-input" onBlur={updateInput} name="password" labelAnimation="up" 
							barAnimation="solid" labelText="Password" wType="outlined" inputType="password" 
						/>
						<div className="modal-spacer">&nbsp;</div>
						<div className="modal-button" onClick={handleChangePassword}>
							Submit
						</div>
					</WMMain>
			}
		</WModal>
	);
}

export default ChangePassword;
