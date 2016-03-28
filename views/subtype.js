const view = require('../')
const { Props } = require('../types')

module.exports = viewSubtype

function viewSubtype (h, props) {
  return view(h, Props.update(props, {
    type: { $set: props.type.meta.type }
  }))
}
