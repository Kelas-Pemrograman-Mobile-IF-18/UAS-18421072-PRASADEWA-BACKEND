const userModel = require('../model/User')
const response= require('../config/response')
const bcrypt = require('bcrypt')

exports.registrasi = (data) =>
    new Promise((resolve, reject) => {
        console.log (data)
        userModel.findOne({username: data.username})
            .then(user => {
                if (user) {
                    resolve(response.commonErrorMsg('Username sudah digunakan'))
                }else{
                    bcrypt.hash(data.password, 10, (err, hash)=>{
                        if(err) {
                            reject(response.commonErrorMsg)
                        }else{
                            data.password = hash
                            userModel.create(data)
                                .then(()=> resolve(response.commonSuccesMsg('berhasil registrasi')))
                                .catch(()=> reject(response.commonErrorMsg('Mohon Maaf registrasi gagal')))
                        }
                    })

                }
            }).catch(()=> reject(response.commonError))


    })

exports.login = (data) =>
    new Promise((resolve, reject) => {
        userModel.findOne({
            username: data.username
        }).then(user => {
            if (user) {
                if (bcrypt.compareSync(data.password, user.password)) {
                    resolve(response.commonResult(user))
                }else{
                    reject(response.commonErrorMsg('Password Salah'))
                }

            }else{
                reject(response.commonErrorMsg('Username Tidak ditemukan'))
            }

        })
    })


