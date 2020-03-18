let express = require('express')
let router = express.Router()

router.get('/', (req, res, next)=> {

  let spawn = require("child_process").spawn
  let process = spawn('python',["python_scrapper/app.py"] )        

  process.stdout.on('data',(data)=>{

    let utf8 = data.toString('utf-8')
    utf8 = utf8.replace(/['\[\]]/g, '')
    let array = utf8.split(',')

    
    res.render('index',{'result': array})       
  })   
})




module.exports = router
