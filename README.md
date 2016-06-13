# Shopify Base Theme

## Table of Contents
1. [Getting Started](#getting-started)
2. [Developing](#developing)
2. [Build Scripts](#using-build-scripts)
3. [Liquid in CSS/JS](#using-liquid-in-css-and-js)

## Getting Started
1. Make sure your node environment is updated. You're using Homebrew for this, right? You should be.
    ```bash
    # check kegs and brew version
    brew update 
    
    # update node
    brew upgrade node
    ```

2. Install dependencies:
  ```
  npm i
  ```

3. Install the [Shopify Theme](https://github.com/Shopify/shopify_theme) ruby gem globally.
  ```
  gem install shopify_theme
  ```

4. Create a private app on the Shopify store you're working on. See the [Shopify Theme README](https://github.com/Shopify/shopify_theme) above for more info.

5. Run the provided setup script:
  ```
  npm run setup
  ```

6. Open `dist/config.yml` and replace the `api_key` `password` `store` and `theme_id` values with the data from the private app you created in #4.

## Developing
After the steps above, you're ready to go. With this setup, you'll need to run two commands in two separate terminal tabs.

### Watching Theme Files
Open a new terminal window and change directory into the `dist/` directory in the root of your project. The following script will watch for changes to any files copied to the `dist/` directory by your build task.
  ```
  theme watch
  ```

### Watching Development Files
In a separate terminal tab, run the provided build scripts. See [Build Scripts](#using-build-scripts) for more information. The main script below will compile CSS and JS, concatenate your config and locale JSON files, and copy all changed files to the `dist/` directory to be uploaded to Shopify.
  ```bash
  npm start
  ```

**Note:** upon running `npm start`, all files will be uploaded to the Shopify theme specified in your `config.yml` file, **so make sure it's the right theme.** This is generally a good thing, because it syncs your dev environment with your live theme on startup.


## Using Build Scripts
There are a variety of build scripts provided in the `package.json` that can be run directly in your terminal window. All scripts can be run via `npm run <scriptName>`, with the exception of `npm start`.

### `[start]`
This is the default task. You'll use this the most.

### `[dev]`
This is an alias for `npm start`.

### `[assets:watch]`
Runs a watch task on your javascripts and CSS sheets.

### `[assets:build]`
Builds your javascript bundle and CSS sheet once.

### `[js:build]`
Builds your javascript bundle once.

### `[js:dev]`
Runs a watch task on your javascripts. On change events, runs `[js:build]`.

### `[jscs]`
Lints your javascript partials and writes a `jscs.js` file in the root of the project.

### `[jscs:watch]`
Runs a watch task on your javascripts. On change events, runs `[jscs]`.

### `[jshint]`
Analyze your javascript partials and writes a `jshint.js` file in the root of the project.

### `[jshint:watch]`
Runs a watch task on your javascripts. On change events, runs `[jshint]`.

### `[css:build]`
Compiles and prefixes your CSS using Libass, POSTCSS and Autoprefixer.

## `[css:dev]`
Runs a watch task on your CSS. On change events, runs `[css:build]`.


## Using Liquid in CSS and JS
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

TODO: Potential solutions would be to use a mixin to wrap our interpolated Liquid, and upload a SCSS raw file to Shopify to force Shopify to compile SASS again and parse the Liquid correctly.
