const ObjectId = require('mongoose').Types.ObjectId;
const bcrypt = require('bcryptjs');
const User = require('../models/user-model');
const tokens = require('../utils/tokens');

module.exports = {
	Query: {
		/** 
		 	@param 	 {object} req - the request object containing a user id
			@returns {object} the user object on success and an empty object on failure 
		**/
		getCurrentUser: async (_, __, { req }) => {
			const _id = new ObjectId(req.userId);
			if(!_id) { return({}) }
			const found = await User.findOne(_id);
			if(found) return found;
		},
	},
	Mutation: {
		/** 
			@param 	 {object} args - login info
			@param 	 {object} res - response object containing the current access/refresh tokens  
			@returns {object} the user object or an object with an error message
		**/
		login: async (_, args, { res }) => {	
			const { email, password } = args;

			const user = await User.findOne({email: email});
			if(!user) return({});

			const valid = await bcrypt.compare(password, user.password);
			if(!valid) return({});
			// Set tokens if login info was valid
			const accessToken = tokens.generateAccessToken(user);
			const refreshToken = tokens.generateRefreshToken(user);
			res.cookie('refresh-token', refreshToken, { httpOnly: true , sameSite: 'None', secure: true}); 
			res.cookie('access-token', accessToken, { httpOnly: true , sameSite: 'None', secure: true}); 
			return user;
		},
		/** 
			@param 	 {object} args - registration info
			@param 	 {object} res - response object containing the current access/refresh tokens  
			@returns {object} the user object or an object with an error message
		**/
		register: async (_, args, { res }) => {
			console.log("In Register");
			const { email, password, firstName, lastName } = args;
			const alreadyRegistered = await User.findOne({email: email});
			if(alreadyRegistered) {
				console.log('User with that email already registered.');
				return(new User({
					_id: '',
					firstName: '',
					lastName: '',
					email: 'already exists', 
					password: '',
					initials: ''}));
			}
			const hashed = await bcrypt.hash(password, 10);
			const _id = new ObjectId();
			const user = new User({
				_id: _id,
				firstName: firstName,
				lastName: lastName,
				email: email, 
				password: hashed,
				initials: `${firstName[0]}.${lastName[0]}.`,
				gameCenterBalance: 0,
				friendsList: [],
				friendRequests: []
			})
			console.log("Created new User")
			const saved = await user.save();
			// After registering the user, their tokens are generated here so they
			// are automatically logged in on account creation.
			const accessToken = tokens.generateAccessToken(user);
			const refreshToken = tokens.generateRefreshToken(user);
			res.cookie('refresh-token', refreshToken, { httpOnly: true , sameSite: 'None', secure: true}); 
			res.cookie('access-token', accessToken, { httpOnly: true , sameSite: 'None', secure: true}); 
			return user;
		},
		/** 
			@param 	 {object} res - response object containing the current access/refresh tokens  
			@returns {boolean} true 
		**/
		update: async (_, args) => {
			const { email, password, firstName, lastName, _id} = args;
			let { value } = args;

			const hashed = await bcrypt.hash(password, 10);
			const updated1 = await User.updateOne({_id: _id}, { firstName: firstName });
			const updated2 = await User.updateOne({_id: _id}, { lastName: lastName });
			const updated3 = await User.updateOne({_id: _id}, { email: email });
			const updated4 = await User.updateOne({_id: _id}, { password: hashed });
			if(updated1){
				return true
			}
			return false;
		},
		logout:(_, __, { res }) => {
			res.clearCookie('refresh-token');
			res.clearCookie('access-token');
			return true;
		},
		friendRequest: async (_, args) => {
			const { toEmail, fromEmail} = args;

			console.log("ToEmail: ", toEmail, "From Email: ", fromEmail);
			
			const toUser = await User.findOne({email: toEmail});
			if(!toUser) return false;

			const fromUser = await User.findOne({email: fromEmail});
			if(!fromUser) return false;

			userToFriendsList = toUser.friendsList;
			updatedUTFL = userToFriendsList.push(fromEmail);
			const added1 = await User.updateOne({email: toEmail}, {friendsList: updatedUTFL});

			console.log("Updated UTFL: ", updatedUTFL);
			console.log("Added1", added1);
			
			userFromFriendsList = fromUser.friendsList;
			updatedUFFL = userFromFriendsList.push(toEmail);
			const added2 = await User.updateOne({email: fromEmail}, {friendsList: updatedUFFL});

			console.log("Updated UFFL: ", updatedUFFL);
			console.log("Added2", added2);

			if(!(added1)) return false;
			if(!(added2)) return false;
			return true;
		}
	}
}
