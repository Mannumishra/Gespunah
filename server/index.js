const express = require("express")
require("dotenv").config()
require("./Database/ConnectDb")
const cors = require("cors")
const banareRouter = require("./Router/BanareRouter")
const bestsellerRouter = require("./Router/BestSellerRouter")
const testimonialRouter = require("./Router/Testimonial")
const contactRouter = require("./Router/ContactRouter")
const newsletterRouter = require("./Router/NewsletterRouter")
const userRouter = require("./Router/UserRouter")
const marqueRouter = require("./Router/MarqueRouter")
const productRouter = require("./Router/ProductRouter")
const cartRouter = require("./Router/CartRouter")
const checkoutrouter = require("./Router/CheckOutRouter")
const categoryRouter = require("./Router/CategoryRouter")
// const cartRouter = require("./Router/CartRouter")

const app = express()


app.use(express.json())
app.use(express.urlencoded({ extended: true }))
app.set(express.static("./Public"))
app.use("/Public", express.static("Public"))

app.use(cors())

app.get("/" , (req,res)=>{
    res.send("welcome to Gespunah !!!!")
})

app.use("/api", banareRouter)
app.use("/api", bestsellerRouter)
app.use("/api", testimonialRouter)
app.use("/api", contactRouter)
app.use("/api" , newsletterRouter)
app.use("/api" , userRouter)
app.use("/api" , marqueRouter)
app.use("/api" , productRouter)
app.use("/api" ,cartRouter)
app.use("/api" ,checkoutrouter)
app.use("/api" ,categoryRouter)


app.listen(process.env.PORT, () => {
    console.log(`Server is running at ${process.env.PORT} Port`)
})