import Users from "../models/UsersModel.js"
import bcrypt from "bcrypt"
import jwt from "jsonwebtoken"

export const Register = async(req,res) =>{
    const { name, profesi, email, password } = req.body
    const salt = await bcrypt.genSalt()
    const hashPassword = await bcrypt.hash(password, salt)
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
                profesi: profesi,
                email: email,
                password: hashPassword,
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
        const accessToken = jwt.sign({userId,name,profesi,email}, process.env.ACCESS_TOKEN_SECRET,{
            expiresIn: '20s'
        })
        const refreshToken = jwt.sign({userId,name,profesi,email}, process.env.REFRESH_TOKEN_SECRET,{
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