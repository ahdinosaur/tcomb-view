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

const View = t.func([H, Props], t.Any)

module.exports = { H, Props, View }
