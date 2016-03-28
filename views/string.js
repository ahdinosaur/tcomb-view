const hyperx = require('hyperx')

module.exports = viewString

function viewString (h, { type, value, onUpdate }) {
  const hx = hyperx(h)

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

