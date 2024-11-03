const express = require('express');
const path = require('path');
const cookieParser = require('cookie-parser');

const URL = require('./models/url.model');


const connectToMongoDB = require('./connection.js')

const {restrictToLoggedInUsers, checkAuth} = require('./middlewares/auth')

const URLrouter = require('./routes/url.router');
const staticRouter = require('./routes/staticRouter');
const UserRouter = require('./routes/user.router');

const app = express();
const PORT = 8000;

connectToMongoDB('mongodb://localhost:27017/url-shortener').then(
    () => console.log('Connected to DB')
)

app.set("view engine", "ejs");
app.set("views", path.resolve("./views"));

app.use(cookieParser());
app.use('/', checkAuth, staticRouter )

app.use("/url", restrictToLoggedInUsers , URLrouter); 
app.use('/user', UserRouter);

app.use((req, res, next) => {
    res.clearCookie('uid');
    next();
});

app.get("/:id", async (req,res) => {
    const id = req.params.id;
    const entry = await URL.findOne({shortId: id})
    if(!entry) return res.status(404).json({error: "URL not found"})
    entry.visitHistory.push({ timestamp: Date.now() })
    entry.save()
    res.redirect(entry.redirectURL)
})



app.listen(PORT, () => console.log("server started at port ",PORT))

