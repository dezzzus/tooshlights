$('.device').click(function (evt) {
  //console.log ('/venue/'+evt.target.dataset.id+'/view');
  window.location.href = '/venue/'+evt.target.dataset.id+'/';
})