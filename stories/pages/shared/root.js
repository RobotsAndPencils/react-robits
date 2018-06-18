/********************************************************************************
While in the /lib folder, this component is only a guide for the project's
root-level wrapper, and should only be used as a reference, not imported directly
********************************************************************************/

import React from 'react'
import PropTypes from 'prop-types'
import globalStyles from '../../../lib/root.module.scss'

import { Provider } from 'react-redux'
import { createStore, combineReducers } from 'redux'
import { reducer as formReducer } from 'redux-form'

import FlexContainer from '../../../lib/molecules/layout/FlexContainer'

const rootReducer = combineReducers({
  form: formReducer
})

const store = createStore(rootReducer, window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__())

class RootWrapper extends React.Component {
  render () {    
    return (
      <Provider store={store}>
        <FlexContainer>
          {this.props.children}
        </FlexContainer>
      </Provider>
    )
  }
}

RootWrapper.propTypes = {
  children: PropTypes.any.isRequired
}

export default RootWrapper
