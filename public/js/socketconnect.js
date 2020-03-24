const socket = io.connect('http://localhost:3000');

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

  // back to intro page
  setTimeout(function(){ 
    window.location.href = '/intro'
  }, 10000);
})

socket.on('loadingpage-active',()=>{
  $('.loading-page').removeClass('hidden')
  $('.idle-page').addClass('hidden')
  $('.image-page').addClass('hidden')
})



