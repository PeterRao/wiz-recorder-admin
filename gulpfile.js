var gulp = require('gulp');
var $ = require('gulp-load-plugins')();
var del = require('del');
var path = require('path');
var runSequence = require('run-sequence');
var webpack = require('webpack');
var argv = require('minimist')(process.argv.slice(2));

var src = {};
var watch = false;
var browserSync;

gulp.task('default', ['sync']);

gulp.task('clean', del.bind(
  null, ['.tmp', 'build/*', '!build/.git'], {dot: true}
));

gulp.task('vendor', function () {
  return gulp.src('node_modules/bootstrap/dist/fonts/**')
    .pipe(gulp.dest('build/fonts'));
});

gulp.task('assets', function () {
  src.assets = [
    'package.json',
    'src/assets/**',
    'src/templates*/**/*.*'
  ];
  return gulp.src(src.assets)
    .pipe($.changed('build'))
    .pipe(gulp.dest('build'))
    .pipe($.size({title: 'assets'}));
});

gulp.task('bundle', function (cb) {
  var firstStarted = false;
  var secondStarted = false;
  var config = require('./webpack.config.js');
  var bundler = webpack(config);

  function bundle(err, stats) {
    if (err) {
      throw new $.util.PluginError('webpack', err);
    }

    if (argv.verbose) {
      $.util.log('[webpack]', stats.toString({colors: true}));
    }

    if (!firstStarted) {
      firstStarted = true;
    } else if (firstStarted && !secondStarted) {
      secondStarted = true;
      return cb();
    }
  }

  if (watch) {
    bundler.watch(200, bundle);
  } else {
    bundler.run(bundle);
  }
});

gulp.task('build', ['clean'], function (cb) {
  runSequence(['vendor', 'assets', 'bundle'], cb);
});

gulp.task('build:watch', function (cb) {
  watch = true;
  runSequence('build', function () {
    gulp.watch(src.assets, ['assets']);
    cb();
  });
});

gulp.task('serve', ['build:watch'], function (cb) {
  src.server = [
    'build/server.js',
    'build/templates/**/*'
  ];

  var started = false;
  var cp = require('child_process');
  var assign = require('react/lib/Object.assign');

  var server = (function startup() {
    var child = cp.fork('build/server.js', {
      env: assign({NODE_ENV: 'development'}, process.env)
    });
    child.once('message', function(message) {
      if (message.match(/^online$/)) {
        if (browserSync) {
          browserSync.reload();
        }
        if (!started) {
          started = true;
          gulp.watch(src.server, function() {
            $.util.log('Restarting development server.');
            server.kill('SIGTERM');
            server = startup();
          });
          cb();
        }
      }
    });
    return child;
  })();

  process.on('exit', function() {
    server.kill('SIGTERM');
  });

});

gulp.task('sync', ['serve'], function (cb) {
  browserSync = require('browser-sync');

  browserSync({
    logPrefix: 'RSK',
    notify: false,
    https: false,
    proxy: 'localhost:5000'
  }, cb);

  process.on('exit', function () {
    browserSync.exit();
  });

  gulp.watch(['build/**/*.*'].concat(
    src.server.map(function (file) {
      console.log(file.path);
      return '!' + file;
    })
  ), function (file) {
    browserSync.reload(path.relative(__dirname, file.path));
  });
});
