const express = require('express');
const URLrouter = require('./routes/url.router');
const URL = require('./models/url.model');
const path = require('path');
const connectToMongoDB = require('./connection.js')
const staticRouter = require('./routes/staticRouter');
const app = express();
const PORT = 8000;

connectToMongoDB('mongodb://localhost:27017/url-shortener').then(
    () => console.log('Connected to DB')
)

app.set("view engine", "ejs");
app.set("views", path.resolve("./views"));

app.use('/', staticRouter )

app.use("/url", URLrouter); 

app.get("/:id", async (req,res) => {
    const id = req.params.id;
    const entry = await URL.findOne({shortId: id})
    if(!entry) return res.status(404).json({error: "URL not found"})
    entry.visitHistory.push({timestamp: Date.now()})
    res.redirect(entry.redirectURL)
})


app.listen(PORT, () => console.log("server started at port ",PORT))

