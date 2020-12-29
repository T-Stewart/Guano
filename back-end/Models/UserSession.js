const mongoose = require('mongoose');

const userSessionSchema = new mongoose.Schema({
    userId: {
        type: String,
        default: ''
    },
    timestamp: {
        type: Date,
        default: Date.now()
    },
    isOnline: {
        type: Boolean,
        default: true
    }
})

const UserSession = mongoose.model('userSessions', userSessionSchema)
module.exports = UserSession