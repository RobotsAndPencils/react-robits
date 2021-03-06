<h1>
  React Robits <img align="right" width="300" src="https://github.com/RobotsAndPencils/react-robits/raw/master/robits.png">
</h1>
A library of sharable React components, by the Frontend Team at Robots & Pencils in an effort to challenge ourselves to think reusable/themeable across client projects, so we can bootstrap development and build off each other.

###### Broken up into two main concepts:

- Core: atomic level components in which a standardized setup can support a majority of the possible use cases
- Periphery: components that are either harder to standarize or have stronger opinions baked in. These are things that may have external dependencies (plugins), or might require different layout structures, making it hard to mandate any one setup cross client or cross use case. So there may end up with multiple variations over time (e.g. - one Upload component built on Dropzone, one on Uppy). For these reasons, these components don't "ship" with the deployed package but are present in the Storybook and accessible directly for manual benefit

## Areas of Focus

Examples of "Core" components:

- Form components
- Buttons
- Generic Modals
- Status indicators (progress bars, loaders)
- UI Elements (badges, tags, pills)
- Generic Cards
- Incremental content (dropdowns, popovers, tooltips)

Examples of "Periphery" components:

- Sliders/Carousels
- Item Tiles
- Video?
- Maps?
- Data Tables?
- Masonry?

###### Component Aspirations

Think reusable. Components should be built with as much abstraction as possible, leaning on optional component properties to govern the rendered output.

Think cross-client/cross-use-case. Try to support as many permutations of the component as possible, which means thinking outside the box in which you're building it. How might others want to leverage this component?

Think customizable. Every component should have an "unstyled" stylesheet that normalizes it and allows for full control. But even within your own theme stylesheet, it's helpful to put major aesthetic tokens as top level sass variables, so that if/when people eject-to-tweak, it quickens their ability to toggle things.

## Directory Structure

```bash
├── src
│   ├── core                    # the library of core files that will be importable into a project
│       ├── components          # core shared components
│       ├── constants           # core shared constants
│       ├── utils               # core shared utility functions
│       ├── styles              # core shared stylesheets
│           ├── tokens          # style tokens that are shared across themes (sass variables and mixins)
│           ├── themes          # the various themes that can be leveraged
│               ├── unstyled    # the unstyled theme provides (virtually) no CSS, to make it easier to customize
│   ├── periphery               # components outside the core standardized set
│   ├── stories                 # Storybook story files
│       ├── pages               # Supporting files for stories

```

## Contributing

We'll lean on Github Issues and PR's for tracking and managing problems and enhancements, but the higher level branching/merging/publish strategy is still TBD. Reach out to David Fagan if you want to get involved.

###### In order to properly maintain the library, there are a set of conventions that MUST be upheld. Read the [Tech Doc](https://github.com/RobotsAndPencils/react-robits/blob/master/TECH.md) to learn more

#### Available Scripts

- `npm run storybook`: runs the Storybook for easy preview, play, and investigation of components
- `npm run build-storybook`: builds a distributable version of Storybook for publishing
- `npm run lint`: runs prettier-standard linting
- `npm run format`: runs the prettier formatting

## Using Robits in Your Project

To pull the library into your project, run the following command line in the root of your project directory:

```
npm i --save @robotsandpencils/react-robits
```

_Note_: this package will need reinstalled to grab updates. To do so, it's recommended to set up a shortcut script in your project's `package.json` for ease-of-use:

```
  "install-robits": "npm i --save @robotsandpencils/react-robits"
```

### Webpack Config

There are a few key pieces to include in your project's webpack config.

1. Point a Sass Resources Loader configuration to the files contained within the package's `./src/core/styles/tokens` directory and `./src/core/styles/themes/[themeName]/tokens.scss` file. Order matters here, take care to be intentional with the ordering of the pointers in the array

```js
{
    loader: 'sass-resources-loader',
    options: {
        resources: [
          ...project tokens...
          `${path.resolve(
            __dirname,
            'node_modules/@robotsandpencils/react-robits/src/core/styles/tokens'
          )}/**/*.scss`,
          path.resolve(
            __dirname,
            'node_modules/@robotsandpencils/react-robits/src/core/styles/themes/talentPortal/tokens.scss'
          )
          ...additional project overrides as needed...
        ] // the ordering here is important, just like normal SCSS
    }
}
```

_Note: project level mixins, if they have the exact same name, will override design system level mixins. This is both something to be careful about and a lever you can pull to create project level customizations_

