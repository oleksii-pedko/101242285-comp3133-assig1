const mongoose = require("mongoose");
const bcrypt = require('bcrypt');

const userSchema = new mongoose.Schema(
    {
        username: { type: String ,required:true,unique: true},
        firstname:{ type: String,required:true},
        lastname:{ type: String ,required:true},
        password:{ type: String ,required:true},
        email:{ type: String,required:true},
        type:{ type: String,required:true}
    },
);
const User = mongoose.model("user", userSchema);

// User.validPassword = async (password, hash) => {
//         return await bcrypt.compareSync(password, hash);
// }

module.exports = User;
