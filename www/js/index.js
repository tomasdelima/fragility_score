var line = "\n"

var app = {
  initialize: function() {
    this.bindEvents()
  },
  bindEvents: function() {
    document.addEventListener('deviceready', this.onDeviceReady, false)
  },
  onDeviceReady: function() {
    app.receivedEvent('deviceready')
  },
  receivedEvent: function(id) {
    var parentElement = document.getElementById(id)
    var listeningElement = parentElement.querySelector('.listening')
    var receivedElement = parentElement.querySelector('.received')

    listeningElement.setAttribute('style', 'display:none;')
    receivedElement.setAttribute('style', 'display:block;')

    console.log('Received Event: ' + id)
  },
  questions: {
    'question1': 'O senhor(a) notou que emagreceu no último ano?',
    'question2': 'Sentiu que teve que fazer esforço para fazer suas tarefas habituais?',
    'question3': 'Não conseguiu levar adiante suas coisas?',
    'question4': 'Tem apresentado dificuldade para segurar objetos, deixando escapar pelas mãos?',
    'question5': 'Tem notado que andar está ficando mais lento e difícil?',
    'question6': 'Algum médico já disse que o(a) senhor(a) possui pelo menos duas das condições a seguir: doenças do coração, pressão alta, artrite/reumatismo, diabetes melitus, doença do pulmão, osteoporose, depressão, câncer, AVC/derrame/isquemia? ',
  },
  totalScore: function() {
    var sum = 0
    $.each(app.result, function(k, v){
      sum += v
    })
    return sum
  },
  currentQuestion: 0,
  result: {},
  risk: function () {
    var i = 'Paciente com risco de fragilidade'
    if(app.totalScore() > 2) { i = 'Paciente frágil'}
    if(app.totalScore() == 0) { i = 'Paciente não frágil'}
    return i
  },
  patientName: function () { return $('input[name=name]').val() },
  patientRegistry: function () { return $('input[name=registry]').val() },
  mailTo: 'and_ufrj@yahoo.com.br'
}

function toggleYesNoButtons() {
  $('.next').toggleClass('hidden')
  $('.answers').toggleClass('hidden')
}

function showNextQuestion() {
  $('.question' + app.currentQuestion).toggleClass('hidden')
  app.currentQuestion += 1
  $('.question' + app.currentQuestion).toggleClass('hidden')
}

function showPreviousQuestion() {
  $('.question' + app.currentQuestion).toggleClass('hidden')
  app.currentQuestion -= 1
  $('.question' + app.currentQuestion).toggleClass('hidden')
}

function showResults() {
  for(i=1; i < 7; i++) {
    $('#question'+i).addClass( app.result['question'+i] ? 'icon-yes' : 'icon-no' )
  }
  $('#total').text( app.totalScore() )
  $('#risk').text( app.risk() )
  $('.answers').addClass('hidden')
  saveEmail()
}

function nextQuestion() {
  if (app.currentQuestion == 0) {
    if(!app.patientName()) {
      $('input[name=name]').css('border', '1px solid red')
    } else {
      $('input[name=name]').css('border', '0')
    }
    if(!app.patientRegistry()) {
      $('input[name=registry]').css('border', '1px solid red')
    } else {
      $('input[name=registry]').css('border', '0')
    }

      if(app.patientName() && app.patientRegistry()) {
      toggleYesNoButtons()
      showNextQuestion()
      }
  } else {
    showNextQuestion()

    if (app.currentQuestion == 7) {
      showResults()
    }
  }
}

function previousQuestion() {
  if(app.currentQuestion > 0 ) {
    showPreviousQuestion()
  }
  if(app.currentQuestion == 0) {
    toggleYesNoButtons()
  }
}

function score (n) {
  app.result['question'+app.currentQuestion] = n
  nextQuestion()
}


app.initialize();

$(document).ready(function(){
  $('center').slideDown()
})




