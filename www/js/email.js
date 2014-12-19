var app = app || { mailTo: 'and_ufrj@yahoo.com.br' }

function buildEmailBody() {
  body = 'Nome: ' + app.patientName() + line
  body += 'Número do prontuário: ' + app.patientRegistry() + line + line
  body += 'Perguntas:' + line
  for(i=1; i < 7; i++) {
    q = 'question' + i
    a = app.result[q] ? 'Sim' : 'Não'
    body += '  ' +i + ') ' + app.questions[q] + " " + a + line
  }
  body += line + 'Resultado: ' + app.risk()
  return body
}

function buildEmailSubject() {
  return 'Resultado do teste "Escore de Fragilidade" para ' + app.patientName()
}

function sendEmail (subject, body) {
  cordova.plugins.email.open({
    to:          [app.mailTo],
    cc:          [],
    bcc:         [],
    attachments: [],
    subject:     subject || buildEmailSubject(),
    body:        body || buildEmailBody(),
    isHtml:      false,
  });
}

function sendEmailById (id) {
  loadEmailById(id)
  setTimeout(function(){
    sendEmail(email.patient, email.email_body)
    setEmailSent(id)
  }, 100)
}
