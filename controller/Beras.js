const beras = require('../model/Beras')
const response = require('../config/response')
const mongoose = require('mongoose')
const ObjectId = mongoose.Types.ObjectId

exports.inputdataberas = (data, gambar) =>
    new Promise(async (resolve, reject)=>{

        const berasbaru = new beras({
            kodeBeras: data.kodeBeras,
            merekBeras:data.merekBeras,
            bobotBeras:data.bobotBeras,
            distributor: data.distributor,
            tahunProduksi: data.tahunProduksi,
            hargaBeras: data.hargaBeras,
            gambar:gambar
        })

        await beras.findOne({kodeBeras: data.kodeBeras})
            .then(beras =>{
            if (beras) {
                reject(response.commonErrorMsg('Kode Beras Sudah digunakan'))
            }else{
                berasbaru.save()
                    .then(r=> {
                        resolve(response.commonSuccesMsg('Berhasil Menginput Data'))
                    }).catch(err =>{
                    reject(response.commonErrorMsg('Mohon Maaf Input Data Gagal'))
                })

            }
        }).catch(err => {
            reject(response.commonErrorMsg('Mohon Maaf Terjadi Kesalahan Pada Server Kami'))
        })


    })

exports.lihatdataberas = () =>
    new Promise(async (resolve, reject)=>{
        await beras.find({})
            .then(result =>{
                resolve(response.commonResult(result))
            })
            .catch(()=> reject(response.commonErrorMsg('Mohon Maaf Terjadi Kesalahan Pada Server Kami')))
    })

exports.lihatdetaildataberas = (kodeBeras) =>
    new Promise(async (resolve, reject)=>{
        await beras.findOne({kodeBeras: kodeBeras})
            .then(result =>{
                resolve(response.commonResult(result))
            })
            .catch(()=> reject(response.commonErrorMsg('Mohon Maaf Terjadi Kesalahan Pada Server Kami')))
    })


exports.updateberas = (id, data, gambar) =>
    new Promise(async (resolve, reject)=>{
        await beras.updateOne(
            {_id : ObjectId(id)},
            {
                $set:{
                    kodeBeras: data.kodeBeras,
                    merekBeras:data.merekBeras,
                    bobotBeras:data.bobotBeras,
                    distributor: data.distributor,
                    tahunProduksi: data.tahunProduksi,
                    hargaBeras: data.hargaBeras,
                    gambar:gambar
                }
            }

            ).then(beras =>{
            resolve(response.commonSuccesMsg('Berhasil Mengubah Data'))
        }).catch(err =>{
            reject(response.commonErrorMsg('Mohon Maaf Terjadi Kesalahan Pada Server Kami'))

        })
    })

exports.hapusberas = (_id) =>
    new Promise(async (resolve, reject) =>{
        await beras.deleteOne({_id: ObjectId(_id)})
            .then(() => {
                resolve(response.commonSuccesMsg('Berhasil Menghapus Data'))
        }).catch(()=>{
                reject(response.commonErrorMsg('Mohon Maaf Terjadi Kesalahan Pada Server Kami'))
            })
    })
