const { createRecord, getRecord, deleteRecord } = require("../Controllar/NewsletterControllar")

const newsletterRouter = require("express").Router()

newsletterRouter.post("/newsletter" , createRecord)
newsletterRouter.get("/newsletter" , getRecord)
newsletterRouter.delete("/newsletter/:_id" , deleteRecord)

module.exports = newsletterRouter