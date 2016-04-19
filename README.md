# Shopify Base Theme

## Getting Started
1. Install dependencies:
```
npm i
```

2. Install the [Shopify Theme](https://github.com/Shopify/shopify_theme) ruby gem globally.
```
gem install shopify_theme
```

3. Create a private app on the Shopify store you're working on. See the [Shopify Theme README](https://github.com/Shopify/shopify_theme) above for more info.

4. Create a `dist/` directory, and copy `src/config-sample.yml` to `dist/config.yml`

5. Replace the `api_key` `password` `store` and `theme_id` values in your new `config.yml` file.

6. Open a new terminal window. Run the Shopify theme task from within your new `/dist` directory:
```
theme watch
```

7. In a separate terminal tab, run the `dev` task:
```
gulp dev
```

**Note:** upon starting `gulp-dev`, all files will be uploaded to the Shopify theme specified in your `config.yml` file, **so make sure it's the right theme.** This is generally a good thing, because it syncs your dev environment with your live theme.

#### SCSS and Shopify
Shopify supports uploading SCSS to their servers where they handle compilation at load time. This allows developers to add Liquid markup to SCSS partials.
