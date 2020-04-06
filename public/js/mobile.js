const socket = io.connect($('#ip').text())

$(function () {

  /*
  start instagram image scrapper
  */ 

  $('#initialize-form').submit(function(e) {
    e.preventDefault() 

    socketemit('goto-loading-page')

    $('.contents-box').addClass('hidden')
    $('.loader-box').removeClass('hidden')
    $('.control-pannel').addClass('hidden')

    // send user name 
    let form = $(this)
    let url = form.attr('action')
    $.ajax({
      type: 'POST',
      url: url,
      data: form.serialize(),
      success: function(res)
      {
        if(res == 'wrong' ){
          // browser go back to intro
          socketemit('goto-intro-page')
          
          $('.contents-box').removeClass('hidden')
          $('.loader-box').addClass('hidden')
          $('.control-pannel').addClass('hidden')
          $('.alert').text('Account does not exist!')

        }
        else if(res =='private'){
          // browser go back to intro
          socketemit('goto-intro-page')
          $('.contents-box').removeClass('hidden')
          $('.loader-box').addClass('hidden')
          $('.control-pannel').addClass('hidden')
          $('.alert').text('Account is private!')
        }
        else{            
          $('.contents-box').addClass('hidden')
          $('.loader-box').addClass('hidden')
          $('.control-pannel').removeClass('hidden')
        }
      }
    })
  })

  /*
  wath vr
  */
  $('#watch-vr-form').click(()=>{
    socketemit('goto-vr-experience')
    $('#watch-vr-form').text('vr ready')
    $('#watch-vr-form').css({'color':'red'})

  })

  /*
   download instagram image in local server
  */
  $('#downloadimage-form').submit(function(e) {
    e.preventDefault() 

    $('#downloadimage-form button').text('downloading ...')

    let form = $(this)
    let url = form.attr('action')

    $.ajax({
      type: 'POST',
      url: url,
      success: function()
      {
        $('#downloadimage-form button').text('download image done')
        $('#downloadimage-form button').css({'color':'red'})
      }
    })
 
  })

  /* 
  delete instagram image in local server
  */

  $('#deleteimage-form').submit(function(e) {
    e.preventDefault() 

    $('#deleteimage-form button').text('delete ...')

    let form = $(this)
    let url = form.attr('action')

    $.ajax({
      type: 'POST',
      url: url,
      success: function()
      {
        $('#deleteimage-form button').text('delete done')
        $('#deleteimage-form button').css({'color':'red'})
      }
    })
  
  })

  /*  
  back to intro
  */
 $('#backtointro-form').submit(function(e) {
  e.preventDefault() 
  window.location.href = '/mobile-form'
  socketemit('goto-intro-page')
})
})

function socketemit(emit_str){
  socket.emit(emit_str)
}