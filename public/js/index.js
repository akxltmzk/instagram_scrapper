const socket = io.connect('http://localhost:3000');

$(function () {

  $('#initailize-form').submit(function(e) {
    e.preventDefault() 

    // browser page loading signal
    socket.emit('loading','test')

    // mobile page loading signal
    $('.contents-box').addClass('hidden')
    $('.loader-box').removeClass('hidden')

    // send user name to server
    let form = $(this)
    let url = form.attr('action')
    $.ajax({
      type: 'POST',
      url: url,
      data: form.serialize(),
      success: function(data)
      {
        window.location.href = '/mobile-form';
      }
    })
  })
})