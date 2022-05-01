import {gql} from "@apollo/client";

export const LOGIN = gql`
	mutation Login($email: String!, $password: String!) {
		login(email: $email, password: $password) {
			email 
			_id
			firstName
			lastName
			password
			initials
		}
	}
`;

export const REGISTER = gql`
	mutation Register($email: String!, $password: String!, $firstName: String!, $lastName: String!) {
		register(email: $email, password: $password, firstName: $firstName, lastName: $lastName) {
			email
			password
			firstName
			lastName
		}
	}
`;

export const UPDATE = gql`
	mutation Update($email: String!, $password: String!, $firstName: String!, $lastName: String!, $_id: String!){
		update(email: $email, password: $password, firstName: $firstName, lastName: $lastName, _id: $_id)
	}
`;



export const LOGOUT = gql`
	mutation Logout {
		logout 
	}
`;

export const FRIEND_REQUEST = gql`
	mutation FriendRequest($userName: String!, $user: String!){
		friendRequest(userName: $userName, user: $user)
	}
`;

export const ACCEPT_FRIEND_REQUEST = gql`
	mutation AcceptFriendRequest($userName: String!, $user: String!, $accept: Boolean!){
		acceptFriendRequest(userName: $userName, user: $user, accept: $accept)
	}
`;

export const REMOVE_FRIEND = gql`
	mutation RemoveFriend($user: String!, $friend: String!){
		removeFriend(user: $user, friend: $friend)
	}
`;

export const UPDATE_HIGHSCORE = gql`
	mutation UpdateHighscore($game: String!, $score: Int!, $user: String!){
		updateHighscore(game: $game, score: $score, user: $user)
	}
`;

export const UPDATE_BANNER = gql`
	mutation UpdateBanner($banner: String!, $user: String!){
		updateBanner(banner: $banner, user: $user)
	}
`;
export const SEND_CHALLENGE = gql`
	mutation SendChallenge($game: String!, $user: String!, $friend: String!, $coin: String!, $bet: String!, $score: Int!){
		sendChallenge(game: $game, user: $user, friend: $friend, coin: $coin, bet: $bet, score: $score)
	}
`;

export const DECLINE_CHALLENGE = gql`
	mutation DeclineChallenge($user: String!, $index: Int!){
		declineChallenge(user: $user, index: $index)
	}
`;

export const GET_CHALLENGE_SCORE = gql`
	mutation GetChallengeScore($user: String!, $game: String!){
		getChallengeScore(user: $user, game: $game)
	}
`;

export const UPDATE_GC_BALANCE = gql`
	mutation UpdateGCBalance($user: String!, $amt: Int!, $add: Boolean!){
		updateGCBalance(user: $user, amt: $amt, add: $add)
	}
`;

export const UPDATE_PFP = gql`
	mutation UpdatePfp($pfp: String!, $user: String!){
		updatePfp(pfp: $pfp, user: $user)
	}
`;
