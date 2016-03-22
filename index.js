var React = require('react')
var h = require('r-dom')
var t = require('tcomb-form')
var ColorType = require('t-color')

module.exports = React.createClass({
  displayName: "PixelPicker",

  getInitialState () {
    return {
      value: ColorType({
        type: 'rgb',
        red: 255,
        green: 0,
        blue: 0
      })
    }
  },

  onSubmit (evt) {
    evt.preventDefault()
    var value = this.refs.form.getValue()
    this.setState({ value: ColorType(value) })
  },

  onChange (value) {
    const prevValue = this.state.value
    if (value.type !== prevValue.type) {
      const converted = prevValue.convert(value.type)
      this.setState({ value: converted })
    }
  },

  componentDidMount () {
    this.styleColor(this.state.value)
  },

  componentDidUpdate (props, state) {
    this.styleColor(this.state.value)
  },

  render() {
    return h('form', { onSubmit: this.onSubmit }, [
      h(t.form.Form, {
        ref: 'form',
        type: ColorType,
        value: this.state.value,
        onChange: this.onChange
      }),
      h('div', { className: 'form-group' }, [
        h('button', { type: 'submit', className: 'btn btn-primary' }, 'Save')
      ])
    ])
  },

  styleColor (color) {
    const rgb = color.convert('rgb')
    const colorString = [
      'rgb(',
      Math.round(rgb.red) + ',',
      Math.round(rgb.green) + ',',
      Math.round(rgb.blue),
      ')'
    ].join('')
    document.body.style.backgroundColor = colorString
  }
})
