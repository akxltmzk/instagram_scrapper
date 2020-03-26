let express = require('express')
let router = express.Router()

module.exports = function (io) {

  let urlArray 

  // socket io connect
  io.on('connection', function (socket) {  
    console.log('socket connected!')

    // make interaction mobile and browser
    socket.on('goto-loading-page',()=>{
      io.emit('browser-goto-loading-page') 
    })

    socket.on('goto-intro-page',()=>{
      io.emit('broswer-goto-intro-page') 
    })

 })

  router.get('/intro', (req, res, next)=> {
    res.render('browser')         
  })

  router.post('/initialize-contents',(req,res,next)=>{

    // get user instagram ID
    let instaID = req.body.instaID
    
    // active app.py
    let spawn = require("child_process").spawn
    let process = spawn('python',["python_scrapper/app.py",instaID.toString()] ) 

    // recieve data form app.py
    process.stdout.on('data',(data)=>{
    
      let utf8 = data.toString('utf-8')
      utf8 = utf8.replace(/['\[\]]/g, '')
      let array = utf8.split(',')

      urlArray = array
 
      if(urlArray.length > 0)
        io.emit('get-url-Array',urlArray)

      res.end()
 
    })   
  })

  return router
}


