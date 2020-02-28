let express = require('express')
let router = express.Router()

router.get('/', (req, res, next)=> {

  let spawn = require("child_process").spawn
  let process = spawn('python',["python_scrapper/app.py"] )        

  process.stdout.on('data',(data)=>{
 
    let result = Buffer.from(data)
    console.log(result[0])
    console.log(result.length)    
    res.render('index',{'result': result})       
  })   
})


// 8057


module.exports = router
