'use strict';

const gulp = require('gulp')
const path = require('path')
const del = require('delete')
const flatten = require('gulp-flatten')
const processLog = require('./util/log')
const concat = require('gulp-concat')
const wrap = require('gulp-wrapper')

/**
 * Relative to the tasks/ dir
 */
const rootPath = `${__dirname}/..`

/**
 * @param {string|array} arg Array of globs, or single glob
 */
function getPath(arg){
  if (Array.isArray(arg)){
    return arg.map((str) => `${rootPath}/${str}`)
  }
  return `${rootPath}/${arg}`
}

/**
 * DEFAULT
 * Source globs and dest paths
 *
 * TODO
 * [Assets] will need to be expanded on to
 * accommodate more file types
 */
const files = {
  layout: {
    src: 'src/layout',
    glob: 'src/layout/*.liquid',
    dest: 'dist/layout'
  },
  templates: {
    src: 'src/templates',
    glob: ['src/templates/**/*.liquid'],
    dest: 'dist/templates'
  },
  snippets: {
    src: 'src/snippets',
    glob: ['src/snippets/**/*.liquid'],
    dest: 'dist/snippets'
  },
  assets: {
    src: 'src/assets',
    glob: [
      'src/assets/**/*.png',
      'src/assets/**/*.jpg',
      'src/assets/**/*.svg'
    ],
    dest: 'dist/assets'
  },
  config: {
    glob: [
      'src/config/lib/general-info.json',
      'src/config/lib/global.json',
      'src/config/lib/promobar.json',
      'src/config/lib/newsletter.json'
    ],
    dest: 'dist/config'
  },
  locales: {
    glob: 'src/locales/*.json',
    dest: 'dist/locales'
  }
}

/**
 * Concats src/config/lib/*.json into
 * a single settings_schema.json
 */
gulp.task('config:concat', function() {
  gulp.src( getPath(files.config.glob) )
  .pipe(concat( 'settings_schema.json', {newLine: ','}))
  .pipe(wrap({
    header: '[',
    footer: ']'
  }))
  .pipe(gulp.dest( getPath(files.config.dest) ));
})

/**
 * DEFAULT Copy Task
 * Copies all files from /src to /dist
 */
gulp.task('files:copy', ['config:concat'], function(){
  processLog.start('all files', 'Copying') // start log

  copy(getPath(files.layout.glob), getPath(files.layout.dest), processLog.end.bind(null, 'layout'))
  copy(getPath(files.templates.glob), getPath(files.templates.dest), processLog.end.bind(null, 'templates'))
  copy(getPath(files.snippets.glob), getPath(files.snippets.dest), processLog.end.bind(null, 'snippets'))
  copy(getPath(files.assets.glob), getPath(files.assets.dest), processLog.end.bind(null, 'assets'))
  copy(getPath(files.locales.glob), getPath(files.locales.dest), processLog.end.bind(null, 'locales'))
})

/**
 * DEV Copy Task
 * Watches filepaths for changes and 
 * copies changed files.
 */
gulp.task('files:watch', function(){
  gulp.watch(getPath(files.layout.glob), function(event){
    processFiles(event, 'layout')
  });
  gulp.watch(getPath(files.templates.glob), function(event){
    processFiles(event, 'templates')
  });
  gulp.watch(getPath(files.snippets.glob), function(event){
    processFiles(event, 'snippets', {flatten: true})
  });
  gulp.watch(getPath(files.assets.glob), function(event){
    processFiles(event, 'assets', {flatten: true})
  });
  gulp.watch(getPath(files.locales.glob), function(event){
    processFiles(event, 'locales')
  });
  gulp.watch(getPath(files.config.glob), ['config:concat']);
});

/**
 * Watch Handler
 * Scrubs event type (change|unlink) and
 * either copies or deletes file
 *
 * @param {stream} event The object returned from gulp.watch()
 * @param {string} type The type of file being processed
 * @param {object} opts Options to pass to copy() task (optional)
 */
function processFiles(event, type, opts = {}){
  /**
   * Full file path
   */
  let srcPath = event.path 

  /**
   * File and first level directory if present.
   * Regex removes trailing/preceding / and spaces
   */
  let srcName = srcPath.split(/src/)[1].replace(/^((\w)|^(\/\w))+\//,'')

  /**
   * Get full *relative* destination path
   * including file name
   */
  let destName = getPath(`${files[type].dest}/${srcName}`)

  /**
   * The path to the destination file
   */
  let destPath = path.dirname(destName)

  if (opts.flatten){
    destPath = destName.replace(new RegExp(srcName),'') 
  }

  /**
   * Delete event
   */
  if (event.event === 'unlink'){
    processLog.start(destName, 'Deleting'); // start log
    del(destPath, { force: true }, function(err){
      if (err) throw err
      processLog.end()
    })
  } 
  /**
   * Otherwise copy it over
   */
  else {
    processLog.start(srcName, 'Copying') // start log
    copy(srcPath, destPath, processLog.end)
  }
}

/**
 * MAIN Copy Function
 * A wrapper for gulp.(src|dest)
 *
 * @param {string|array} files The default glob patterns in the files object
 * @param {string} dest The default dist path in the files object
 * @param {object} opts Options (optional)
 * @param {function} cb The processLog callback function
 */
function copy(files, dest, cb){
  /**
   * Debug helper
   */
  //console.log(`Source: ${files}, Destination: ${dest}`)
  
  /** 
   * Flatten all paths, only affects assets because
   * the `files` param in this scope is the full path of 
   * the changed files, i.e. assets/images/image.jpg instead
   * of assets/image.jpg like we want.
   */
  gulp.src(files).pipe(flatten()).pipe(gulp.dest(dest))

  cb()
}
