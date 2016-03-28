const hyperx = require('hyperx')
const map = require('lodash/map')

const view = require('../')

module.exports = structView

function structView (h, { type, value: props, onUpdate }) {
  const hx = hyperx(h)

  return hx`
    <div className='props'>
      ${map(type.meta.props, (type, key) => {
        const value = props[key]

        return hx`
          <div className='key-value-pair'>
            <div className='key'>
              ${key}
            </div>
            <div className='value'>
              ${view(h, { type, key, value, onUpdate: updateFor(key) })}
            </div>
          </div>
        `
      })}
    </div>
  `

  function updateFor (key) {
    return function (value) {
      const patch = { [key]: { $set: value } }
      onUpdate(type.update(props, patch))
    }
  }
}
