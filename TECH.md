<h1>
  Architecture Documentation <img align="right" width="300" src="blueprint.jpg">
</h1>

The following is technical documentation for key architectural decisions made in the library.

## Required Conventions

In order to properly maintain the library, the following conventions that MUST be upheld

**File naming and folder structure:**

```bash
├── componentFolderName                               # should exist at the root of /components
│   ├── componentFolderName_{themeName}.module.scss   # theme stylesheets must follow this naming convention
    ├── ComponentFolderName.js                        # the main component of the folder should share the same name
    ├── ComponentFolderNameAddon.js                   # secondary components can exist, but are expected to share the same stylesheet as the main component
```

_Note: further folder nesting has not been tested yet._

**ThemeWrapper usage:**

Every component needs to leverage the ThemeWrapper higher order component in the following way.
See the "ThemeWrapper and Dynamic Imports" section below for more info.

```js
// in: ComponentName.js
import ThemeWrapper from '../../utils/ThemeWrapper'

export const ComponentName = ({ styling, ...rest }) => (
  <div className={styling.container}>
)

export default ThemeWrapper(themeName => `[componentFolderName]/[componentFolderName]_${themeName}.module.scss`)(ComponentName)
```

**Utility function exports:**

```js
// in: stringUtils.js

const manipulationMethod = str => {
  // ...
}

export default {
  manipulationMethod
}

// this is then used in projects via:
// import { stringUtils } from 'react-robits'
// stringUtils.manipulationMethod()
```

## ThemeWrapper and Dynamic Imports

The components in this library leverage Webpack's [Dynamic Import](https://webpack.js.org/guides/code-splitting/#dynamic-imports) to manage SCSS stylesheets. This allows use to have theme specific stylesheets, without having them all bundled together.
TODO:

## Sass Resources Loader and Themes setup

TODO:

## Ejecting Robits and the related Node scripts

TODO:
