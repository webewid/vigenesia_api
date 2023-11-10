This is the backend or API of the Vigenesia application using Node JS (Express JS).
# Getting Started
## 1. Start Backend Server
Here we use nodemon to run the backend server.
You just need to type the following code in the terminal.
```
nodemon app
```
And the backend server will run on port 5000.

## 2. Connecting to database
Here I use MYSQL as a database. Follow these steps so that the server connects to the database and can create the table.

### First, create a database with the name "vigenesia_db" on your database server.
Here I use the XAMPP application as the database server.

### Second, go to the config/Database.js folder.
Change the "password" according to your database server password.
```
const db = new Sequelize('vigenesia_db','root','password',{
    host: 'localhost',
    dialect: 'mysql'
})
```
### Third, go to app.js.
Uncomment "//" in the following code, then save it by CTRL + S in the Visual Studio Code application.
```
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
```
If so, the "users" table in models/UsersModel.js will be created in the server database.

And the backend is fully connected to the database server.

## 3. Connecting to the frontend
First, open app.js. Then to connect the backend to the frontend, you have to set the following origin "http://localhost:3000" according to your frontend port.
```
app.use(cors({credentials: true, origin: 'http://localhost:3000'}));
```

## 4. API Login and Register
For API login as follows:
```
//POST
http://localhost:5000/loginBE
```
### The variables required to login are:
```
email,
password,
```

For API register as follows:
```
//POST
http://localhost:5000/usersBE
```
### The variables required to register are:
```
name,
profesi,
email,
password,
```

## Congratulations
### the backend configuration is complete
