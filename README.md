# Shopify Base Theme
See package.json for theme version.

**Styles:** [svbstrate v2.3.1](https://github.com/estrattonbailey/svbstrate)

## Table of Contents
1. [Getting Started](#getting-started)
2. [Developing](#developing)
2. [Build Scripts](#using-build-scripts)
3. [Pre-requisites](#pre-requisites)
4. [Misc](#misc)

For contributing process and guidelines, check CONTRIBUTING.md.

## Getting Started

#### Run Setup Script
This simply installs dependencies and creates a `dist/` directory with a `config.yml` file and an `assets/` directory in it.
```
npm run setup
```

#### Get API Key and Password
Create a private app on the Shopify store you're working on to access your API key and password. See the [Shopify Theme README](https://github.com/Shopify/shopify_theme) above for more info.

#### Edit Config File
Open `dist/config.yml` and replace the `api_key` `password` `store` and `theme_id` values with the data from the private app you created in #4. [Example here.](http://themekit.cat/docs/#config-example)

#### Copy Files
IF this is your first time starting up the theme, you'll need to run the following to copy all existing files from `src` to `dist`, where you will watch them for changes and upload to your Shopify theme:
```bash
npm run files:copy
```

## Developing
After the steps above, you're ready to go. With this setup, you'll need to run two commands in two separate terminal tabs.

### Watching Theme Files
Open a new terminal window and change directory into the `dist/` directory in the root of your project. The following script will watch for changes to any files copied to the `dist/` directory by your build task.
```
theme watch
```

### Watching Development Files
In a separate terminal tab, run the provided build scripts. See [Build Scripts](#using-build-scripts) for more information. The main script below will compile CSS and JS, concatenate your config and locale JSON files, and watch/copy all changed files to the `dist/` directory to be uploaded to Shopify.
```bash
npm start
```

**Note:** the javscript will build immediately, so if you're running `theme watch` concurrently, compiled JS will be uploaded. *So make sure you have the right theme configured in `dist/config.yml`*, or you may overwrite something you don't want to. 

## Using Build Scripts
There are a variety of build scripts provided in the `package.json` that can be run directly in your terminal window. All scripts can be run via `npm run <scriptName>`, with the exception of `npm start`.

#### `npm start`
Runs a watch script on you CSS and JS paths, as well as all theme files. Does not copy any files, but does build CSS and JS once before starting the watch script. 

#### `npm run build`
Build assets and copy all files.

#### `npm run files:copy`
Copies all theme files, aside from CSS and JS, from `src/` to `dist/`.

#### `npm run files:watch`
Watches all theme files, aside from CSS and JS, for changes and copies changed files from `src/` to `dist/`.

#### `npm run assets:watch`
Runs a watch task on your javascripts and CSS sheets.

#### `npm run assets:build`
Builds your javascript bundle and CSS sheet once.

#### `npm run js:build`
Builds your javascript bundle once using production variables if available.

#### `npm run js:dev`
Runs a watch task on your javascripts. On change events, runs `[js:build]`.

#### `npm run css:build`
Compiles and prefixes your CSS using Libass, POSTCSS and Autoprefixer.

#### `npm run css:dev`
Runs a watch task on your CSS. On change events, runs `[css:build]`.

#### `npm run jscs`
Lints your javascript partials and writes a `jscs.js` file in the root of the project.

#### `npm run jscs:watch`
Runs a watch task on your javascripts. On change events, runs `[jscs]`.

#### `npm run jshint`
Analyze your javascript partials and writes a `jshint.js` file in the root of the project.

#### `npm run jshint:watch`
Runs a watch task on your javascripts. On change events, runs `[jshint]`.


## Pre-requisites
These are things that you'll need to have for all Shopify builds, and all builds at Barrel in general.

#### Update Environment
Make sure your node environment is updated. You're using Homebrew for this, right?

```bash
# check kegs and brew version
brew update 

# update node
brew upgrade node
```

#### Install ThemeKit
Install [Theme Kit](http://themekit.cat/) utility globally. This library replaces Shopify's previous CLI, `shopify_theme` gem, which was written in Ruby.
```
curl https://raw.githubusercontent.com/Shopify/themekit/installers/install | python 
```

## Misc

#### Using Liquid in CSS and JS
It is possible to use Shopify's Liquid templating language in your CSS and Javascript. However, for most custom builds we do, we don't generally need this functionality outside of our markup.

If you choose to use Liquid in your asset files, be aware that some features of this base theme may be unusable to you. For example, Autoprefixer will throw compile errors.

To fix this in SASS, you can use string interpolation. However, this requires the disabling of Autoprefixer for the reason above.

```scss
.classname {
  background-color: #{'{{settings.background_color}}'};
}

// compiles to

.classname {
  background-color: {{settings.background_color}};
}

// but which will subsequently fail in Autoprefixer
```
