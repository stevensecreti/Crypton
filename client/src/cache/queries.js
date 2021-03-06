import { gql } from "@apollo/client";

export const GET_DB_USER = gql`
	query GetDBUser {
		getCurrentUser{
			_id
			firstName
			lastName
			email
			friendsList
			friendRequests
			userName
			highscores
			gameCenterBalance
			banner
			pfp
			challenges
		}
	}
`;

export const GET_DB_USERS = gql`
	query GetDBUsers{
		getAllUsers{
			_id
			firstName
			lastName
			email
			friendsList
			friendRequests
			userName
			highscores
			banner
			pfp
			challenges
		}
	}
`;
