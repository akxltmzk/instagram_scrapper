const express = require('express')

let router = express.Router()


/*
get request from browser
*/ 
router.get('/intro', (req, res, next)=> {
  res.render('browser')   
   
})

module.exports = router




