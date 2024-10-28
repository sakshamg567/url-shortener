(async () => {
    const { nanoid: importedNanoid } = await import('nanoid');
    nanoid = importedNanoid; // Assign it to a variable
})();
const URL = require('../models/url.model')

async function handleGenerateNewShortURL(req, res) {
    const body = req.body
    if(!body.url) return res.status(400).json({ error: 'URL is required' })
    const id = nanoid(8)
    const url = await URL.create({
        shortId: id, 
        redirectURL:  body.url,
        visitHistory: [],
    })
    return res.render("home", { id: id })
}

async function handleGetURLStats(req,res){
    const id = req.params.id
    const url = await URL.findOne({ shortId: id })
    if(!url) return res.status(404).json({ error: 'URL not found' })
    const clicks = url.visitHistory.length
    return res.json({ clicks: clicks })
}

module.exports = {
    handleGenerateNewShortURL,
    handleGetURLStats
}