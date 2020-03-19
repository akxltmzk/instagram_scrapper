let express = require('express')
let router = express.Router()

router.get('/mobile-form', (req, res, next)=> {
  res.render('mobile-form')       
})

router.get('/mobile-contents', (req, res, next)=> {
  res.render('mobile-contents')       
})

module.exports = router