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

6. Run the `dev` task:
```
gulp dev
```

**To copy/concat/compile and minifiy all source files, simply run `gulp`**
