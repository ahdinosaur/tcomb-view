const view = require('../')
const { Props } = require('../types')

module.exports = viewMaybe

function viewMaybe (h, props) {
  return view(h, Props.update(props, {
    type: { $set: props.type.meta.type }
  }))
}
