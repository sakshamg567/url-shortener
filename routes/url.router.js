const express = require('express')
const { handleGenerateNewShortURL, handleGetRedirectURL, handleGetURLStats } = require('../controllers/url.controller')
const router = express.Router()

router.use(express.urlencoded({ extended: true }))

router.post("/", handleGenerateNewShortURL)

router.get("/analytics/:id", handleGetURLStats)

module.exports = router