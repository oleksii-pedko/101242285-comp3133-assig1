const { ApolloServer, gql } = require('apollo-server');
const jwt =  require('jsonwebtoken')
const typeDefs = require('./schema/schema')
const resolvers = require('./resolvers/resolver')
const mongoose = require("mongoose");




require('dotenv').config()

const {  PORT } = process.env

const getUser = token => {
    try {
        if (token) {
            let a=jwt.verify(token, process.env.JWT_SECRET)
            return jwt.verify(token, process.env.JWT_SECRET)
        }
        return null
    } catch (error) {
        return null
    }
}

const server = new ApolloServer({
    typeDefs,
    resolvers,
    context: ({ req }) => {
        const token = req.get('Authorization') || ''
        return { user: getUser(token.replace('Bearer', ''))}
    },
    introspection: true,
    playground: true
})


server.listen({ port: PORT || 4000 }).then(({ url }) => {
    mongoose.connect('mongodb+srv://oleksiipdk:1Rm4VBuZr4wiLBlW@cluster0.p87gz.mongodb.net/COMP3133?retryWrites=true&w=majority');
    console.log(`🚀 Server ready at ${url}`);
});