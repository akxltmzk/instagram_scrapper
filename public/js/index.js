const socket = io.connect('http://192.168.89.2:3000');

$(function () {
  // start instagram image scrapper
  $('#initailize-form').submit(function(e) {
    e.preventDefault() 

    // browser page loading signal
    socket.emit('goto-loading-page')

    // mobile page loading signal
    $('.contents-box').addClass('hidden')
    $('.loader-box').removeClass('hidden')
    $('.control-pannel').addClass('hidden')

    // send user name to server
    let form = $(this)
    let url = form.attr('action')
    $.ajax({
      type: 'POST',
      url: url,
      data: form.serialize(),
      success: function(data)
      {
        $('.contents-box').addClass('hidden')
        $('.loader-box').addClass('hidden')
        $('.control-pannel').removeClass('hidden')
      }
    })
  })

  // back to intro
  $('#backtointro-form').submit(function(e) {
    e.preventDefault() 
    window.location.href = '/mobile-form'
    socket.emit('goto-intro-page')
  })

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