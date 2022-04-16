const { gql } = require('apollo-server');

const typeDefs = gql `
	type User {
		_id: String
		firstName: String
		lastName: String
		initials: String
		email: String
		password: String
		displayName: String
		friendsList: [String]
		friendRequests: [String]
		gameCenterBalance: Float
		userName: String
		highscores: [String]
		banner: String
		pfp: String
		challenges: [String]
	}
	extend type Query {
		getCurrentUser: User
		getAllUsers: [User]
	}
	extend type Mutation {
		login(email: String!, password: String!): User
		register(email: String!, password: String!, firstName: String!, lastName: String!): User
		update(email: String!, password: String!, firstName: String!, lastName: String!, _id: String!): Boolean!
		logout: Boolean!
		friendRequest(userName: String!, user: String!): Boolean!
		acceptFriendRequest(userName: String!, user: String!, accept: Boolean!): Boolean!
		removeFriend(user: String!, friend: String!): Boolean!
		updateHighscore(game: String!, score: Int!, user: String!): Boolean!
		updateBanner(banner: String!, user: String!): Boolean!
		sendChallenge(game: String!, user: String!, friend: String!, coin: String!, bet: String!): Boolean!
		declineChallenge(user: String!, index: Int!): Boolean!
		getChallengeScore(user: String!, game: String!): Int!
		updatePfp(pfp: String!, user: String!): Boolean!
	}
`;

module.exports = { typeDefs: typeDefs }