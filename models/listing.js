const mongoose = require("mongoose");
const listingSchema = new mongoose.Schema(
    {
        listing_title: { type: String ,required:true,unique: true},
        description:{ type: String,required:true},
        street:{ type: String ,required:true},
        city:{ type: String ,required:true},
        postal_code:{ type: String,required:true},
        price:{ type: Number,required:true},
        email:{ type:String, required:true},
        username:{ type: String,required:true},

    },
);
const Listing = mongoose.model("listing", listingSchema);
module.exports = Listing;
