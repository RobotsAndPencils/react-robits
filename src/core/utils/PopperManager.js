import React, { useState, useEffect } from 'react'
import ReactDOM from 'react-dom'
import PropTypes from 'prop-types'
import { Popper } from 'react-popper'
import classNames from 'classnames'
import domUtils from './domUtils'

export const PopperManager = ({
  arrowClassName,
  boundariesElement = 'scrollParent',
  children,
  className,
  container = 'body',
  fallbackPlacement = 'flip',
  flip = true,
  modifiers = Object.create(null),
  noArrow,
  open = false,
  offset = 0,
  placementPrefix,
  styling,
  tag,
  target,
  ...rest
}) => {
  const [placement, setPlacement] = useState(null)
  const _element = null
  let _targetNode = null

  useEffect(() => {
    if (_element && _element.childNodes && _element.childNodes[0] && _element.childNodes[0].focus) {
      _element.childNodes[0].focus()
    }
  }, [_element])

  const setTargetNode = node => {
    _targetNode = node
  }

  const getReferenceElement = () => {
    return _targetNode
  }

  const getContainerNode = () => {
    return domUtils.getTarget(container)
  }

  const handlePlacementChange = data => {
    if (placement !== data.placement) {
      setPlacement(data.placement)
    }
    return data
  }

  const renderChildren = () => {
    const _placement = placement || rest.placement || 'auto'

    const _className = classNames(
      className,
      placementPrefix ? styling[`${placementPrefix}-${_placement}`] : _placement
    )

    const _arrowClassName = classNames('arrow', arrowClassName)

    const _modifiers = {
      offset: {
        offset
      },
      flip: {
        enabled: flip,
        behavior: fallbackPlacement
      },
      preventOverflow: {
        boundariesElement
      },
      update: {
        enabled: true,
        order: 950,
        fn: handlePlacementChange
      },
      ...modifiers
    }

    return (
      <Popper
        referenceElement={getReferenceElement()}
        modifiers={_modifiers}
        placement={_placement}
        {...rest}>
        {({ ref, style, placement, arrowProps }) => (
          <div ref={ref} className={_className} style={style} data-placement={placement}>
            {children}
            {!noArrow && (
              <div ref={arrowProps.ref} style={arrowProps.style} className={_arrowClassName} />
            )}
          </div>
        )}
      </Popper>
    )
  }

  setTargetNode(domUtils.getTarget(target))

  if (!open) {
    return null
  }

  if (container === 'inline') {
    return renderChildren()
  }

  const containerNode = getContainerNode()

  return ReactDOM.createPortal(<div>{renderChildren()}</div>, containerNode)
}

PopperManager.propTypes = {
  /**
   * The target.
   */
  target: PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.func,
    PropTypes.element,
    PropTypes.shape({ current: PropTypes.any })
  ]).isRequired,

  /**
   * The container.
   */
  container: PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.func,
    PropTypes.element,
    PropTypes.shape({ current: PropTypes.any })
  ]),

  /**
   * The children.
   */
  children: PropTypes.node.isRequired,

  /**
   * Whether the Popper is open, or not.
   */
  open: PropTypes.bool,

  /**
   * Whether the Popper should flip, or not.
   */
  flip: PropTypes.bool,

  /**
   * The Popper offset.
   */
  offset: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),

  /**
   * The Popper fallback placement.
   */
  fallbackPlacement: PropTypes.oneOfType([PropTypes.string, PropTypes.array]),

  /**
   * The Popper placement prefix.
   */
  placementPrefix: PropTypes.string,

  /**
   * The Popper's arrow className.
   */
  arrowClassName: PropTypes.string,

  /**
   * Whether to hide the arrow, or not.
   */
  noArrow: PropTypes.bool,

  /**
   * The Popper class name.
   */
  className: PropTypes.string,

  /**
   * The component tag.
   */
  tag: PropTypes.string,

  /**
   * The modifiers object.
   */
  modifiers: PropTypes.object,

  /**
   * The boundaries element for the Popper instance.
   */
  boundariesElement: PropTypes.oneOfType([PropTypes.string, PropTypes.element])
}

export default PopperManager
