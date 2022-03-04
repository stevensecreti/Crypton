const { gql } = require('apollo-server');

const typeDefs = gql `
    type Wallet {
        _id: String!
        owner: String!
        pubKey: String!
        prvKey: String!
        network: Network!
        balanceHistory: [History]
        assets: [Currency]
        password: String!
        recoveryCode: String!
    }
    type Network {
        name: String!
        rpcURL: String!
        chainID: String!
        currencySymbol: String
        blockExpURL: String
    }
    type History {
        date: String!
        balance: Float!
    }
    type Currency {
        coin: String!
        balance: Float!
    }
`;

module.exports = { typeDefs: typeDefs }