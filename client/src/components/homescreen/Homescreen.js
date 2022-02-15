import React, { useState, useEffect } 	from 'react';
import Logo 							from '../navbar/Logo';
import NavbarOptions 					from '../navbar/NavbarOptions';
import Login 							from '../modals/Login';
import Update 							from '../modals/Update';
import CreateAccount 					from '../modals/CreateAccount';
import Welcome 							from '../main/Welcome';
import MainContents						from '../main/MainContents';
import * as mutations 					from '../../cache/mutations';
import { useMutation, useQuery } 		from '@apollo/client';
import { isObjectType } from 'graphql';


const Homescreen = (props) => {
	const [showLogin, toggleShowLogin] 		= useState(false);
	const [showCreate, toggleShowCreate] 	= useState(false);
	const [showUpdate, toggleShowUpdate] 	= useState(false);

	const auth = props.user === null ? false : true;
	let displayName = "";
	if(auth){
		const firstName = props.user.firstName;
		const lastName = props.user.lastName;
		displayName = firstName + " " + lastName;
	}
	else{
		displayName = "";
	}

	const setShowLogin = () => {
		toggleShowLogin(!showLogin);
	};

	const setShowCreate = () => {
		toggleShowCreate(!showCreate);
	};

	const setShowUpdate = () => {
		toggleShowUpdate(!showUpdate);
	};
	
	return(
		<div className="homescreen">
			<div className = "header">
				<div className="navbar">
					<ul>
						<div className="logo">
							<Logo className='logo'/>
						</div>
					</ul>
					<ul>
						<NavbarOptions
							fetchUser={props.fetchUser} auth={auth} 
							setShowCreate={setShowCreate} setShowLogin={setShowLogin}
							setShowUpdate={setShowUpdate}
						/>
					</ul>
				</div>
			</div>
			<div className="main">
				{
					auth ?
					<MainContents/>
					:
					<Welcome/>
				}
			</div>
			{
				showCreate && (<CreateAccount fetchUser={props.fetchUser} setShowCreate={setShowCreate} />)
			}

			{
				showLogin && (<Login fetchUser={props.fetchUser} setShowLogin={setShowLogin} />)
			}

			{
				showUpdate && (<Update fetchUser={props.fetchUser} setShowUpdate={setShowUpdate} userId={props.user._id} user = {props.user}/>)
			}
		</div>
	);
	
};

export default Homescreen;