const mongoose = require('mongoose');

const userSchema = mongoose.Schema({

    kodeBeras: {
        type: String
    },
    merekBeras: {
        type: String
    },
    bobotBeras: {
        type: String
    },
    distributor: {
        type: String
    },
    tahunProduksi: {
        type: String
    },
    hargaBeras: {
        type: String
    },
    gambar: {
        type: String
    }

})
module.exports = mongoose.model('beras', userSchema)
