
function saveEmail () {
  loadEmails()
  nextId()

  db.transaction(function (tx) {
    tx.executeSql('INSERT INTO scores_table VALUES ('+maxId+',"'+Date(Date.now())+'",'+Date.now()+',"'+app.patientName()+'","'+buildEmailBody()+'")')
  },
  function(e){alert('Email não foi salvo: ' + e.message)},
  function(e){window.plugins.toast.showLongBottom('Email salvo')})

  loadEmails()

}

function loadEmails () {
  db.transaction(function (tx) {
    tx.executeSql('SELECT * FROM scores_table', [], function(tx, results) {
        emailsRead = 1 + results.rows.length
        emails = results.rows
      }
    );
  });
}

function loadEmailById (id) {
  db.transaction(function (tx) {
    tx.executeSql('SELECT * FROM scores_table WHERE id = ' + id, [], function(tx, results) {
        email = results.rows.item(0)
      }
    );
  });
}

function nextId () {
  db.transaction(function (tx) {
    tx.executeSql('SELECT max(id) as maxId FROM scores_table', [], function(tx, results) {
        maxId = results.rows.item(0).maxId + 1
      }
    );
  });
}

function deleteEmail (id) {
  db.transaction(function (tx) {
    tx.executeSql('DELETE FROM scores_table WHERE id = ' + id, []);
  },
  function(e){alert('Email não foi deletado: ' + e.message)},
  function(e){
    location.reload()
    window.plugins.toast.showLongBottom('Email deletado')
  });

}


$(document).ready(function() {
  db = openDatabase('mydb', '1.0', 'Fragility Score 1.0', 2 * 1024 * 1024);

  db.transaction(function (tx) {
    tx.executeSql('CREATE TABLE IF NOT EXISTS scores_table (id integer primary key, data text, data_num integer, patient text, email_body text)');
  });
})
