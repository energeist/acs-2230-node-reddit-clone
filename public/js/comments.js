$(document).ready(function() {
  $('.vote-up').submit(function(e) {
    const commentId = $(this).data('id');
    $.ajax({
      type: 'PUT',
      url: 'comments/' + commentId + '/vote-up',
      success: function(data) {
        console.log('voted up!');
      },
      error: function(err) {
        console.log(err.messsage);
      }
    });
  });
  $('.vote-down').submit(function(e) {
    const commentId = $(this).data('id');
    $.ajax({
      type: 'PUT',
      url: 'comments/' + commentId + '/vote-down',
      success: function(data) {
        console.log('voted down!');
      },
      error: function(err) {
        console.log(err.messsage);
      }
    });
  });
});