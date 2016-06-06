var MODE
var DEV = false
var BUILD = false
var path = require('path')
var glob = require('glob')
var fs = require('fs')
var browserify = require('browserify')
var watchify = require('watchify')
var exorcist = require('exorcist')
var shim = require('browserify-shim')
var mkdirp = require('mkdirp')
var gulp = require('gulp');
var processLog = require('./util/log');

/**
 * DEV Bundle Task
 * Will not minify the output
 */
gulp.task('js:dev', function(){
  DEV = true
  bundle()
});

/**
 * DEFAULT Bundle Task
 * Will minify the output
 */
gulp.task('js', function(){
  DEV = false
  BUILD = true
  bundle()
});

/**
 * Set MODE
 * Dev: non-minified
 * Prod: minified
 */
MODE = DEV ? 'DEVELOPMENT' : 'PRODUCTION'

/**
 * Make directories (if not already there)
 */
mkdirp.sync('dist/assets', function(err){
  if (err) return console.log('ERROR: ',err)
  console.log('Created /dist/assets directory for JS')
})

/**
 * INIT Browserify
 */
var b = browserify({
  entries: ['./src/assets/js/main.js'],
  transform: [ 
    [shim, 
      { global: true }
    ], 
    [ "babelify",
      {
        "presets": [
          "es2015",
          "react"
        ]
      }
    ]
  ],
  debug: true, // gen sourcemap
  cache: {},
  packageCache: {}
});
/**
 * Watchify Plugin 
 */
b.plugin(watchify)

/**
 * Default Bundler Plugin 
 */
b.plugin(bundle, { 
  delay: 0 
});

/**
 * Minify Plugin 
 * In dev mode, don't minify
 */
if (MODE === 'PRODUCTION'){
  b.plugin('minifyify', {
    map: 'main.js.map',
    output: __dirname+'/dist/assets/main.js.map'
  })
}

/**
 * Watchify emitted 'update' event 
 */
b.on('update', bundle) // on any dep update, runs the bundler

/**
 * Watchify emitted 'log' event 
 * Logs 'X bytes written (Y seconds)' 
 */
b.on('log', console.log)

/**
 * Manually import modules/components
 */
b.require(function(){
  var Files = glob.sync('./src/js/+(components|modules|lib)/*.js')
  var files = []

  for(var i = 0; i < Files.length; i++) {
    var name = path.basename(Files[i], '.js'),
        dirname = path.dirname(Files[i]).split('/'),
        dir = dirname[dirname.length - 1];

    files.push({
      file: Files[i],
      expose: dir+'/'+name
    });
  }

  return files
}());

/**
 * DEFAULT Bundler Function
 */
function bundle() {
  var writeFile = fs.createWriteStream('./dist/assets/main.js.liquid')

  processLog.start( 'javascript', 'Bundling' );

  if (BUILD) writeFile.on('close', process.exit)
  writeFile.on('error', console.log)

  writeFile.on('open', function(){
    b.bundle()
      .on('error', function(err){
        console.log(err.message)
        this.emit('end')
      })
      .pipe(exorcist('./dist/assets/main.js.map'))
      .pipe(writeFile)
      .on('end', function(){
        processLog.end();
      })
  })
}

