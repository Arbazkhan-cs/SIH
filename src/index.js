const express = require('express');
const mongoose = require('mongoose');
const path = require('path');
const hbs = require('hbs');
const app = express();
const port = 5000;

// Geting data form the Form
app.use(express.urlencoded());

// Adding Static Path
const staticPath = path.join(__dirname, "../static")
app.use(express.static(staticPath))

// Adding Tempelates
const tempelatePath = path.join(__dirname, "../tempelate");
hbs.registerPartials(tempelatePath);

// Setting veiw engine
app.set("views", "../views");
app.set("view engine", "hbs");

// Now Working with Monggose (Database)
// Connecting the our mongodb database
mongoose.connect("mongodb://127.0.0.1:27017/SIH-TeamUnion");

// Creating schema
const createSchema = mongoose.Schema({
    Name: String,
    Email: String,
    Description: String,
    Date: {
        type: String,
        default: `${(new Date()).toLocaleDateString()} ${(new Date()).toLocaleTimeString()}`
    }
})

// Creating The collection or documnet.
const Feedback = mongoose.model("Feedback", createSchema);

app.get("/", (req, res)=>{
    res.render("homepage.hbs");
})

app.post("/", (req, res)=>{
    // Extracting data from the form
    const dataExtract = req.body;
    console.log(dataExtract);
    try{
        const getData = async ()=>{
            // Inserting the extracted data
            const result = await Feedback.insertMany([dataExtract]);
            console.log(result);
        }
        res.render("homepage.hbs", {
            submited: "Thanks For submit"
        });

        getData();
    }
    catch(err){
        console.log(err);
    }
})

// listening to the server
app.listen(port, ()=>{
    console.log(`The Server Is listening at = http://localhost:${port}`);
})