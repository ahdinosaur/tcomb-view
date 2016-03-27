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
  update: function (patch) {
    console.log('patch', patch)
    const validation = t.validate(patch.value, patch.type, {
      path: patch.path
    })
    console.log('validation', validation)
    const spec = patchToSpec(patch)
    console.log('spec', spec)
    
    const nextValue = patch.type.update(thing, spec)
    console.log('nextValue', nextValue)
    yo.update(main, view(nextValue))
  },
  hx: yo
})

const main = document.querySelector('main')
yo.update(main, view(thing))

function patchToSpec (patch) {
  switch (patch.kind) {
    case 'change':
      return setIn({}, patch.path, {
        $set: patch.value
      })
  }
}
