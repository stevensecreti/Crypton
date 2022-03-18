const { gql } = require('apollo-server');

const typeDefs = gql `
	type User {
		_id: String
		firstName: String
		lastName: String
		initials: String
		email: String
		password: String
		friendsList: [String]
		friendRequests: [String]
		gameCenterBalance: Float
	}
	extend type Query {
		getCurrentUser: User
	}
	extend type Mutation {
		login(email: String!, password: String!): User
		register(email: String!, password: String!, firstName: String!, lastName: String!): User
		update(email: String!, password: String!, firstName: String!, lastName: String!, _id: String!): Boolean!
		logout: Boolean!
		friendRequest(email: String!, user: String!): Boolean!
	}
	type Score {
		score: Int
		game: String!
	}
`;

module.exports = { typeDefs: typeDefs }