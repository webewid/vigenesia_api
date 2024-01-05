import { Sequelize } from "sequelize";
import db from "../config/Database.js"

const { DataTypes } = Sequelize

const Motivasi = db.define('motivasi',{
    urlFoto: DataTypes.TEXT,
    name: DataTypes.STRING,
    kata: DataTypes.STRING,
    jenisMotivasi: DataTypes.STRING,
    panggilan: DataTypes.TEXT
},{
    freezeTableName:true
})

export default Motivasi