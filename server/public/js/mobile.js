const socket = io.connect($('#ip').text())

$(function () {

  const tool = $('#tool').text()

  //start instagram image scrapper  
  $('#initialize-form').submit(function(e) {
    e.preventDefault() 

    if(tool == 'VR')
      socketemit('account-enter')
    else
      socketemit('goto-loading-page')

    $('.start-box').addClass('hidden')
    $('.loader-box').removeClass('hidden')

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
          if(tool == 'VR')
            socketemit('account_enter_fail')
          else
            socketemit('goto-intro-page')
          
          $('.start-box').removeClass('hidden')
          $('.loader-box').addClass('hidden')

          $('.alert').text('ACCOUNT DOESN NOT EXIST!')

        }
        else if(res =='private'){
          if(tool == 'VR')
            socketemit('account_enter_fail')
          else
            socketemit('goto-intro-page')

          $('.start-box').removeClass('hidden')
          $('.loader-box').addClass('hidden')

          $('.alert').text('ACCOUNT IS PRIVATE!')
        }
        else{   
          if(tool == 'VR'){       
            socketemit('image-ready-signal')
            $('.collecting-data').addClass('hidden')
            $('.hmd-guide.hidden').removeClass('hidden')
          }
          else{             
            $('.start-box').addClass('hidden')
            $('.loader-box').addClass('hidden')
            $('.control-pannel').removeClass('hidden')
          }
        }
      }
    })
  })

 /*========================================================= */
 /*======================== VR ============================= */
 /*========================================================= */
  
  // wath vr
  $('#watch-vr-form').click(()=>{
    socketemit('goto-vr-experience')
    $('#watch-vr-form').text('vr ready')
    $('#watch-vr-form').css({'color':'red'})

  })

  // back to intro
 $('.cancle').click(function(e) {
    e.preventDefault() 
    
    if(tool == 'VR')    
      socketemit('finish-signal') 
    else
      socketemit('goto-intro-page')

    window.location.href = '/mobile-form'

    
    $('#backtointro-form').off('click')
  })


  if(tool == 'VR'){
    $('#downloadimage-form').addClass('hidden')
    $('#deleteimage-form button').addClass('hidden')
    return
  } 

 /*========================================================= */
 /*======================== DISPLAY ======================== */
 /*========================================================= */
  

  
  // download instagram image in local server
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

  // delete instagram image in local server
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
})

socket.on('start-experience',(data)=>{
  $('.start-box').addClass('hidden')
  $('.loader-box').addClass('hidden')
  $('.experience-box').removeClass('hidden')

  startTimer()

})
/*========================= FUNC ========================== */

function socketemit(emit_str){
  socket.emit(emit_str)
}

