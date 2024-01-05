import Users from "../models/UsersModel.js"
import bcrypt from "bcrypt"
import jwt from "jsonwebtoken"
import fs from "fs"
import sharp from "sharp"
import path from "path"

function base64_encode(file) {
    return "data:image/gif;base64,"+fs.readFileSync(file, 'base64');
}

export const Register = async(req,res) =>{
    const { name, email, password, pertanyaan, jawaban } = req.body
    const salt = await bcrypt.genSalt()
    const hashPassword = await bcrypt.hash(password, salt)
    const hashJawaban = await bcrypt.hash(jawaban, salt)
    const hashPertanyaan = await bcrypt.hash(pertanyaan, salt)
    const hashPanggilan = await bcrypt.hash(email, salt)
    const enHashPanggilan = hashPanggilan.replace(/[^\w\s]/gi, '')
    try {
        const response = await Users.findOne({
            where:{
                email: req.body.email
            }
        })
        if(response){
            res.status(404).json({msg: "Aduh Email ini sudah digunakan"})
        }else{
            await Users.create({
                name: name,
                email: email,
                password: hashPassword,
                pertanyaan: hashPertanyaan,
                jawaban: hashJawaban,
                panggilan: enHashPanggilan
            })
            res.status(202).json({msg: "Register Berhasil"})
        }
    } catch (error) {
        console.log(error)
    }
}

export const Login = async(req,res)=>{
    try {
        const user = await Users.findOne({
            where:{
                email: req.body.email
            }
        })
        const match = await bcrypt.compare(req.body.password, user.password)
        if(!match) return res.status(400).json({msg: "Aduh password tidak cocok"})
        const userId = user.id
        const name = user.name
        const profesi = user.profesi
        const email = user.email
        const panggilan = user.panggilan
        const accessToken = jwt.sign({userId,name,profesi,email,panggilan}, process.env.ACCESS_TOKEN_SECRET,{
            expiresIn: '20s'
        })
        const refreshToken = jwt.sign({userId,name,profesi,email,panggilan}, process.env.REFRESH_TOKEN_SECRET,{
            expiresIn: '10h'
        })
        await Users.update({refresh_token: refreshToken},{
            where:{
                id: userId
            }
        })
        res.cookie('refreshToken', refreshToken,{
            httpOnly: true,
            maxAge: 10 * 60 * 60 * 1000 //10 hour
        })
        res.json({accessToken})
    } catch (error) {
        res.status(404).json({msg: "Aduh email tidak ditemukan"})
    }
}

export const Logout = async(req,res) => {
    const refreshToken = req.cookies.refreshToken
    if(!refreshToken) return res.sendStatus(204)
    const user = await Users.findOne({
        where:{
            refresh_token: refreshToken
        }
    })
    if(!user) return res.sendStatus(204)
    const userId = user.id
    await Users.update({refresh_token: null},{
        where:{
            id: userId
        }
    })
    res.clearCookie('refreshToken')
    return res.sendStatus(200)
}

export const UpdateProfil = async(req,res) =>{
    try {
        //ambil file
        const foto = req.file
        const newFileName = "kompres"+foto.filename
        // Kompres Image
        await sharp(foto.path).jpeg({ quality: 50 }).toFile(path.resolve(foto.destination,newFileName))
        fs.unlinkSync(foto.path)
        // Image ke base64
        var base64str = base64_encode(foto.destination+"/"+newFileName);
        // Kondisi
        if(foto.mimetype == 'image/png' || foto.mimetype == 'image/jpeg' || foto.mimetype == 'image/jpg'){
            try {
                await Users.update({
                    urlFoto: base64str,
                    foto: newFileName,
                    name: req.body.name,
                    profesi: req.body.profesi,
                },{
                    where:{
                        panggilan: req.body.panggilan
                    }
                })
                const filepath = `./public/images/${newFileName}`;
                fs.unlinkSync(filepath);
                res.status(200).json({msg: "Berhasil di Ubah"})
            } catch (error) {
                console.log(error.message)
            }
        }else{
            const filepath = `./public/images/${newFileName}`;
            fs.unlinkSync(filepath);
            res.status(404).json({msg: "Extension foto harus PNG/JPEG ya"})
        }
    } catch (error) {
        console.log(error.message)
    }
}

export const SelectProfil = async(req,res) =>{
    try {
        const response = await Users.findOne({
            where:{
                panggilan : req.params.panggilanParams
            }
        })
        res.json(response)
    } catch (error) {
        console.log(error.message)
    }
}