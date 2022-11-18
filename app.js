import express from "express" 
import ejsLayouts from "express-ejs-layouts"
import dotenv from "dotenv"
import mongoose from "mongoose"
import  fileUpload from "express-fileupload"
import session from "express-session"
import  cookieParser from "cookie-parser"
import flash from "connect-flash"

import routes from "./server/routes/routes.js"

const app = express() 
dotenv.config()

const Port = process.env.PORT || 5000

app.use(express.urlencoded({extended :true}))
app.use(ejsLayouts)
app.use(express.static("public"))

app.use(cookieParser('CookingBlogSecure'));
app.use(session({
  secret: 'CookingBlogSecretSession',
  saveUninitialized: true,
  resave: true
}));
app.use(flash());
app.use(fileUpload());

app.use('/' , routes)

app.set("view engine" , "ejs")
app.set("layout" , "./layouts/main")

mongoose.connect(process.env.MONGOOSE_URI )
.then(()=> console.log("connected to DB"))
.catch((err) => console.error("connection failed" + err))

app.listen(Port , console.log(`server is running on port ${Port}`))