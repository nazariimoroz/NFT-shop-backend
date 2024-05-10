﻿const jwt = require('jsonwebtoken')

/**
 * req.jwtDecoded
 */
module.exports = function (req, res, next) {
    if(req.method === "OPTIONS") {
        next()
    }

    try {
        // "Bearer token_body"
        const token = req.headers.authorization?.split( ' ' )[1]
        if(!token) {
            return res.status(403).json( {message: "user is not register"} )
        }
        req.jwtDecoded = jwt.verify(token, process.env.JWT_SECRETKEY)
        return next()
    } catch (e) {
        console.log(e)
        return res.status(403).json( { message: "user is not register" } )
    }
}