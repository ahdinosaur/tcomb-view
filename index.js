const t = require('tcomb')

// until https://github.com/gcanti/tcomb/commit/7ac48a3ab559735ad15cdcfdf9d5b725a70a4688 is published
t.Type = t.Type || t.irreducible('Type', t.isType)

module.exports = View

const defaultViews = require('./views')

function View (options) {
  options = options || {}

  const type = options.type
  if (!t.isType(type)) {
    throw new Error('tcomb-view: `options.type` is a required tcomb type.')
  }

  const kind = type.meta.kind
  const view = type.view || defaultViews[type] || defaultViews[kind] || null
  if (view == null) {
    throw new Error('tcomb-view: cannot find view from type or kind.')
  }

  const layout = options.layout || defaultLayout

  return layout(view(options))
}

function defaultLayout (view) {
  return view
}
