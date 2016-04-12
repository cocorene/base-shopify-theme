var gulp = require('gulp');
var inquirer = require('inquirer');
var YAML = require('yamljs');
var file = require('gulp-file');

gulp.task('init', function(done){
  inquirer.prompt([
    {
      type: 'input',
      message: 'API key:',
      default: '7c7dceeb0bcc39ddae5eacf7b7a713ee',
      name: 'api_key'
    },
    {
      type: 'input',
      message: 'Password:',
      default: '5d1d4db91f54f2566cd5968d6298efcd',
      name: 'password'
    },
    {
      type: 'input',
      message: 'URL:',
      default: 'barrel-base.myshopify.com',
      name: 'store'
    },
    {
      type: 'input',
      message: 'Theme ID:',
      default: '100568707',
      name: 'theme_id'
    }
  ]).then(function (answers) {
    file('config.yml', YAML.stringify(answers), { src: true })
      .pipe(gulp.dest('dist'));

    done()
  })
})
