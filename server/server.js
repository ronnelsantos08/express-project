 {/* 
 npm i express backend
 npm i cors backend
 npm i nodemon backend
 npm i mysql backend
 npm i axios frontend
 npm i bycrypt backend
 npm i body-parser
 npm i cookie-parser
 npm i express-session
*/}




const express = require("express")
const app = express()
const mysql = require("mysql")
const cors = require("cors")
{/* For Password Encryption */}
const bcrypt = require("bcrypt")
const saltRounds = 10;

{/* For Coookies */}
const bodyParser = require("body-parser")
const cookieParcer = require("cookie-parser")
const session = require("express-session")

{/* For database Post And Get */}
app.use(express.json())
app.use(cors({
    origin: ["http://localhost:3000"],
    methods: ["GET", "POST"],
    credentials: true
}));

app.use(cookieParcer())
app.use(bodyParser.urlencoded({extended: true}))

/* Cookies */
app.use(session({
    key: "userId",
    secret: "cookietest",
    resave: false,
    saveUninitialized: false,
    coookie: {
        expires: 60 * 60 * 24,
    },
}))
/* Database Connection */
const db = mysql.createConnection({
    user: 'root',
    host: 'localhost',
    password: 'root123',
    database: 'userLogin',
});
 /* For fecthing FrontEnd data */
app.post("/register", (req, res) => {
    const username = req.body.username;
    const userEmail = req.body.userEmail;
    const password = req.body.password;
    const ConfirmPassword = req.body.confirmPassword;
    
    if(password !== ConfirmPassword) {
        res.send({message: "Password dont match"})
    } else {
        
 
    bcrypt.hash(password,saltRounds, (err, hash)=> {

        if(err) {
            console.log(err)
        }
        db.query("INSERT INTO users (username, userEmail, password) VALUES (?,?,?)",
        [username, userEmail, hash], 
            (err, result) => {
                if (err) {
                    res.send({err: err})
                } else {
                    res.send({message:"Register Successful"})
                }
            })
    })
  
    }
})
 /* For Verifying loggedIn Session */
app.get("/login", (req, res) => {
    if(req.session.user) {
        res.send({loggedIn: true, user: req.session.user})
    }else {
        res.send ({loggedIn: false})
    }
})

 /* For fecthing FrontEnd data */
app.post("/login", (req, res) => {
    const username = req.body.username;
    const password = req.body.password;

    db.query("SELECT * FROM users WHERE username=?;",
    username,
    (err, result)=> {
        if (err) {
        console.log(err)
        } 
            if(result.length > 0){
                bcrypt.compare(password, result[0].password, (err, reply) => {
                    if (reply) {
                        req.session.user = result;
                        res.send(result)
                    } else {
                        res.send({message: "Wrong Password or Username"});
                    }
                })
            }
            else{
                res.send({message: "User doesn't exist"});
            }
        
    })
})



app.listen(5000, () => {
    console.log("Your Running at port 5000");
})
