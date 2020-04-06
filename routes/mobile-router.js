const express = require('express') 
let router = express.Router()

const { 
  python_scrapping
  } = require('../controller/scrapping')


const { 
  download_image,
  delete_image
  } = require('../controller/download')

let urlArray = ''

module.exports = function (io) {
    /*
    socket io connect
    */ 
  io.on('connection', function (socket) {  

    console.log('socket connected!')

    /*-------------------------------------------------------------------------------- */
    /*-----------------------------socketio - web------------------------------------- */
    /*-------------------------------------------------------------------------------- */

    // make interaction mobile and browser 
    socket.on('goto-loading-page',()=>{
      io.emit('browser-goto-loading-page') 
    })
    socket.on('goto-intro-page',()=>{
      io.emit('broswer-goto-intro-page') 
    })

    /*-------------------------------------------------------------------------------- */
    /*-----------------------------socketio - unity----------------------------------- */
    /*-------------------------------------------------------------------------------- */

    socket.on('user_name',async (data)=>{  
      let result = await python_scrapping(data.username)
      io.emit('image_url_array',{'data':result})
    })

    socket.on('goto-vr-experience',async (data)=>{  
      console.log('test')
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
    download_image(urlArray)
    res.end()
  })

  router.post('/delete-image', (req,res)=>{
    delete_image()
    res.end()
  })

 return router
}