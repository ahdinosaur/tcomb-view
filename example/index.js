const t = require('tcomb-validation')
const yo = require('yo-yo')
const View = require('../')
const setIn = require('set-in')

const Thing = t.struct({
  name: t.String
})

const thing = Thing({
  name: 'computer'
})

const view = View({
  type: Thing,
  hx: yo
})

const main = document.querySelector('main')
updateView(main, thing)

function updateView (element, state) {
  yo.update(element, view({
    value: state,
    update: function (patch) {
      const nextState = Thing.update(state, patch)
      updateView(element, nextState)
    }
  }))
}
