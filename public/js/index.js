$(function () {

  $('#initailize-form').submit(function(e) {
    e.preventDefault() 
    let form = $(this)
    let url = form.attr('action')
    $.ajax({
      type: 'POST',
      url: url,
      data: form.serialize(),
      success: function(data)
      {
        window.location.href = '/mobile-contents';
      }
    })
  })
})