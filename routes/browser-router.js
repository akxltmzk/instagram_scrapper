const express = require('express')
const fs = require('fs')
const request = require('request')
const download = require('image-downloader')

let router = express.Router()

module.exports = function (io) {

  let urlArray 

  =[
    'https://scontent-ssn1-1.cdninstagram.com/v/t51.2885-15/sh0.08/e35/s640x640/89941139_2659163684330499_1995142519257920580_n.jpg?_nc_ht=scontent-ssn1-1.cdninstagram.com&_nc_cat=103&_nc_ohc=xU49u_fIHnEAX_Eg3d2&oh=5b937436d2fc9c89452415334e9af44c&oe=5EA4690E',
    ' https://scontent-ssn1-1.cdninstagram.com/v/t51.2885-15/sh0.08/e35/c0.165.1440.1440a/s640x640/82780285_189553755465042_2786451380936175632_n.jpg?_nc_ht=scontent-ssn1-1.cdninstagram.com&_nc_cat=106&_nc_ohc=vjsGFm4K_ZsAX8UIB7r&oh=18be5f918a3a079e95e2de1108ea3e45&oe=5EA5543E',
    ' https://scontent-ssn1-1.cdninstagram.com/v/t51.2885-15/e35/c67.0.409.409a/71540285_497328467548806_1311488460424470343_n.jpg?_nc_ht=scontent-ssn1-1.cdninstagram.com&_nc_cat=106&_nc_ohc=X8WoBFS4QZAAX84cdXe&oh=04de6da17f30d7734bf60b76a166bd54&oe=5EA6BFF8',
    ' https://scontent-ssn1-1.cdninstagram.com/v/t51.2885-15/e35/c107.0.426.426a/76865134_167280117817592_8599373996154849308_n.jpg?_nc_ht=scontent-ssn1-1.cdninstagram.com&_nc_cat=108&_nc_ohc=3W90LrH4SgAAX-HhK6Q&oh=a03589f2ec120fc320bd4108e5fb3c22&oe=5EA6E091',
    ' https://scontent-ssn1-1.cdninstagram.com/v/t51.2885-15/sh0.08/e35/c180.0.1080.1080a/s640x640/89362268_1359440934257715_82458972594163627_n.jpg?_nc_ht=scontent-ssn1-1.cdninstagram.com&_nc_cat=103&_nc_ohc=4gx4fL6SbeIAX-C0TlF&oh=2ef073cedb69485f044810039ef59719&oe=5EA4E0F3',
    ' https://scontent-ssn1-1.cdninstagram.com/v/t51.2885-15/sh0.08/e35/c180.0.1080.1080a/s640x640/89814263_2934013606685332_4260051317329997624_n.jpg?_nc_ht=scontent-ssn1-1.cdninstagram.com&_nc_cat=104&_nc_ohc=g3lOpuatqfcAX9gCsEB&oh=1d455b1c78931e39a56d9cfdb7aa79d6&oe=5EA77E97',
    ' https://scontent-ssn1-1.cdninstagram.com/v/t51.2885-15/sh0.08/e35/s640x640/89603916_2531389500468051_5416876201785209695_n.jpg?_nc_ht=scontent-ssn1-1.cdninstagram.com&_nc_cat=103&_nc_ohc=_PnGju67A_sAX8PC8rq&oh=35fc903aed0eb912a8e4b5d69f236f85&oe=5EA4C35B',
    ' https://scontent-ssn1-1.cdninstagram.com/v/t51.2885-15/sh0.08/e35/s640x640/89856843_104628577752622_3739791960652618056_n.jpg?_nc_ht=scontent-ssn1-1.cdninstagram.com&_nc_cat=110&_nc_ohc=wUMrWQr0CZAAX-pS0fa&oh=c54f7a29d2ed34fa3b0654b1266f7936&oe=5EA6536E',
    ' https://scontent-ssn1-1.cdninstagram.com/v/t51.2885-15/sh0.08/e35/s640x640/77136429_192037338634626_5339826778069995579_n.jpg?_nc_ht=scontent-ssn1-1.cdninstagram.com&_nc_cat=106&_nc_ohc=UxMdLkkaQwYAX9wQrJn&oh=e4968c558d89f0aaf5ad9abf56be69e6&oe=5EA51EE9',
    ' https://scontent-ssn1-1.cdninstagram.com/v/t51.2885-15/sh0.08/e35/s640x640/72450408_571081223660607_1035788398818627796_n.jpg?_nc_ht=scontent-ssn1-1.cdninstagram.com&_nc_cat=103&_nc_ohc=qflS1UBf9MIAX_hCcVL&oh=8bdd8838b6ebc92f32e2e24c7c57b783&oe=5EA7AE0E',
    ' https://scontent-ssn1-1.cdninstagram.com/v/t51.2885-15/sh0.08/e35/s640x640/72775894_777370856025552_899546205666614623_n.jpg?_nc_ht=scontent-ssn1-1.cdninstagram.com&_nc_cat=100&_nc_ohc=bG5Km60Vra0AX_qXljC&oh=11d34dcc7594699b8eb72f74074df703&oe=5EA61C86',
    ' https://scontent-ssn1-1.cdninstagram.com/v/t51.2885-15/sh0.08/e35/s640x640/75372338_576046369637472_3807990252884674691_n.jpg?_nc_ht=scontent-ssn1-1.cdninstagram.com&_nc_cat=100&_nc_ohc=-PFNeWisKdkAX9rJXgH&oh=b885d7f19d41577947ddd61095c9e539&oe=5EA5A6E4\r\n'
  ]
  












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

  router.post('/download-image', (req,res)=>{
    urlArray.forEach(async(element) =>{ 
      const options = {
        url: element,
        dest: 'image-data/'
      }
      try {
        const { filename, image } = await download.image(options)
        console.log(filename) 
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


