const socket = io.connect($('#ip').text())

// get url array form server, and make image grid
socket.on('get-url-Array',(data)=>{

 
  $('.loading-page').addClass('hidden')
  $('.idle-page').addClass('hidden')
  $('.image-page').removeClass('hidden')

  data.forEach(element => {
    $('.instagram-image').append(`<img src=${element} class='image'>`)
  })

  $('.image').css({
    'width' : '180px',
    'height': '180px',
    'margin': '20px',
    'display': 'inline'
  })
})

socket.on('browser-goto-loading-page',()=>{
  $('.loading-page').removeClass('hidden')
  $('.idle-page').addClass('hidden')
  $('.image-page').addClass('hidden')
})

socket.on('broswer-goto-intro-page',()=>{
  window.location.href = '/intro'
})


