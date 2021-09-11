$.inputValid = function (value) {
  return value.length >= 10
}

$.createModal = function (title, content) {
  const modal = document.createElement('div')
  modal.classList.add('modal')
  modal.innerHTML = `
  <h1 class="modal-title">${title}</h1>
  <div class="modal-content">${content}</div>
  `
  mui.overlay('on', modal)
}
