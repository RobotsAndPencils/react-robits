import React from 'react'
import PropTypes from 'prop-types'
import Dotdotdot from 'react-dotdotdot'
import Measure from 'react-measure'
import CSSModules from 'react-css-modules'
import styles from './truncate.module.scss'
import ChevronIcon from '../../atoms/icons/ChevronIcon'

class Truncate extends React.Component {
  constructor (props) {
    super(props)
    this.state = {
      isExpanded: false,
      showViewAction: true
    }
  }
  componentWillReceiveProps = (nextProps) => {
    this.setState({
      isExpanded: false
    })
  }
  _setExpandedState = () => {
    this.setState({
      isExpanded: !this.state.isExpanded
    })
  }
  _showViewActionText = ({width}) => {
    const {text, lines} = this.props
    const avgTextPer100px = 15
    const textScale = Math.round(width / 100 * avgTextPer100px * lines)
    this.setState({
      showViewAction: (text.length > textScale)
    })
  }
  _renderMore () {
    const {lessText, text} = this.props
    const {showViewAction} = this.state
    const viewAction = (showViewAction)
      ? <span styleName='truncate-view-action' onClick={this._setExpandedState}>{lessText}<ChevronIcon isFilled width={13} direction='up' fillColor='currentColor'/></span>
      : ''
    return (
      <div>
        <div>
          {text}
        </div>
        {viewAction}
      </div>
    )
  }
  _renderLess () {
    const {lines, text, moreText} = this.props
    const {showViewAction} = this.state
    const viewAction = (showViewAction)
      ? <span styleName='truncate-view-action' onClick={() => { this._setExpandedState(); this.props.onToggle() }}>{moreText}<ChevronIcon isFilled width={13} direction='down' fillColor='currentColor'/></span>
      : ''
    return (
      <div>
        <Dotdotdot clamp={lines}>
          <div>
            {text}
          </div>
        </Dotdotdot>
        {viewAction}
      </div>
    )
  }
  render () {
    const content = (!this.state.isExpanded) ? this._renderLess() : this._renderMore()
    return (
      <Measure onMeasure={this._showViewActionText}>
        <div className={this.props.className}>{content}</div>
      </Measure>
    )
  }
}

Truncate.defaultProps = {
  lines: 3,
  moreText: 'Show more',
  lessText: 'Show less',
  onToggle: () => {}
}

Truncate.propTypes = {
  text: PropTypes.string.isRequired,
  lines: PropTypes.number,
  moreText: PropTypes.string,
  lessText: PropTypes.string,
  onToggle: PropTypes.func,
  className: PropTypes.string
}

export default CSSModules(Truncate, styles)
