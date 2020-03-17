<h1>
  React Robits <img align="right" width="300" src="robits.png"> 
</h1>
A library of React components, by the Frontend Team at Robots & Pencils, to share amongst projects in an effort to challenge ourselves to think reusable so we can bootstrap development and save time.

###### Broken up into two main concepts:

- Core: repo-connected, importable components that we believe to be common and "base" enough to standardize for R&P (attempted black box)
- Periphery: components that we've made sharable, but might not be good candidates for Core, since they are likely to need deeper customizations (non black box). Therefore, these are independant and not importable, and developers are encouraged to preview and copy the code from Storybook for inclusion in their project.

## Areas of Focus

Core:

- Form components
- Buttons
- SVG Icons
- UI Elements (toggles, pills)

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

- Slick?
- React Table?

## New Project Setup

Download this repo as an npm package into your project:

```
npm install --save [github repo link]
```

## Directory Structure

```bash
├── TBD                                         # TBD
│   ├── tbd                                     # TBD

```

## Available Scripts

- Storybook: runs the Storybook for easy preview, play, and investigation of components
- Update: (re)downloads this repo as an npm package and merges its package.json with this project's package.json
- Merge: merges this package.json with the parent project's package.json
