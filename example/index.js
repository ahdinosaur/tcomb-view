const t = require('tcomb-validation')
const yo = require('yo-yo')
const view = require('../')

const Thing = t.struct({
  name: t.String
})

const thing = Thing({
  name: 'computer'
})

const main = document.querySelector('main')

updateView(main, thing)

function updateView (element, value) {
  console.log('value', value)

  yo.update(element, view(yo.createElement, {
    type: Thing,
    value: value,
    onUpdate: updateView.bind(null, element)
  }))
}
