var t = require('tcomb')
var map = require('lodash/map')

module.exports = View

function View (options) {
  options = options || {}

  var type = options.type
  if (!t.isType(type)) {
    throw new Error('tcomb-view: `options.type` is a required tcomb type.')
  }

  var kind = type.meta.kind
  var view = type.view || (t[kind] != null ? t[kind].view : null)
  if (view == null) {
    throw new Error('tcomb-view: cannot find view from type or kind.')
  }

  var layout = options.layout || defaultLayout

  return layout(view(options))
}

function defaultLayout (view) {
  return view
}

t.String.view = function viewString (options) {
  return function (value) {
    return options.hx`
      <input type='text'
        value=${value}
        oninput=${onInput}
      />
    `

    function onInput (evt) {
      options.update(evt.target.value)
    }
  }
}

t.irreducible.view = function irreducibleView (options) {
  return function (value) {
    return options.hx`
      <div className='value'>
        ${value}
      </div>
    `
  }
}

t.struct.view = function structView (options) {
  return function (props) {
    return options.hx`
      <div className='props'>
        ${map(options.type.meta.props, (type, key) => {
          var viewOptions = Object.assign({}, options, {
            type, update: updateFor(key)
          })
          var view = View(viewOptions)
          var value = props[key]

          return options.hx`
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
      return function (value) {
        console.log('key', key, 'value', value, props)
        var nextValue = options.type.update(props, {
          [key]: {
            $set: value
          }
        })
        options.update(nextValue)
      }
    }
  }
}
