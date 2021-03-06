const mongoose = require('mongoose');

const userSchema = mongoose.Schema({

    username: {
        type: String
    },
    namaLengkap: {
        type: String
    },
    email: {
        type: String
    },
    notlp: {
        type: String
    },
    role: {
        type: Number
    },
    password: {
        type: String
    }

})
module.exports = mongoose.model('users', userSchema)
