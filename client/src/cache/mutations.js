import { gql } from "@apollo/client";

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

export const ADD_MAP = gql`
	mutation AddMap($map: MapInput!){
		addMap(map: $map)
	}
`;

export const DELETE_MAP = gql`
	mutation DeleteMap($_id: String!){
		deleteMap(_id: $_id)
	}
`;

export const RENAME_MAP = gql`
	mutation RenameMap($_id: String!, $name: String!){
		renameMap(_id: $_id, name: $name)
	}
`;

export const ADD_REGION = gql`
	mutation AddRegion($region: RegionInput!){
		addRegion(region: $region)
	}
`;

export const ADD_SUBREGION = gql`
	mutation AddSubregion($_id: String!, $region: Int!, $map: Boolean!){
		addSubregion(_id: $_id, region: $region, map: $map)
	}
`;

export const UPDATE_REGION_FIELD = gql`
	mutation UpdateRegionField($_id: String!, $field: Int!, $value: String!){
		updateRegionField(_id: $_id, field: $field, value: $value)
	}
`;

export const DELETE_REGION = gql`
	mutation DeleteRegion($_id: String!){
		deleteRegion(_id: $_id)
	}
`;

export const DELETE_SUBREGION = gql`
	mutation DeleteSubregion($_id: String!, $id: Int!, $map: Boolean!, $index: Int!){
		deleteSubregion(_id: $_id, id: $id, map: $map, index: $index)
	}
`;

export const PUSH_SORT = gql`
	mutation PushSort($_id: String!, $ids: [Int], $map: Boolean!){
		pushSort(_id: $_id, ids: $ids, map: $map)
	}
`;

export const ADD_LANDMARK = gql`
	mutation AddLandmark($_id: String!, $landmark: String!, $code: Int!){
		addLandmark(_id: $_id, landmark: $landmark, code: $code)
	}
`;

export const DELETE_LANDMARK = gql`
	mutation DeleteLandmark($_id: String!, $landmark: Int!, $name: String!, $code: Int!){
		deleteLandmark(_id: $_id, landmark: $landmark, name: $name, code: $code)
	}
`;

export const RENAME_LANDMARK = gql`
	mutation RenameLandmark($_id: String!, $landmark: Int!, $name: String!){
		renameLandmark(_id: $_id, landmark: $landmark, name: $name)
	}
`;

export const CHANGE_PARENT = gql`
	mutation ChangeParent($_id: String!, $new_parent: String!){
		changeParent(_id: $_id, new_parent: $new_parent)
	}
`;