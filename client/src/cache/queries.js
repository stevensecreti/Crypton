import { gql } from "@apollo/client";

export const GET_DB_USER = gql`
	query GetDBUser {
		getCurrentUser{
			_id
			firstName
			lastName
			email
<<<<<<< HEAD
=======
			friendsList
			highscores
>>>>>>> e4d5e8b7ee85da97712426532b68edd65e3f7e07
		}
	}
`;
