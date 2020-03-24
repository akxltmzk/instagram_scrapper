const socket = io.connect('http://localhost:3000');

socket.on('getusername',(data)=>{
  console.log(data.length)
  $('.idle-page').addClass('hidden')

  data.forEach(element => {
    $('.instagram-image').append(`<img src=${element} class='image'>`)
  })

  $('.image').css({
    'width' : '180px',
    'height': '180px',
    'margin': '20px',
    'display': 'inline'
  })


  setTimeout(function(){ 
    window.location.href = '/intro'
  }, 10000);
})