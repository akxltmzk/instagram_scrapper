let express = require('express')
let router = express.Router()

module.exports = function (io) {

  // socket io connect
  io.on('connection', function (socket) {
    console.log('socket connected!')
 })

  router.get('/intro', (req, res, next)=> {
    res.render('browser')         
  })

  router.post('/initialize-contents',(req,res,next)=>{

    // get user instagram ID
    let instaID = req.body.instaID
    
    // active app.py
    let spawn = require("child_process").spawn
    let process = spawn('python',["python_scrapper/app.py",'JJong.h'] ) 

    // recieve data form app.py
    process.stdout.on('data',(data)=>{
      let utf8 = data.toString('utf-8')
      utf8 = utf8.replace(/['\[\]]/g, '')
      let array = utf8.split(',')

      console.log(array)
    })

    res.send('done')
  })



  return router
}


