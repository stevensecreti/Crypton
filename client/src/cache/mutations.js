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
	mutation FriendRequest($email: String!, $user: String!){
		friendRequest(email: $email, user: $user)
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

export const UPDATE_PFP = gql`
	mutation UpdatePfp($pfp: String!, $user: String!){
		updatePfp(pfp: $pfp, user: $user)
	}
`;
