const t = require('tcomb')
const { H, Props, View } = require('./types')

module.exports = View.of(view, true)

// must be below module.exports due to cyclic require
const defaultViews = require('./views')

function view (h, props) {
  const type = getType(props.type, props.value)
  const typeView = getViewFromType(type)
  t.assert(!t.Nil.is(typeView), 'cannot find view from type or kind')

  const layout = props.layout || defaultLayout
  const render = layout(typeView, props)

  return render(h, Props.update(props, {
    type: { $set: type }
  }))
}

function defaultLayout (typeView, props) {
  return typeView
}

// https://github.com/gcanti/tcomb-form/commit/84b91659ef6f7e56da67063ae3827006169ff9f0
function getType (type, value) {
  if (type.meta.kind === 'union') {
    return type.dispatch(value)
  }
  return type
}

function getViewFromType (type) {
  const kind = type.meta.kind
  const view = type.view || defaultViews[type] || defaultViews[kind] || null
  return view
}
