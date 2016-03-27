const hyperx = require('hyperx')

module.exports = viewString

function viewString ({ type, h }) {
  const hx = hyperx(h)

  return function ({ value, update }) {
    return hx`
      <input type='text'
        value=${value}
        oninput=${onInput}
      />
    `

    function onInput (evt) {
      update({ $set: evt.target.value })
    }
  }
}

