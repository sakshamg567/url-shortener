const express = require('express');
const URLrouter = require('./routes/url.router');
const URL = require('./models/url.model');
const connectToMongoDB = require('./connection.js')
const app = express();
const PORT = 8000;

connectToMongoDB('mongodb://localhost:27017/url-shortener').then(
    () => console.log('Connected to DB')
)
app.use("/url", URLrouter); 
app.get("/:id", async (req,res) => {
    const id = req.params.id;
    const entry = await URL.findOneAndUpdate({
        shortId: id
    }, {
        $push: {
            visitHistory: {
                timestamp: Date.now()
            }
        }
    })
    res.redirect(entry.redirectURL)
})


app.listen(PORT, () => console.log("server started at port ",PORT))

