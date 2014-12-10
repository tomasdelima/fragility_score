$(document).ready(function() {
  loadEmails()

  html = ''
  elem = $('#list')
  setTimeout(function(){
    for( i = 0; i < emailsRead - 1; i++ ) {
      console.log(emails.item(i).patient)
      item = emails.item(i)
      html += '<div>'+
        '<a href="#" onclick="toggleShow('+item.id+')">'+item.patient+'</a>'+
        '<div class="hidden" id="'+item.id+'">'+item.email_body+'</div>'+
        '</div>'
    }
    elem.html(html)
  }, 100)
})

function toggleShow(id) {
  $('#'+id).toggleClass('hidden')
}