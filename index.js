const express = require('express')
const app = express()
app.use(express.json())

const mongoose = require("mongoose");
const ejs = require("ejs");

app.set("view engine", "ejs");
app.use(express.static(__dirname + "/public"));


const mongoDBConnectionString = "mongodb+srv://SE12:CSH2024@myatlasclusteredu.rtgjgdd.mongodb.net/tkdUserID?retryWrites=true&w=majority&appName=myAtlasClusterEDU";

mongoose
.connect(mongoDBConnectionString)
  .then(() => {
    console.log("MongoDB connection successful.")
  })
  .catch((err) => {
    console.error("MongoDB connection error:", err)
  });

const listSchema = new mongoose.Schema({
  userName: { type: String, required: true },
  password: { type: String, required: true },
  beltColor: { type: String, required: true },
  isParent:  { type: Boolean, required: true },
  isStudent:  { type: Boolean, required: true },
});
const List = mongoose.model("List", listSchema);

app.use((req, res, next) =>{
  console.log("Request Recieved: " + req.path)
  next()
})

// Home page

app.get('/', (req, res) =>{
  res.sendFile(__dirname + "/public/home.html")
})
app.get('/home', (req, res) =>{
  res.sendFile(__dirname + "/public/home.html")
})

// Login and Sign up Page
app.get('/login&sign', (req, res) =>{
  // tests (Works)
  // console.log("Request Recieved: Login & Sign Up")
    
  List.find({})
  .then((lists) =>{
    //Testing
    res.render('login&sign.ejs', {lists: lists})
  })
})

app.post("/login&sign", (req, res) => {
  const newList = new List({
    userName: req.body.userName,
    password: req.body.password,
    beltColor: req.body.beltColor,
    isParent: req.body.isParent,
    isStudent: req.body.isStudent
  });

  newList.save()
  .then((newList) => {
    res.json(newList);
  });
});

// Calender Page
app.get('/calendar', (req, res) =>{
  console.log("Request Recieved: Calender")
  res.render('calendar.ejs')
})

// User home page
app.get('/userpage', (req, res) =>{
  console.log("Request Recieved: User Page")
  res.render('userpage.ejs')
})

app.listen(3000, () =>{
  console.log("Server up...")
});