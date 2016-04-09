var startTime, 
    taskTime,
    gutil = require('gulp-util'),
    prettyHrtime = require('pretty-hrtime');

var logger = {
  filepath: '',
  action: '',
  start: function(filepath, action) {
    this.filepath = filepath;
    this.action = action;
    startTime = process.hrtime();
    gutil.log(this.action, gutil.colors.green(this.filepath));
  },
  end: function(filepath, action) {
    taskTime = prettyHrtime(process.hrtime(startTime));
    gutil.log(action || logger.action, gutil.colors.green(filepath || logger.filepath), 'completed in', gutil.colors.magenta(taskTime));
  }
}

module.exports = logger;
