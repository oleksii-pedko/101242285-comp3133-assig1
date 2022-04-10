const jsonwebtoken = require('jsonwebtoken')
const listing = require('../models/listing')
const booking = require('../models/booking')

const User=require("../models/user")
const resolvers = {
    Query: {
        async getListing(parent,args,{user}) {
            try {
                if(!user) throw new Error('You are not authenticated!')
                if(args.username){
                    let username=args.username;
                    return await listing.find({username});
                }
                if(args.city){
                    let city=args.city;
                    return await listing.find({city});
                }
                return await listing.find();

            } catch (error) {
                throw new Error(error.message)
            }
        },

        async getListingBy(parent, args) {
                if(args.listing_title){
                    return await listing.find({listing_title: args.listing_title});
                }
                if(args.city){
                    return await listing.find({city: args.city});
                }
                if(args.postal_code){
                    return await listing.find({postal_code: args.postal_code});
                }
                return await listing.find();
        },

        async getBooking(parent,args,{user}) {
            try {
                if(!user) throw new Error('You are not authenticated!')
                if(args.username){
                    let username=args.username;
                    return await booking.find({username});
                }
                return await booking.find();

            } catch (error) {
                throw new Error(error.message)
            }
        }

    },
    Mutation: {

        createNewUser: async (parent, args) => {
     
            // Build Mongoose User Model
            const user = new User({
                username: args.username,
                firstname: args.firstname,
                lastname: args.lastname,
                password: args.password,
                email: args.email,
                type: args.type});
      
            return await user.save();
          },
      
        createNewListing: (parent,args) => {
            console.log(args);
            const Listing = new listing({
                listing_title: args.listing_title,
                description: args.description,
                street: args.street,
                city: args.city,
                postal_code: args.postal_code,
                price: args.price,
                email: args.email,
                username: args.username
            });
            return Listing.save()
        },

        createNewBooking: (parent,args) => {
            console.log(args);
            const Booking = new booking({
                listing_id: args.listing_id,
                booking_date: args.booking_date,
                booking_start: args.booking_start,
                booking_end: args.booking_end,
                username: args.username
            });
            return Booking.save()
        },

        async login (parent,args) {
            try {
                let username=args.username;
                let password=args.password;
                const user = await User.findOne({  username })
                if (!user) {
                    throw new Error('No user with that username')
                }
                const isValid = password === user.password;
                //const isValid = await User.validPassword(password, user.password)
                if (!isValid) {
                    throw new Error('Incorrect password')
                }

                // return jwt
                const token = jsonwebtoken.sign(
                    { employeeId: user.employeeId, username: user.username},
                    process.env.JWT_SECRET,
                    { expiresIn: '1d'}
                )
                return {
                    token, user
                }
                // const token = jsonwebtoken.sign(
                //     { employeeId: user.employeeId, username: user.username},
                //     process.env.JWT_SECRET,
                //     { expiresIn: '1d'}
                // )
                // return {
                //     token, user
                // }
            } catch (error) {
                throw new Error(error.message)
            }
        }

    },
}

module.exports = resolvers