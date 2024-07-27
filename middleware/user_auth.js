const jwt = require('jsonwebtoken')

const UserisLogin = async (req, res, next) => {

    try {
     
        if (req.headers['authorization']) {
            let token = req.headers['authorization']
            token = token.split(' ')
            token = jwt.decode(token[1])
            req.body.user_email = token
            next()
        } else {
          res.status(500).json({message:'user is not authenticated'})
        }

    }

    catch (err) {
        res.status(500).json({message:err.message})
    }

}
module.exports = {
    UserisLogin
}