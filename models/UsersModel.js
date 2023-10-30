import { Sequelize } from "sequelize";
import db from "../config/Database.js"

const { DataTypes } = Sequelize

const Users = db.define('users',{
    name: DataTypes.STRING,
    profesi: DataTypes.STRING,
    email: DataTypes.STRING,
    password: DataTypes.TEXT,
    refresh_token: DataTypes.TEXT
},{
    freezeTableName:true
})

export default Users