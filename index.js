const express = require ("express");
const app = express();
var mongoose = require("mongoose");
var cors = require('cors')
require('dotenv').config()
const userrouter = require('./routes/userRoutes');

app.use(cors({
  origin:'*',
}
))
app.use(express.json())


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

app.listen(port, () => {
    console.log(`App is listening at on port ${port}`)
})
