let mongoose = require('mongoose');
const bcrypt = require('bcrypt'); 

let UserSchema = new mongoose.Schema({
    firstName: {
         type: String 
        },
    lastName: { 
        type: String 
        },
    email: {
        type: String,
        },
    password: {
        type: String 
    },
});

UserSchema.methods.hashedPassword = (password) => {
    return bcrypt.hashSync(password, 10)
}


UserSchema.methods.validPassword = function(password) { 
    return bcrypt.compareSync(password, this.password)
}


var User = mongoose.model('Users', UserSchema); 
module.exports = User;
