const express = require('express')
const download = require('image-downloader') 
const fs = require('fs')
let router = express.Router()

const { 
  python_scrapping
  } = require('../controller/scrapping')

let urlArray = ''

module.exports = function (io) {
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
  router.get('/mobile-form', (req, res, next)=> {
    res.render('mobile-form')  
  })

  /*
  post request from mobile
  */ 
  router.post('/initialize-contents',async (req,res,next)=>{
    // get user instagram ID
    let instaID = req.body.instaID
    let result = await python_scrapping(instaID)
    if(result=='private'|| result == 'wrong')
      res.send(result)
    else{
       io.emit('get-url-Array',result)
       urlArray = result
       res.end()
    }
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