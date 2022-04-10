
const { gql } = require('apollo-server')

const typeDefs = gql`

type Listing{
    listing_title: String!
    description: String!
    street: String!
    city: String!
    postal_code: String!
    price: Int!
    email:String!
    username: String!
    }

    type Booking{
    listing_id: String!
    booking_date: String!
    booking_start: String!
    booking_end: String!
    username: String!
    }

    #     listing_id: { type: Number ,required:true,unique: true},
    #     booking_id:{ type: Number,required:true},
    #     booking_date:{ type: Date ,required:true},
    #     booking_start:{ type: Date ,required:true},
    #     booking_end:{ type: Date,required:true},
    #     username:{ type: String,required:true},
    
    type User{
    username: String!
    firstname: String!
    lastname: String!
    password: String!
    email: String!
    type: String!
    }
    
       type AuthPayload {
        token: String!
        user: User!
    }
    type Query {
        getListing(username:String!):[Listing]
        getBooking(username:String!):[Booking]

        getListingBy(listing_title:String, city:String, postal_code:String):[Listing]

    }

    type Mutation {
    createNewUser(username: String, firstname: String, lastname: String, password: String, email: String, type: String): User
    createNewListing(listing_title: String!, description: String!, street: String!, city: String!, postal_code: String!,
    price: Int!,email:String!, username:String!): Listing!
    createNewBooking(listing_id: String!, booking_date: String!, booking_start: String!, booking_end: String!, username:String!): Booking!
    
    login (username: String!, password: String!): AuthPayload!
  }
`

module.exports = typeDefs