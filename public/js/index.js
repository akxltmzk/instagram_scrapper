$(function () {

  $('#initailize-form').submit(function(e) {
    e.preventDefault() 
    $('.contents-box').addClass('hidden')
    $('.loader-box').removeClass('hidden')
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