const t = require('tcomb')

const H = t.refinement(
  t.Function,
  (fn) => fn.length === 3,
  'HyperscriptCompatibleFunction'
)

// until https://github.com/gcanti/tcomb/commit/7ac48a3ab559735ad15cdcfdf9d5b725a70a4688 is published
t.Type = t.Type || t.irreducible('Type', t.isType)

const Props = t.struct({
  value: t.Any,
  type: t.Type,
  layout: t.maybe(t.Function),
  onUpdate: t.maybe(t.Function)
})

module.exports = t.func([H, Props], t.Any).of(view, true)

const defaultViews = require('./views')

function view (h, props) {
  const type = getType(props.type, props.value)
  const typeView = getViewFromType(type)
  t.assert(!t.Nil.is(typeView), 'cannot find view from type or kind')

  const layout = props.layout || defaultLayout
  const render = layout(typeView, props)

  return render(h, props)
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
