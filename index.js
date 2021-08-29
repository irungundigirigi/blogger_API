const express = require ("express");
const app = express();
var mongoose = require("mongoose");
var cors = require('cors')
const userrouter = require('./routes/userRoutes');

app.use(cors({
  origin:'*',
}
))
app.use(express.json())


const port = 3002
//database connection
const uri = "mongodb+srv://irungu_ndigirigi:Edwin1996@cluster0.iyopz.mongodb.net/authDB?retryWrites=true&w=majority"

 mongoose.connect(uri, {
    useNewUrlParser: true,
    useUnifiedTopology: true 
  })
  .then(() => {
    console.log("Mongodb atlas connection established")
  })
  .catch(err => console.log(err))

  var db = mongoose.connection;

  
//router
app.use("/user", userrouter);

app.listen(port, () => {
    console.log(`App is listening at on port ${port}`)
})
