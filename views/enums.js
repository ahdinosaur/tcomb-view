const hyperx = require('hyperx')
const map = require('lodash/map')
const findIndex = require('lodash/findIndex')

module.exports = viewEnums

function viewEnums (h, { type, key, value, onUpdate }) {
  const hx = hyperx(h)

  const selectedIndex = findIndex(type.meta.map, (enumValue, enumKey) => {
    return enumKey === value
  })

  return hx`
    <select
      name=${key}
      selectedIndex=${selectedIndex}
      onchange=${update}
    >
      ${map(type.meta.map, (enumValue, enumKey) => {
        return hx`
          <option value=${enumKey}>
            ${enumValue}
          </option>
        `
      })}
    </select>
  `

  function update (evt) {
    onUpdate(evt.target.value)
  }
}
