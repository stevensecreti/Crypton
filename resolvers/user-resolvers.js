const ObjectId = require('mongoose').Types.ObjectId;
const bcrypt = require('bcryptjs');
const User = require('../models/user-model');
const Score = require('../models/user-model');
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
				friendRequests: [],
				highscores: [],
				banner: "https://static.vecteezy.com/system/resources/thumbnails/000/701/690/small/abstract-polygonal-banner-background.jpg"
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
			const {email, user} = args;
			let toEmail = email;
			let fromEmail = user;
			console.log("ToEmail: ", toEmail, "From Email: ", fromEmail);
			
			const toUser = await User.findOne({email: toEmail});
			if(!toUser) return false;

			const fromUser = await User.findOne({email: fromEmail});
			if(!fromUser) return false;

			let userToFriendsList = toUser.friendsList;
			let list1 = userToFriendsList.slice();
			list1.push(fromEmail);
			const added1 = await User.updateOne({email: toEmail}, {friendsList: list1});
			
			let userFromFriendsList = fromUser.friendsList;
			let list2 = userFromFriendsList.slice();
			list2.push(toEmail);
			const added2 = await User.updateOne({email: fromEmail}, {friendsList: list2});

			if(!(added1)) return false;
			if(!(added2)) return false;
			return true;
		},
		removeFriend: async(_, args) => {
			const {user, friend} = args;
			
			const currentUser = await User.findOne({email: user});
			if(!currentUser) return false;

			let currentUserFriendsList = currentUser.friendsList;
			let list1 = currentUserFriendsList.slice();
			const index1 = list1.indexOf(friend);
			if(index1 !== -1){
				list1.splice(index1, 1);
			}
			let removed1 = await User.updateOne({email: user}, {friendsList: list1});

			const friendUser = await User.findOne({email: friend});
			if(!friendUser) return false;
			let friendsFriendList = friendUser.friendsList;
			let list2 = friendsFriendList.slice();
			const index2 = list2.indexOf(user);
			if(index2 !== -1){
				list2.splice(index2, 1);
			}
			let removed2 = await User.updateOne({email: friend}, {friendsList: list2});
			
			if(!removed2) return false;
			return true;
		},
		updateHighscore: async (_, args) =>
		{
			const{game,score,user} = args;
			let currentUser = await User.findOne({email: user})
			let highscores = currentUser.highscores;
			if(highscores != undefined)
			{
				let newHigh = Array(highscores.length+1);
				for(let i = 0;i<highscores.length;i++)
				{
					let cscore = highscores[i].split(",");
					let curGame = cscore[0];
					let curScore = parseInt(cscore[1]);
					newHigh[i] = cscore;
					if(curGame.localeCompare(game) == 0)
					{
						if(curScore < score)
						{
							highscores[i] = game+","+score;
							const updt = await User.updateOne({email: user},{highscores: highscores});
							return true;
						}
						else
						{
							return false;
						}
					}
				}
				newHigh[newHigh.length-1] = game+","+score;
				const updt = await User.updateOne({email: user},{highscores: newHigh});
				return true;
			}
			else
			{
				highscores = Array(1);
				highscores[0] = game+","+score;
				const updt = await User.updateOne({email: user},{highscores: highscores});
				return true;
			}
		},
		updateBanner: async (_, args) =>
		{
			//console.log("UPDATE BANNER RESOLVER");
			//console.log(args);

			const{banner, user} = args;
			//console.log(banner);
			//console.log(user);

			//let currentUser = await User.findOne({email: user})
			//let banner = currentUser.banner;
			//if(banner != undefined)
			//{
				//let newBanner = string;
			const updt = await User.updateOne({email: user},{banner: banner});
			//}
			//const updated1 = await User.updateOne({_id: _id}, { firstName: firstName });

			//if(updated1){
			//	return true
			//}

			return true;
		},
		sendChallenge: async (_, args) =>
		{
			const {game,user,friend,coin,bet} = args;
			const toFriend = await User.findOne({email: friend});
			const chals = toFriend.challenges;
			const newChal = user+","+game+","+bet+" "+coin;
			const newChalList = Array(chals.length+1);
			for(let i = 0;i<chals.length;i++)
			{
				newChalList[i] = chals[i];
			}
			newChalList[chals.length] = newChal;
			const updt = await User.updateOne({email: friend},{challenges: newChalList});
			if(updt)
			{
				return true;
			}
			else
			{
				return false;
			}
		},
		declineChallenge: async (_,args) =>
		{
			const {user,index} = args;
			const thisUser = await User.findOne({email: user});
			const chals = thisUser.challenges;
			const newChals = Array(chals.length-1);
			for(let i = 0;i<chals.length;i++)
			{
				if(i < index)
				{
					newChals[i] = chals[i];
				}
				else if(i > index)
				{
					newChals[i-1] = chals[i];
				}
			}
			const updt = await User.updateOne({email: user},{challenges: newChals});
			if(updt)
			{
				return true;
			}
			else
			{
				return false;
			}
		}
	}
}
