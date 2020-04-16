<h1>
  React Robits <img align="right" width="300" src="robits.png">
</h1>
A library of sharable React components, by the Frontend Team at Robots & Pencils in an effort to challenge ourselves to think reusable/themeable across client projects, so we can bootstrap development and save time.

###### Broken up into two main concepts:

- Core: atomic level components in which a standardized setup can support a majority of the possible use cases
- Periphery: components that are either harder to standarize or have stronger opinions baked in. These are things that may have external dependencies (plugins), or might require different layout structures, making it hard to mandate any one setup cross client or cross use case. So there may end up with multiple variations over time (e.g. - one Upload component built on Dropzone, one on Uppy). For these reasons, these components don't "ship" with the deployed package but are present in the Storybook and accessible directly for manual benefit

## Areas of Focus

Core:

- Form components
- Buttons
- Generic Modals
- Status indicators (progress bars, loaders)
- UI Elements (badges, tags, pills)
- Generic Cards
- Incremental content (dropdowns, popovers, tooltips)

Periphery:

- Sliders/Carousels
- Item Tiles
- Video?
- Maps?
- Data Tables?
- Masonry?

## Directory Structure

```bash
├── src
│   ├── core                     # the library of files that will be importable into a project
│       ├── components          # core shared components
│       ├── constants           # core shared constants
│       ├── utils               # core shared utility functions
│       ├── styles              # core shared components
│           ├── tokens          # core shared style tokens (sass variables and mixins)
│           ├── themes          # the various themes that can be leveraged
│               ├── unstyled    # the unstyled theme provides no CSS, to make it easier to customize
│   ├── stories                 # Storybook story files
│       ├── pages               # Supporting files for stories

```

## New Project Setup

Download this repo as an npm package into your project:

TBD

## Integrating the Library into Your Project

To pull the library into your project, run the following command line in the root of your project directory:

```
npm install --save git+https://github.com/RobotsAndPencils/react-robits.git#[branch-name-of-desired-theme]
```

_Note_: this package will need reinstalled to grab updates. To do so, it's recommended to set up a shortcut script in your project's `package.json` for ease-of-use:

```
  "install-robits": "npm i --save git+https://github.com/RobotsAndPencils/react-robits.git#[branch-name-of-desired-theme]"
```

There are a few key pieces to include in your project's webpack config.

- Point a Sass Resources Loader configuration to the files contained within the design system package's `./shared/styles` directory. Order matters here, so make sure to include the design system directory before the project directory, if it also relies on this tool

```
{
    loader: 'sass-resources-loader',
    options: {
        resources: ['./node_modules/react-robits/src/lib/styles/tokens',
        ...project directory as needed...] // project overrides design system on overlaps
    }
}
```

_Note_: project level mixins, if they have the exact same name, will override design system level mixins. This is both something to be careful about and a lever you can pull to create project level customizations

You will also then need to make sure your project level webpack properly tranpiles the components being pulled in. Many external libraries come pre-transpiled, but for this, the approach is to defer to project level babel configurations.

So to make sure `babel` runs against the components being imported from React Robits, you'll need to augment or add loader configurations to your webpack like either of the following:

```
{
  test: /\.(js|jsx)$/,
  include: `${path.resolve(__dirname, 'node_modules/react-robits')}`,
  loader: 'babel-loader'
}
```

or

```
{
  test: /\.(js|jsx)$/,
  exclude: /node_modules\/(?!react-robits)/,
  use: 'babel-loader'
}
```

## Available Scripts

- `npm run storybook`: runs the Storybook for easy preview, play, and investigation of components
- `npm run build-storybook`: builds a distributable version of Storybook for publishing
- `npm run lint`: runs the eslint
- `npm run format`: runs the prettier formatting
- "eject-robits": this should only be run via the parent project via `npm explore` in order to copy the components into the project and erase any footprint to this library

## Deployment

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
