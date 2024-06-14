const express = require('express');
const path = require('path');
const mongoose=require('mongoose');
const bodyParser=require('body-parser');

const app = express();
const port = 4000;

app.use(bodyParser.urlencoded({extended:true}));
app.use(express.json());

mongoose.connect('mongodb://localhost:27017/TICTOE');

const userSchema=mongoose.Schema({
    firstPlayername:String,
    secondPlayername:String,
    winnerName:String
})
 
const User=mongoose.model('results',userSchema);

// Serve static files from the "public" directory
app.use(express.static(path.join(__dirname, 'public')));

// Serve the HTML file for the root route
app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'index.html'));
});

app.post('/save-game',async(req,res)=>{
    const{firstPlayername,secondPlayername,winnerName}=req.body;
    const data=new User({firstPlayername,secondPlayername,winnerName});
    await data.save();
   res.send("Data is shown perfectly");

})

app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});
