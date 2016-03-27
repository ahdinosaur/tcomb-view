const t = require('tcomb-validation')
const yo = require('yo-yo')
const View = require('../')

const Thing = t.struct({
  name: t.String
})

const thing = Thing({
  name: 'computer'
})

const view = View({
  type: Thing,
  h: yo.createElement
})

const main = document.querySelector('main')

updateView(main, thing)

function updateView (element, value) {
  console.log('value', value)

  yo.update(element, view({
    value: value,
    onUpdate: updateView.bind(null, element)
  }))
}
