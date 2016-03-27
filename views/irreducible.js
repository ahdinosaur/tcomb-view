const hyperx = require('hyperx')

module.exports = irreducibleView

function irreducibleView ({ type, h }) {
  const hx = hyperx(h)

  return function ({ value }) {
    return hx`
      <div className='value'>
        ${value}
      </div>
    `
  }
}
