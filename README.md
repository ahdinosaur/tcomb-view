# tcomb-view

render a view for tcomb types

```shell
npm install --save tcomb-view
```

## usage

### `View = require('tcomb-view')`

### `view = View(options)`

- `options.type`: tcomb type to view
- `options.h`: [`hyperx`](https://github.com/substack/hyperx) compatible module (e.g. [`virtual-dom/createElement`](https://github.com/Matt-Esch/virtual-dom), [`hyperscript`](https://github.com/dominictarr/hyperscript), [`yo.createElement`](https://github.com/maxogden/yo-yo), [`react.createElement`](https://facebook.github.io/react/))
- `options.layout`: `function (view) {}` which will be called recursively to wrap each type's view function

### `element = view(props)`

- `props.value`: value of tcomb type
- `props.onUpdate`: `function (value) {}` to call when value is updated

## TODO

support built-in tcomb types

- [x] t.String: strings
- [ ] t.Number: numbers
- [ ] t.Boolean: booleans
- [ ] t.Array: arrays
- [ ] t.Object: plain objects
- [ ] t.Function: functions
- [ ] t.Error: errors
- [ ] t.RegExp: regular expressions
- [ ] t.Date: dates
- [ ] t.Nil: null or undefined
- [ ] t.Any: any value

support built-in tcomb kinds

- [x] t.irreducible
- [ ] t.refinement
- [ ] t.enums
- [ ] t.maybe
- [x] t.struct
- [ ] t.tuple
- [ ] t.list
- [ ] t.dict
- [ ] t.union
- [ ] t.intersection
- [ ] t.func
