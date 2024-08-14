const jwt = require("jsonwebtoken")

function verifyAdmin(req, res, next) {
    const token = req.headers.authorization
    if (token) {
        jwt.verify(token, process.env.JWT_SALT_KEY_ADMIN, (error) => {
            if (error)
                return res.status(440).json({
                    success: false,
                    message: "Session Expired Please Login Again"
                })
            else
                next()
        })
    }
    else
        res.status(440).json({
            success: false,
            message: "Session Expired Please Login Again"
        })
}
function verifyBuyer(req, res, next) {
    const token = req.headers.authorization
    if (token) {
        jwt.verify(token, process.env.JWT_SALT_KEY_BUYER, (error) => {
            if (error)
                return res.status(440).json({
                    success: false,
                    message: "Session Expired Please Login Again"
                })
            else
                next()
        })
    }
    else
        res.status(440).json({
            success: false,
            message: "Session Expired Please Login Again"
        })
}
function verifyBoth(req, res, next) {
    const token = req.headers.authorization
    if (token) {
        jwt.verify(token, process.env.JWT_SALT_KEY_ADMIN, (error) => {
            if (error) {
                jwt.verify(token, process.env.JWT_SALT_KEY_BUYER, (error) => {
                    if (error) {
                        return res.status(440).json({
                            success: false,
                            message: "Session Expired Please Login Again"
                        })
                    }
                    else
                        next()
                })
            }
            else
                next()
        })
    }
    else
        res.status(440).json({
            success: false,
            message: "Session Expired Please Login Again"
        })
}
module.exports = { verifyAdmin: verifyAdmin, verifyBuyer: verifyBuyer, verifyBoth: verifyBoth }