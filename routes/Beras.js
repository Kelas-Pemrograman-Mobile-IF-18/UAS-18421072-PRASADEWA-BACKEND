const multer = require('multer')
const fs = require('fs')
const router = require('express').Router()
const beras = require('../controller/Beras')

var  storage = multer.diskStorage( {
    filename: function (req, file, cb) {
        let ext = file.originalname.substring(
            file.originalname.lastIndexOf("."),
            file.originalname.length
        )
        cb(null, Date.now() +ext);
    },
    destination: function (req, file, cb) {
        cb(null, './gambar')

    }
})

var upload = multer({storage: storage}).single("gambar")

router.post("/input", upload, (req, res) =>{
    beras.inputdataberas(req.body, req.file.filename)
        .then((result)=> res.json(result))
        .catch((err)=> res.json(err))

})

router.get("/databeras", (req, res)=>{
    beras.lihatdataberas()
        .then((result)=> res.json(result))
        .catch((err)=> res.json(err))
})

router.get("/databeras/:id", (req, res)=>{
    beras.lihatdetaildataberas(req.params.id)
        .then((result)=> res.json(result))
        .catch((err)=> res.json(err))
})

router.delete("/hapus/:id", (req, res)=>{
    beras.hapusberas(req.params.id)
        .then((result)=> res.json(result))
        .catch((err)=> res.json(err))
})


router.put("/ubah/:id", upload, (req, res)=>{
    let fileName;
    if (req.body.gambar) {
        fileName = req.body.gambar;
    }else{
        fileName = req.file.filename;
    }

    beras.updateberas(req.params.id, req.body, fileName)
        .then((result)=> res.json(result))
        .catch((err)=> res.json(err))
})

module.exports = router
