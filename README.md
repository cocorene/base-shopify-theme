# Shopify Base Theme
See package.json for theme version.

## Table of Contents
1. [Getting Started](#getting-started)
2. [Developing](#developing)
2. [Deploying](#deploying)
3. [Pre-requisites](#pre-requisites)
4. [Misc](#misc)

For contributing process and guidelines, check CONTRIBUTING.md.

## Getting Started

#### Get API Key and Password
Create a private app on the Shopify store you're working on to access your API key and password. See the [Shopify Theme README](https://github.com/Shopify/shopify_theme) above for more info.

#### Edit Config File
Open `config-example.yml`, deplicate and rename it to `config.yml` and replace the `api_key` `password` `store` and `theme_id` values with the data from the private app you have created (See step above).

## Developing
To start development, open up a terminal window, navigate to the theme root folder and run `npm start`. This will compile, watch and hot reload your javascript and css. It'll also lint your js using [standardjs](https://standardjs.com/) best practices. If you make a change to a file that needs to be uploaded to Shopify, the process will handle it and reload your browser once it's been uploaded. 

Note: In your Shopify Theme Settings, there is a setting called *Access site through BrowserSync?*, under the Dev, Logo, Favicon section. Make sure that this option is checked for your development themes, unchecked for your staging and production themes. 

## Deploying
There are build scripts provided in the `package.json` that will build and deploy theme code directly to Shopify. All scripts can be run via `npm run <scriptName>`, with the exception of `npm start`. The build scripts are:
* `npm run development`
* `npm run staging`
* `npm run production`

Each of the scripts reference a different environment as defined in your `config.yml` file. The tasks will review your Git tree and only upload the files that have changed since your last deployment. CSS and Javascript will always be deployed. 

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

## Misc

#### Using Liquid in CSS and JS
It is possible to use Shopify's Liquid templating language in your CSS and Javascript. However, for most custom builds we do, we don't generally need this functionality outside of our markup.If you choose to use Liquid in your asset files, be aware that some features of this base theme may be unusable to you and the liquid syntax may cause build errors.