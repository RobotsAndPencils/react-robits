<h1>
  Architecture Documentation <img align="right" width="300" src="https://github.com/RobotsAndPencils/react-robits/raw/master/blueprint.jpg">
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

**Component level ThemeWrapper usage:**

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
// import { stringUtils } from '@robotsandpencils/react-robits'
// stringUtils.manipulationMethod()
```

## ThemeWrapper and Dynamic Imports

The components in this library leverage Webpack's [Dynamic Import](https://webpack.js.org/guides/code-splitting/#dynamic-imports) to manage SCSS stylesheets. This allows use to have theme specific stylesheets, without having them all bundled together.

It also comes with some reported performance gains around code splitting. Haven't tested at scale yet, but I have been able to verify that the inital bundle size decreases, and that newly requested bundles from dynamic imports are delayed until needed and cached (so it only ever requests a component's stylesheet once).

The promised-based import is governed centrally by the `ThemeWrapper.js` higher order component (HOC) for all components, which gives us the advantage of ripping out dynamic imports globally as part of the ejection process, since at that point it's overkill.

The HOC is set up to resolve and pass through a `styling` prop from one of 3 sources, by order of important (trump-power):

- A `themeObj` object prop, that is expected to be a fully realized CSS Module style object. This will be passed directly and dynamic file imports will be "skipped"
- A `themeName` string prop, that specifies the string to use to build the file path from a string literal template provided by the component (see the "Component level ThemeWrapper usage" section above for the string literal template and how the `styling` prop is leveraged)
- A `REACT_APP_ROBITS_THEME` environment variable, which is a string same as the previous bullet. This is the final fall back / default

_Nuances:_

- Since the stylesheets are dynamic loaded as they are needed, this can impact the order in which the `<style>` tags show up in the document, which effects how CSS is applied to elements. So in the case where you provide custom classes via props to Robits to tweak styling at the instance level, if those those CSS rules are loaded statically by your application, its `<style>` tag would preceed that of the targeted Robit that ultimately gets dynamically referenced - would could lead to your instance level customization getting trumped by the Robits CSS. And since that order is dynamic and session dependent, it may be inconsistent. Specificity levels and `!important` will be your saviors here.
- Note that with `create-react-app`, the presence of `export REACT_APP_ROBITS_THEME=something` in a served up `.env` file will automagically be accessible from within the React app code, by sheer naming convention. If not using `create-react-app`, you would need to wire up your environment variables manually through Webpack

## Sass Resources Loader and Themes setup

This library is set up with [CSS Modules](https://github.com/css-modules/css-modules) and leverage [Sass Resources Loader](https://github.com/shakacode/sass-resources-loader), which is a nice little tool that automatically `@imports` each .scss file found at the targeted location into any SCSS file matching the Webpack rule (excluding the resource files themselves), which you can see configured in `./.storybook/main.js`. This just saves some typing and helps centralize shared tokens. These configurations should be mirrored at the project level, see "Using Robits in Your Project" on the [README](https://github.com/RobotsAndPencils/react-robits/raw/master/README.md)

Couple things to note:

- The resources are included in the order they are found in the directory, and since order matters with CSS, we're using a number prefix naming convention to bend it to our will
- Since these files are injected into essentially every other .scss file, the intent is for them to only contain SASS variables, mixins, or functions. They can not contain any actuall CSS rule sets, or in combination with the CSS Modules setup, they will get duplicated in EVERY file (no good).

### Themes

All theme SCSS is located in `./src/core/styles/...` with the following breakouts:

- `/tokens/`: tokens that are shared across all themes, or are theme-agnostic
- `/themes/[themeName]`: the theme specific styles. The name of the folder is the identifying string used as common thread across the implementation
- `/themes/[themeName]/global.module.scss`: every theme should have a global file that sets up global rules like fonts, base HTML normalizations (body, anchors, headers, etc.), and imports shared rules. Everything in this file and what it imports should work from CSS Modules' `:global` mindset. It is recommended to then, at the project level, set up a global SCSS file that imports the theme globals via `@import '../../node_modules/@robotsandpencils/react-robits/src/core/styles/themes/[themeName]/global.module.scss';` and then makes any addendums needed for the project.
- `/themes/[themeName]/tokens.module.scss`: it is recommended to break out theme-specific token as their own file, alongside (and imported into) the global file. This is the extension or overriders of the cross-theme tokens

Beyond that, to date we've tried to bubble SASS variables to the top of files, and name partials with a `_` prefix. Each component is the expected to have 1 stylesheet file per theme, which imports the theme-specific tokens at the top like `@import '../../styles/themes/[themeName]/tokens';` (cross theme tokens will be automatically injected with Sass Resources Loader).

## Ejecting Robits

Below are the Node scripts and a summary of what they do:

- `eject.js`: Provides a series of prompts for the developer to answer that guides the ejection process. It then runs each of the below scripts to carry it out. After each has been executed, it runs `npm uninstall @robotsandpencils/react-robits -D -S && npm install`, which removes the package from node modules, and reinstalls fresh in order to pick up any changes resulting from the `merge-dependencies.js` script
- `merge-dependencies.js`: Merge the package.json files of the project and the `react-robits` library, so that all Robit dependencies are migrated to the project for the next `npm install`. We defer to the project here wherever possible, and any package version conflicts have to be manually resolved, so we don’t accidentally break something the project relies on.
- `pluck-components.js`: Copy all the Robit files (components, utilities, styles, constants, etc.) out from the library and into a project directory defined by the developer
- `update-references.js`: Update references in all project level Javascript files that point to the `react-robits` package, and redirect them to the new location of that file. So change `import { Button } from ‘@robotsandpencils/react-robits'` to `import Button from ‘…[relative path to project file location]…'`
  - It will optionally prune (based on the answer to the initial prompt) the copied over components to only what the project references in above step. So if the project doesn’t use the Avatar component, delete it. While you might not directly reference a component, some other Robit might rely on it, so it builds a Robits inter-dependent tree to map out which components to “save from the shredder"
  - Scopes the theme stylesheets to the theme name the developer specified in the initial prompt, which deletes out all other unneeded theme files
  - Optionally breaks reliance on the ThemeWrapper higher order component. Since this HOC was only needed to dynamically deliver a theme, and at this point the theme is static, it’s not technically needed. Breaking reliance here updates each exported Robit file to instead directly import the needed theme stylesheet, and changes the export from something like `export default ThemeWrapper(...)(Button)` to `export default Button`
- `erase-footprint.js`: Erase the Robits footprint by removing any reference to it in the project-level package.json

_Nuances:_

- The success of the reference updates within your project files depends on the format of the import statements:

```
import { Button, Avatar, FormInput, Badge } from '@robotsandpencils/react-robits' // linear format works
```

```
import {
  Button,
  Avatar,
  FormInput,
  Badge
} from '@robotsandpencils/react-robits' // one-per-line format works
```

```
import {
  Button, Avatar,
  FormInput, Badge
} from '@robotsandpencils/react-robits' // the combination is untested and might break
```
