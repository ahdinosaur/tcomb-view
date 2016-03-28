const hyperx = require('hyperx')

module.exports = irreducibleView

function irreducibleView (h, { type, value }) {
  const hx = hyperx(h)

  return hx`
    <div className='value'>
      ${value}
    </div>
  `
}
