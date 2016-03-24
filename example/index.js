var t = require('tcomb')
var yo = require('yo-yo')
var View = require('../')

var Thing = t.struct({
  name: t.String
})

var view = View({
  type: Thing,
  update: function (value) {
    console.log('value', value)
    yo.update(main, view(value))
  },
  hx: yo
})

var thing = Thing({
  name: 'computer'
})

var main = document.querySelector('main')
yo.update(main, view(thing))
