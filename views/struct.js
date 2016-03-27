const hyperx = require('hyperx')
const mapObjectToArray = require('object-map-to-array')

const View = require('../')

module.exports = structView

function structView (options) {
  const { type, h } = options
  const hx = hyperx(h)

  return function ({ value: props, update }) {
    return hx`
      <div className='props'>
        ${mapObjectToArray(type.meta.props, (type, key) => {
          const viewOptions = Object.assign({}, options, { type })
          const view = View(viewOptions)
          const value = props[key]

          return hx`
            <div className='key-value-pair'>
              <div className='key'>
                ${key}
              </div>
              <div className='value'>
                ${view({ value, update: updateFor(key) })}
              </div>
            </div>
          `
        })}
      </div>
    `

    function updateFor (key) {
      return function (patch) {
        update({ [key]: patch })
      }
    }
  }
}