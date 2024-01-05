import Motivasi from "../models/MotivasiModel.js"

export const CreateMotivasi = async(req,res) =>{
    try {
        await Motivasi.create({
            urlFoto: req.body.urlFoto,
            name: req.body.name,
            kata: req.body.kata,
            jenisMotivasi: req.body.jenisMotivasi,
            panggilan: req.body.panggilan,
        },{
            where:{
                panggilan: req.body.panggilan
            }
        })
        res.status(200).json({msg: "Berhasil masukin data"})
    } catch (error) {
        console.log(error.message)
    }
}

export const SelectAllMotivasi = async(req,res) =>{
    try {
        const response = await Motivasi.findAll({
        })
        res.json(response)
    } catch (error) {
        console.log(error.message)
    }
}

export const SelectMotivasiSaya = async(req,res) =>{
    try {
        const response = await Motivasi.findAll({
            where:{
                panggilan : req.params.panggilanParams
            }
        })
        res.json(response)
    } catch (error) {
        console.log(error.message)
    }
}

export const SelectMotivasiByJenisMotivasi = async(req,res) =>{
    try {
        const response = await Motivasi.findAll({
            where:{
                jenisMotivasi : req.params.panggilanParams
            }
        })
        res.json(response)
    } catch (error) {
        console.log(error.message)
    }
}

export const SelectMotivasiById = async(req,res) =>{
    try {
        const response = await Motivasi.findOne({
            where:{
                id : req.params.panggilanParams
            }
        })
        res.json(response)
    } catch (error) {
        console.log(error.message)
    }
}

export const UpdateMotivasi = async(req,res) =>{
    try {
        await Motivasi.update({
            kata: req.body.kata,
            jenisMotivasi: req.body.jenisMotivasi,
        },{
            where:{
                id: req.body.id
            }
        })
        res.status(200).json({msg: "Berhasil di Ubah"})
    } catch (error) {
        console.log(error.message)
    }
}

export const DeleteMotivasi = async(req,res) =>{
    try {
        await Motivasi.destroy({
            where:{
                id : req.params.id
            }
        })
        res.status(200).json({msg:"Berhasil dihapus"})
    } catch (error) {
        console.log(error.message)
    }
}