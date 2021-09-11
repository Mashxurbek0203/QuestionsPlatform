$.createAuthForm = function() {
  return `
  <form class="mui-form" id="auth-form">
            
            <div class="mui-textfield mui-textfield--float-label">
              <input type="email" id="auth-email" required>
              <label>Email</label>
            </div>
            <div class="mui-textfield mui-textfield--float-label">
              <input type="password" id="auth-password" required>
              <label>Password</label>
            </div>
          
            <button
            type="submit" 
            class="mui-btn mui-btn--raised mui-btn--primary" id="auth-btn">
            get authorized</button>
          </form>
  `
}


$.authWithEmailAndPassword = function(email, password) {
  const apiKey = 'AIzaSyBEPlldXrc_RGfj02hF8lnIj9f2LsPkTEY'
return fetch(`https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=${apiKey}`,
{
  method: 'POST', 
  body: JSON.stringify({
    email, password,
    returnSecureToken: true
  }),
  headers: {
    'Content-Type': 'application/json'
  }
})
  .then(response => response.json())
  .then(response => response.idToken)
}

$.fetchToken =function(token) {
  if(!token) {
    return Promise.resolve('<p calss="error ">Sorry! You are not authorized.</p>')
  }
  return fetch(`https://my-question-platform-default-rtdb.firebaseio.com/quesions.json?auth=${token}`)
  .then(response => response.json())
  .then(response => {
    if(response && response.error) {
      return '<p calss="error ">Sorry! You are not authorized.</p>'
    }

    return response ? Object.keys(response).map(key=> ({
      ...response[key],
      id: response
    })) : [] 
  })
}