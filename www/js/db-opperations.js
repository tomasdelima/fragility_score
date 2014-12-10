
function sendEmail () {
  cordova.plugins.email.open({
    to:          [app.mailTo],
    cc:          [],
    bcc:         [],
    attachments: [],
    subject:     buildEmailSubject(),
    body:        buildEmailBody(),
    isHtml:      false,
  });
}

function saveEmail () {
  loadEmails()

  db.transaction(function (tx) {
    tx.executeSql('INsERT INTO scores_table VALUES ('+emailsRead+',"'+Date(Date.now())+'",'+Date.now()+',"'+app.patientName()+'","'+buildEmailBody()+'")')
  },
  function(e){alert('Email não foi salvo: ' + e.message)},
  function(e){alert('Email salvo')})

  loadEmails()

}

function loadEmails (patient, emailBody) {
  db.transaction(function (tx) {
    tx.executeSql('SELECT * FROM scores_table', [], function(tx, results) {
        emailsRead = 1 + results.rows.length
        emails = results.rows
      }
    );
  });
}

$(document).ready(function() {
  db = openDatabase('mydb', '1.0', 'My DB', 2 * 1024 * 1024);

  db.transaction(function (tx) {
    tx.executeSql('CREATE TABLE IF NOT EXISTS scores_table (id integer primary key, data text, data_num integer, patient text, email_body text)');
  });
})
