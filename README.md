<h1>
  React Robits <img align="right" width="300" src="robits.png">
</h1>
A library of React components, by the Frontend Team at Robots & Pencils, to share amongst projects in an effort to challenge ourselves to think reusable/themeable so we can bootstrap development and save time.

###### Broken up into two main concepts:

- Core: repo-connected, importable components that we believe to be common and "base" enough to standardize for R&P (attempted black box)
- Periphery: components that we've made sharable, but might not be good candidates for Core, since they are likely to need deeper customizations (non black box). Therefore, these are independant and not importable, and developers are encouraged to preview and copy the code from Storybook for inclusion in their project.

## Areas of Focus

Core:

- Form components
- Buttons
- Generic Modals
- Status indicators
- UI Elements (badges, tags, pills)

Periphery:

- Sliders/Carousels
- Item Tile
- Video?
- Modals?
- Maps?
- Grids?
- Load More / Pagination?
- Data Tables?
- Masonry?

Dependencies:

TBD

## New Project Setup

Download this repo as an npm package into your project:

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

## Directory Structure

```bash
├── src
│   ├── lib                     # the library of assets that will be importable into a project
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

## Available Scripts

- `npm run storybook`: runs the Storybook for easy preview, play, and investigation of components
- `npm run build-storybook`: builds a distributable version of Storybook for publishing
- `npm run lint`: runs the eslint
- `npm run format`: runs the prettier formatting
- "eject-robits": this should only be run via the parent project via `npm explore` in order to copy the components into the project and erase any footprint to this library

## Deployment

This is currently deployed to Heroku on a free tier. To deploy from your terminal, you'll need the [Heroku CLI](https://devcenter.heroku.com/articles/heroku-cli#download-and-install) installed and logged in to your Heroku account.

From the root of your project folder, generate new storybook build:

```
$ npm run build-storybook
```

Add Heroku git remote if you haven't already:

```
$ heroku git:remote --app react-robits
$ git remote -v # List available remotes
```

First, run `npm run build-storybook` to recompile the distributable package from the branch you wish to deploy.

Then, run one of the following commands...

If you are deploying the `master` branch, run:

```
$ git push heroku master
```

Deploy changes from a branch besides `master`:

```
$ git push heroku testbranch:master
```

Launch Heroku app in browser:

```
$ heroku open --app react-robits
```

Or visit https://react-robits.herokuapp.com
