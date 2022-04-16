import { gql } from "@apollo/client";

export const GET_DB_USER = gql`
	query GetDBUser {
		getCurrentUser{
			_id
			firstName
			lastName
			email
			displayName
			friendsList
			friendRequests
			highscores
			banner
			pfp
			challenges
		}
	}
`;
