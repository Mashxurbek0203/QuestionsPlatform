$.create = {
  createQuestion(question) {
    return fetch('https://my-question-platform-default-rtdb.firebaseio.com/quesions.json', {
      method: 'POST',
      body: JSON.stringify(question),
      headers: {
        'Content-Type': 'application/json'
      }      
    })
    .then(response => response.json())
    .then(response => {
      Object.assign(response, {
        id: response.name
      })
      return response
    })
    .then($.create.localizeQuestions(question))
    .then($.create.renderList)
},
localizeQuestions(question) {
  const allQusetions = $.create.getLocalQuestions()
  allQusetions.push(question)
  localStorage.setItem('questions', JSON.stringify(allQusetions))
},
getLocalQuestions() {
  return JSON.parse(localStorage.getItem('questions') || '[]')
},
renderList() {
  const questions =$.create.getLocalQuestions()
  const html = questions.length 
  ? questions.map($.create.toCard).join('')
  : `<div class="mui--text-headline">MUI Acquires New Features</div>`
  const questionsList = document.querySelector('#list')
  questionsList.innerHTML = html
},

toCard(question){
  return  `
  <div class="mui--text-black-54">
  ${new Date(question.date).toLocaleDateString()}
  ${new Date(question.date).toLocaleTimeString()}
  </div>
  <div class="mui--text-headline">
  ${question.text}
  </div>
  <br>
  `
},
listReceivedQuestion(questions) {
  return questions.length ? `<ol class="modal-question-list">${questions.map(question => `<li>${question.text}</li>`).join('')}</ol>` : '<p>No questions yet.</p>'
}
} 

