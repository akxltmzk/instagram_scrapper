require('dotenv').config()

const createError = require('http-errors')
const express = require('express')
const path = require('path')
const cookieParser = require('cookie-parser')
const logger = require('morgan')
const fs = require('fs')

let app = express()
app.io = require('socket.io')()

let browser_router = require('./routes/browser-router')
let mobile_router = require('./routes/mobile-router')(app.io)

app.set('views', path.join(__dirname, 'views'))
app.set('view engine', 'pug')
app.use(logger('dev'))
app.use(express.json())
app.use(express.urlencoded({ extended: false }))
app.use(cookieParser())
app.use(express.static(path.join(__dirname, 'public')))

app.use((req,res,next)=>{
  res.locals={
    socket_ip : process.env.SOCKET_IP,
    tool : process.env.TOOL  
  }
  next()
})

app.use('/', browser_router)
app.use('/', mobile_router)

let session_config = {"session_id": "", "session_url": ""}
let data = JSON.stringify(session_config)
fs.writeFileSync('session.json', data);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404))
})

// error handler
app.use(function(err, req, res, next) {
  res.locals.message = err.message
  res.locals.error = req.app.get('env') === 'development' ? err : {}
  res.status(err.status || 500)
  res.render('error')
})

module.exports = app