2. You will also then need to make sure your project level webpack properly tranpiles the components being pulled in. Many external libraries come pre-transpiled, but for this, the approach is to defer to project level babel configurations.

So to make sure `babel` runs against the components being imported from React Robits, you'll need to augment or add loader configurations to your webpack like either of the following:

```
{
  test: /\.(js|jsx)$/,
  include: `${path.resolve(__dirname, 'node_modules/@robotsandpencils/react-robits')}`,
  loader: 'babel-loader'
}
```

or

```
{
  test: /\.(js|jsx)$/,
  exclude: /node_modules\/(?!@robotsandpencils/react-robits)/,
  use: 'babel-loader'
}
```

### Theme Config

Each component then accepts either a `themeName` string that designates which stylesheet to use, or a `themeObj` that is already precompiled per CSS Modules.

You can then either specify those props for each instance:

```
<Button themeName='unstyled'>
```

Or set up an environment variable in your project to use as the default. This allows you to not have to specify a `themeName` or `themeObj` property for each component. The library is set up to digest the following variable name:

```
export REACT_APP_ROBITS_THEME=unstyled
```

_Note: you can use a combination of the 2, to set up a default and override it at the instance level_

## Ejecting Robits

Ejecting Robits is lever designed to either a) give you full control over the code for customizations, and/or b) decouple from the library to elimintate the dependency. This could be done at the very beginning of the project, as an initial bootstrap, or at the final stage of a project, after having been wired in for the entirety of development, to avoid giving the magic trick away to a client.

The net result is that the files from this library will be copied over to your project, effectively transferring ownership, and erase any notion of the `react-robits` as a dependent package.

To do this...

1. First, you need to manually bypass the package schema bug [logged here](https://github.com/RobotsAndPencils/react-robits/issues/26)

2. Second, run the following script from the root of your project, and follow the prompts. It will cycle through a set of Node scripts to break the ball-and-chain:

```
node ./node_modules/@robotsandpencils/react-robits/ejectionScripts/eject
```

For more information on what's happening under the hood with those scripts, see the [Tech Doc](https://github.com/RobotsAndPencils/react-robits/blob/master/TECH.md)

#### Dependency Collisions

The ejection might fail due to an unmanageable semver collision of dependencies between Robits and your project. Because we don't want to break anything within your current project, but at the same time might require a certain dependency version for the Robit in question to work, we therefore don't attempt to automate the decision on who wins. Also, at the moment, there is not a great way for us to interrupt and prompt you for a resolution in real time - nor would a split time decision be advisable.

In light of this, what is recommended is to try each of the conflicting versions offline, within your project and Robits to align on a version that works for both. Once a version is identified, you will need to manually update the appropriate `package.json` file (either within your project of the `react-robits` project within `node_modules`) and rerun the export script.

Hopefully, once NPM supports the new `overrides` spec (equivalent of yarn's `resolutions`) there will be a more graceful way to address this.

**Note:** if a version upgrade works within Robits, please consider opening a PR for it.

#### After Ejection

After successfully ejecting, you may need to manually massage the integration:

- If a filename collision was detected, the ejection process will add a `_fromRobits` suffix to the file copied in. This should be refactored away
- Depending on the existing file structure of the parent project, and the destination into which you ejected, you may need to relocate some files
- If using `sass-resources-loader`, you may have to update the referenced webpack pointer to include the new inbound Robits tokens (if not already aligned), especially if using robits prior to ejecting.
- If you already had existing styles set up, you may still need to groom the inbound CSS from Robits to dedupe rules, side step collisions, and consolidate files

## Storybook Deployment

This is currently deployed to Heroku on a free tier. To deploy from your terminal, you'll need the [Heroku CLI](https://devcenter.heroku.com/articles/heroku-cli#download-and-install) installed and logged in to your Heroku account.

Add Heroku git remote if you haven't already:

```
$ heroku git:remote --app react-robits
$ git remote -v # List available remotes
```

First, from the root of your project folder, run `npm run build-storybook` to compile the distributable package from the branch you wish to deploy.

Then, run one of the following commands...

If you are deploying the `master` branch, run:

```
$ git push heroku master
```

Deploy changes from a branch besides `master`, such as `testbranch`:

```
$ git push heroku testbranch:master
```

Launch Heroku app in browser:

```
$ heroku open --app react-robits
```

Or visit https://react-robits.herokuapp.com

## Media

Check out the [Blog Post](https://robotsandpencils.blogin.co/single-post.php?id=95857) for a detailed article of the thought process and journey to this repo
