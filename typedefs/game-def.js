const { gql } = require('apollo-server');

const typeDefs = gql `
    type Game {
        name: String!
        gameID: String!
        numPlays: Int
        avgScore: Float
        leaderboards: [PlayerScore]
    }
    type PlayerScore {
        playerName: String!
        score: Int
    }
`;

module.exports = { typeDefs: typeDefs }