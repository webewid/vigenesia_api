import { Sequelize } from "sequelize";
import db from "../config/Database.js"

const { DataTypes } = Sequelize

const Users = db.define('users',{
    urlFoto: DataTypes.TEXT,
    foto: DataTypes.TEXT,
    name: DataTypes.STRING,
    profesi: DataTypes.STRING,
    email: DataTypes.STRING,
    password: DataTypes.TEXT,
    pertanyaan: DataTypes.TEXT,
    jawaban: DataTypes.TEXT,
    refresh_token: DataTypes.TEXT,
    panggilan: DataTypes.TEXT
},{
    freezeTableName:true
})

export default Users