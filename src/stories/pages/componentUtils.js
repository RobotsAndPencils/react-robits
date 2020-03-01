export const getComponentDocumentation = (Component) => {
  const componentPropDefinitions = Component.__docgenInfo.props
  return {
    componentName: Component.__docgenInfo.displayName,
    componentPropDefinitions,
    numberOfDefinedProps: Object.keys(componentPropDefinitions).length,
    // numberOfGivenProps: Object.keys(Component.props).length
  }
}

export const getComponentMarkdown = (Component) => {
  const { componentName, componentPropDefinitions } = getComponentDocumentation(Component)
  return `
  <${componentName}
    ${
    Object.entries(componentPropDefinitions).map(([key, value]) => {
      return `${key}={${value.type ? value.type.name : ''}}`
    }).join(`
    `)
  } />
  `
}