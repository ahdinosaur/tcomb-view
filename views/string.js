const hyperx = require('hyperx')

module.exports = viewString

function viewString ({ type, h }) {
  const hx = hyperx(h)

  return function ({ value, onUpdate }) {
    return hx`
      <input type='text'
        value=${value}
        oninput=${onInput}
      />
    `

    function onInput (evt) {
      onUpdate(evt.target.value)
    }
  }
}

