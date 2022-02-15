import { gql } from "@apollo/client";

export const GET_DB_USER = gql`
	query GetDBUser {
		getCurrentUser {
			_id
			firstName
			lastName
			email
		}
	}
`;

export const GET_DB_MAPS = gql`
	query GetDBMaps {
		getAllMaps {
			_id
			id
			name
			owner
			regions 
		}
	}
`;

export const GET_DB_REGIONS = gql`
	query GetDBRegions{
		getAllRegions {
			_id
			id
			name
			owner
			subregions
			leader
			capital
			flag
			landmarks
			parentRegion
		}
	}
`;

