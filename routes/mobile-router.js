let express = require('express')
let router = express.Router()

router.get('/mobile-form', (req, res, next)=> {
  res.render('mobile-form')       
})

module.exports = router