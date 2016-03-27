const t = require('tcomb')
const mapObjectToArray = require('object-map-to-array')

// until https://github.com/gcanti/tcomb/commit/7ac48a3ab559735ad15cdcfdf9d5b725a70a4688 is published
t.Type = t.Type || t.irreducible('Type', t.isType)

module.exports = View

function View (options) {
  options = options || {}

  const type = options.type
  if (!t.isType(type)) {
    throw new Error('tcomb-view: `options.type` is a required tcomb type.')
  }

  const kind = type.meta.kind
  const view = type.view || (t[kind] != null ? t[kind].view : null)
  if (view == null) {
    throw new Error('tcomb-view: cannot find view from type or kind.')
  }

  const layout = options.layout || defaultLayout

  return layout(view(
    Object.assign({}, options, {
      update: function (patch) {
        options.update(Patch(patch))
      }
    })
  ))
}

function defaultLayout (view) {
  return view
}

const Patch = t.struct({
  path: t.list(t.union([t.String, t.Number], 'Key'), 'Keys'),
  kind: t.enums.of(['change', 'add', 'remove', 'moveUp', 'moveDown']),
  type: t.Type,
  value: t.Any
}, 'Patch')

t.String.view = function viewString ({ type, update, hx }) {
  return function (value) {
    return hx`
      <input type='text'
        value=${value}
        oninput=${onInput}
      />
    `

    function onInput (evt) {
      update({
        path: [],
        kind: 'change',
        type: type,
        value: evt.target.value
      })
    }
  }
}

t.irreducible.view = function irreducibleView ({ type, update, hx }) {
  return function (value) {
    return hx`
      <div className='value'>
        ${value}
      </div>
    `
  }
}

t.struct.view = function structView (options) {
  const { type, update, hx } = options

  return function (props) {
    return hx`
      <div className='props'>
        ${mapObjectToArray(type.meta.props, (type, key) => {
          const viewOptions = Object.assign({}, options, {
            type, update: updateFor(key)
          })
          const view = View(viewOptions)
          const value = props[key]

          return hx`
            <div className='key-value-pair'>
              <div className='key'>
                ${key}
              </div>
              <div className='value'>
                ${view(value) }
              </div>
            </div>
          `
        })}
      </div>
    `

    function updateFor (key) {
      return function (patch) {
        update({
          path: [key].concat(patch.path),
          kind: patch.kind,
          type: type,
          value: patch.value
        })
      }
    }
  }
}
