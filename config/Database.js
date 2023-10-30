import Sequelize from 'sequelize'

const db = new Sequelize('vigenesia_db','root','13.pt+map=2021',{
    host: 'localhost',
    dialect: 'mysql'
})

export default db