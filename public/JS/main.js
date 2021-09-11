/* queries */
const questionForm = document.querySelector("#question-form")
const questionInput = questionForm.querySelector('#question-input')
const questionBtn = questionForm.querySelector('#question-btn')
const authBtn = document.querySelector('#auth-btn')

/*Base funcs */
const questionsRender = $.create.renderList
const isValid = $.inputValid
const newQuestion = $.create
const newModal = $.createModal

/*Main functionality */
authBtn.addEventListener('click', showAuthModal)
window.addEventListener('load', questionsRender)
questionForm.addEventListener('submit', questionFormSubmit)
questionInput.addEventListener('input', () => {
  questionBtn.disabled = !isValid(questionInput.value)
  console.log(isValid(questionInput.value));

})

function questionFormSubmit(event) {
  event.preventDefault();
  if (isValid(questionInput.value)) {
    const question = {
      text: questionInput.value,
      date: new Date().toJSON()
    }

    newQuestion.createQuestion(question)
    .then((response)=> {
      questionBtn.disabled = true
      questionForm.reset()
      questionInput.className = ' '
      questionBtn.disabled = false

    })
  }
  // Async func
}


function showAuthModal() {
  newModal('Authentification', $.createAuthForm())
  const authForm = document.querySelector('#auth-form')
  authForm.addEventListener('submit', event => {
    event.preventDefault();
const submitBtn = event.target.querySelector('button')
const authEmail= event.target.querySelector('#auth-email').value
const authPassword = event.target.querySelector('#auth-password').value
console.log(authEmail, authPassword);
    submitBtn.disabled = true
$.authWithEmailAndPassword(authEmail, authPassword)
    .then( $.fetchToken)
    .then(getContent)
    .then(()=> {submitBtn.disabled = false})
  })
}

function getContent(content) {
  if (typeof content === 'string') {
    newModal('Wait!', content)
  } else {
    newModal('List of questions', $.create.listReceivedQuestion(content))
  }
}


