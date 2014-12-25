$(document).ready(function() {
  loadEmails()

  html = ''
  elem = $('#list')
  setTimeout(function(){
    for( i = 0; i < emailsRead - 1; i++ ) {
      item = emails.item(i)
      html += ''+
        '<div class="score">'+
          '<a href="#" data-id="'+item.id+'">'+item.patient+'</a>'+
          '<div class="hidden" id="'+item.id+'">'+
            '<div class="body">'+item.email_body.replace(/\n/g,'<br />')+'</div>'+
            '<center class="send-delete-email">'+
              '<a href="#" data-function="sendEmailById" data-id="'+item.id+'">Enviar</a> <a>|</a> '+
              '<a href="#" data-function="deleteEmail" data-id="'+item.id+'">Deletar</a>'+
            '</center>'+
          '</div>'+
        '</div>'
    }
    elem.html(html)
  }, 100)

  setTimeout(function(){$('#list').slideDown()}, 300)
})

$(document).ready(function(){
  setTimeout(function(){  
    $('.score > a').on('click', function(e){
      id = $(e.target).data('id')
      $('#'+id).slideToggle()
    })
  }, 500)
})