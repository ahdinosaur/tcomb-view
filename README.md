# tcomb-view

render a view for tcomb types

**inspired by [`tcomb-form`](https://github.com/gcanti/tcomb-form)**

```shell
npm install --save tcomb-view
```

## usage

### `view = require('tcomb-view')`

### `element = view(h, props)`

- `h`: [`hyperx`](https://github.com/substack/hyperx) compatible module (e.g. [`virtual-dom/createElement`](https://github.com/Matt-Esch/virtual-dom), [`hyperscript`](https://github.com/dominictarr/hyperscript), [`yo.createElement`](https://github.com/maxogden/yo-yo), [`react.createElement`](https://facebook.github.io/react/))
- `props.type`: tcomb type to view
- `props.value`: current value of tcomb type
- `props.onUpdate`: optional `function (value) {}` to call when value is updated
- `props.layout`: optional `function (typeView, props) { return typeView }` which will be called recursively to wrap each type's view function

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
- [x] t.union
- [ ] t.intersection
- [ ] t.func
