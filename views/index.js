const t = require('tcomb')

module.exports = {
  // built-in types
  [t.String]: require('./string'),
  // kinds
  'irreducible': require('./irreducible'),
  'struct': require('./struct')
}
