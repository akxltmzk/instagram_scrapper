const express = require('express')
const fs = require('fs')
const request = require('request')
const download = require('image-downloader')
let router = express.Router()

module.exports = function (io) {

  let urlArray = ''

  /*
  socket io connect
  */ 
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

  /*
  get request from browser
  */ 
  router.get('/intro', (req, res, next)=> {
    res.render('browser')         
  })

  /*
  post request from mobile
  */ 
  router.post('/initialize-contents',(req,res,next)=>{

    // get user instagram ID
    let instaID = req.body.instaID
    
    // active app.py
    let spawn = require("child_process").spawn
    let process = spawn('python',["python_scrapper/app.py",instaID.toString()] ) 

    // recieve data form app.py
    process.stdout.on('data',(data)=>{
      let utf8 = data.toString('utf-8')
      
      // if account is private
      if(data.toString() == Buffer.from("private\r\n", 'ascii')){
        res.send('private')
      }

      //if account doesnt exist
      else if (utf8 == Buffer.from("wrong\r\n", 'ascii')){
        res.send('wrong')
      }

      // account is public
      else{
        utf8 = utf8.replace(/['\[\]]/g, '')
        let array = utf8.split(',')

        urlArray = array
  
        if(urlArray.length > 0)
          io.emit('get-url-Array',urlArray)
        res.end()
      }
    })   
  })

  router.post('/download-image', (req,res)=>{
    urlArray.forEach(async(element) =>{ 
      const options = {
        url: element,
        dest: 'image-data/'
      }
      try {
        const { filename, image } = await download.image(options)
      } catch (e) {
        console.error(e)
      }
    })
    res.end()
  })

  router.post('/delete-image', (req,res)=>{
    var FOLDER_PATH = 'image-data/'
    var files = fs.readdirSync(FOLDER_PATH)
    files.forEach(element => {
        fs.unlinkSync(FOLDER_PATH + "/" + element)
    })
    res.end()
  })

  return router
}


