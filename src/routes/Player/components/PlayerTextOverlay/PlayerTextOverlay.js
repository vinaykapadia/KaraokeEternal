import PropTypes from 'prop-types'
import React from 'react'
import ColorCycle from './ColorCycle'
import UpNow from './UpNow'
import Fire from './Fire'
import './PlayerTextOverlay.css'

const Components = {
  ColorCycle,
  Fire,
  UpNow,
}

class PlayerTextOverlay extends React.Component {
  static propTypes = {
    width: PropTypes.number.isRequired,
    height: PropTypes.number.isRequired,
  }

  state = {
    component: null,
    text: '',
  }

  shouldComponentUpdate (nextProps, nextState) {
    // @todo: this is a hacky way of preventing
    // children from updating and re-triggering
    // any of their animations
    return this.shouldUpdate === true
  }

  title = (text) => {
    this.shouldUpdate = true
    this.setState({
      component: 'ColorCycle',
      text,
    })
  }

  upNow = (name) => {
    this.shouldUpdate = true
    this.setState({
      component: 'UpNow',
      text: name,
    }, () => { this.shouldUpdate = false })
  }

  error = () => {
    this.shouldUpdate = true
    this.setState({
      component: 'Fire',
      text: 'CRAP',
    })
  }

  render () {
    if (this.state.component === null) return null

    const { width, height } = this.props
    const Component = Components[this.state.component]

    return (
      <div style={{ width, height }} styleName='container'>
        <Component text={this.state.text} />
      </div>

    )
  }
}

export default PlayerTextOverlay
