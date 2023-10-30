import express from 'express'
import dotenv from 'dotenv'
import cookieParser from 'cookie-parser'
import cors from 'cors'
import db from './config/Database.js'
import router from './routes/index.js'
import bodyParser from 'body-parser'
// import dbInsert from "./models/UsersModel.js"

dotenv.config();
const app = express();

try{
    await db.authenticate();
    console.log('DB Connected');
        // await dbInsert.sync()
}catch(error){
    console.log(error);
}

app.use(express.static('public'));
app.use(express.urlencoded({extended: true}));
app.use(cors({credentials: true, origin: 'http://localhost:3000'}));
app.use(cookieParser());
app.use(express.json());
app.use(router);
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

app.listen(process.env.APP_PORT, ()=>{
  console.log('Server Running');
});