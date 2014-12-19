$(document).ready(function() {
  loadEmails()

  html = ''
  elem = $('#list')
  setTimeout(function(){
    for( i = 0; i < emailsRead - 1; i++ ) {
      item = emails.item(i)
      html += ''+
        '<div class="score">'+
          '<a href="#" onclick="toggleShow('+item.id+')">'+item.patient+'</a>'+
          '<div class="hidden" id="'+item.id+'">'+
            '<div class="body">'+item.email_body.replace(/\n/g,'<br />')+'</div>'+
            '<center class="send-delete-email">'+
              '<a href="#" onclick="sendEmailById('+item.id+')">Enviar</a> <a>|</a> '+
              '<a href="#" onclick="deleteEmail('+item.id+')">Deletar</a>'+
            '</center>'+
          '</div>'+
        '</div>'
    }
    elem.html(html)
  }, 100)

  setTimeout(function(){$('#list').slideDown()}, 300)
})

function toggleShow(id) {
  $('#'+id).slideToggle()
}