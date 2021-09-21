const express = require ("express");
const app = express();
var mongoose = require("mongoose");
var cors = require('cors')
const jwt = require("jsonwebtoken");
require('dotenv').config()
const userrouter = require('./routes/userRoutes');
const cookieParser = require('cookie-parser');
const path = require('path');



app.use(cors({
  origin:'*',
  credentials: true,

}
))
app.use(express.json())
app.use(cookieParser());


const port = 3002
//database connection
const uri = process.env.URI

 mongoose.connect(uri, {
    useNewUrlParser: true,
    useUnifiedTopology: true 
  })
  .then(() => {
    console.log("Mongodb atlas connection established")
  })
  .catch(err => console.log(err))


  
//router
app.use("/", userrouter);
app.use(express.static(path.join(__dirname,'./build'))) 
app.use('/uploads',express.static(path.join(__dirname,'./uploads'))) 


app.get('*', (req,res) => {
  res.sendFile(path.join(__dirname,'./build','index.html'));

})

app.listen(port, () => {
    console.log(`App is listening at on port ${port}`)
})
