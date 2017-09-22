'use strict';

/**
 * Import node modules
 */
var gulp         = require('gulp');
var sass         = require('gulp-sass');
var postcss      = require('gulp-postcss');
var cssnano      = require('cssnano');
var autoprefixer = require('autoprefixer');
var rename       = require('gulp-rename');
var zip          = require('gulp-zip');
var uglify       = require('gulp-uglify');
var rollup       = require('gulp-rollup');
var nodeResolve  = require('rollup-plugin-node-resolve');
var commonjs     = require('rollup-plugin-commonjs');
var babel        = require('rollup-plugin-babel');
var browserSync  = require('browser-sync');

var dir = {
  src: 'src',
  dist: 'dist',
};

/**
 * Build javascript
 */
gulp.task('js', function() {
  return gulp.src(dir.src + '/**/*.js')
    .pipe(rollup({
      allowRealFiles: true,
      entry: dir.src + '/jquery.sticky.js',
      format: 'iife',
      external: ['jquery'],
      globals: {
        jquery: "jQuery"
      },
      plugins: [
        nodeResolve({ jsnext: true }),
        commonjs(),
        babel({
          presets: ['es2015-rollup'],
          babelrc: false
        })
      ]
    }))
    .pipe(gulp.dest(dir.dist))
    .on('end', function() {
      gulp.src([dir.dist + '/jquery.sticky.js'])
        .pipe(uglify())
        .pipe(rename({suffix: '.min'}))
        .pipe(gulp.dest(dir.dist));
    });
});

/**
 * Build CSS
 */
gulp.task('css', function() {
 return sassCompile(dir.src + '/*.scss', dir.dist);
});

function sassCompile(src, dest) {
  return gulp.src(src)
    .pipe(sass())
    .pipe(postcss([
      autoprefixer({
        browsers: ['last 2 versions'],
        cascade: false
      })
    ]))
    .pipe(gulp.dest(dest))
    .pipe(postcss([
      cssnano({
        'zindex': false
      })
    ]))
    .pipe(rename({suffix: '.min'}))
    .pipe(gulp.dest(dest));
}

/**
 * Sample page
 */
gulp.task('html', function() {
  return gulp.src(dir.src + '/*.html')
    .pipe(gulp.dest(dir.dist));
});

/**
 * Auto Build
 */
gulp.task('watch', function() {
  gulp.watch([dir.src + '/**/*.js'], ['js']);
  gulp.watch([dir.src + '/**/*.html'], ['html']);
});

/**
 * Build
 */
gulp.task('build', ['html', 'js', 'css']);

/**
 * Browsersync
 */
gulp.task('server',['build'], function() {
  browserSync.init( {
    server: {
      baseDir: dir.dist + '/'
    },
    files: [
      dir.dist + '/**'
    ]
  });
});

gulp.task('default', ['watch', 'server']);
