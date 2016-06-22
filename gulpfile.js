'use strict';

var gulp = require('gulp')
  ,sass = require('gulp-sass')
  ,imagemin = require('gulp-imagemin')
  ,del = require('del')
  ,autoprefixer = require('gulp-autoprefixer')
  ,cleanCSS = require('gulp-clean-css')
  ,concat = require('gulp-concat')
  ,uglify = require('gulp-uglify')
  ,cssmin = require('gulp-cssmin')
  ,usemin = require('gulp-usemin')
  ,minifyCSS = require('gulp-minify-css')
  ,htmlReplace = require('gulp-html-replace')
  ,jshint = require('gulp-jshint')
  ,jshintStylish = require('jshint-stylish')
  ,csslint = require('gulp-csslint');

gulp.task('default', ['del'], function() {
  gulp.start('watch');
});

var browserSync = require('browser-sync').create();
gulp.task('watch', ['sass', 'minify-css', 'images', 'html', 'js'], function(){
   browserSync.init({
        port: 8080,
        server: {
          baseDir: './dist',
          index: 'views/index.html'
        },
        browser: ["google chrome"],
        notify: true,
        reloadDelay: 1000
   });

  gulp.watch("./src/sass/**/*.scss", ['sass']);
  gulp.watch("./src/js/*.js", ['js']);
  gulp.watch("./src/**/*.html", ['html']);
  gulp.watch("./src/images/**/*", ['images']);

  gulp.watch("./src/**/*.*").on('change', browserSync.reload);
});

gulp.task('del', function() {
    return del('./dist');
});

gulp.task('sass', function(){
   return gulp.src('./src/sass/**/*.scss')
      .pipe(autoprefixer('last 2 version', 'safari 5', 'ie 8', 'ie 9', 'opera 12.1', 'ios 6', 'android 4'))
      .pipe(sass().on('error', sass.logError))
      .pipe(gulp.dest('./dist/css/'));
});
  
gulp.task('images', function() {
  return gulp.src('./src/img/**/*')
    .pipe(imagemin())
    .pipe(gulp.dest('./dist/img'));
});

gulp.task('html', function(){
   return gulp.src('./src/**/*.html', { base: './src/' })
      .pipe(gulp.dest('./dist'))
});

gulp.task('js', function(){
   return gulp.src('./src/**/*.js', { base: './src/' })
      .pipe(gulp.dest('./dist/js'))
});

gulp.task('minify-css', function () {
  return gulp.src('./dis/css/**/*.css')
    .pipe(cssmin())
    .pipe(gulp.dest('./dist/css'));
});


// gulp.task('minify-css', function() {
//    return gulp.src('./src/css/**/*.css')
//      .pipe(minifyCSS({keepBreaks:true}))
//     .pipe(gulp.dest('./dist/css'))
// });


/*// Browser task
gulp.task('browser-sync', function() {
  browserSync.init({
    proxy : 'http://franquiahelp.dev/',
    ghostMode: {
          scroll: true
        }
  });
});*/


// gulp.task('minify-css', function() {
//   gulp.src('./dist/css/**/*.css')
//     .pipe(minifyCSS({keepBreaks:true}))
//     .pipe(gulp.dest('./dist/'))
// });

// gulp.task('usemin', function() {
//   return gulp.src('dist/**/*.html')
//     .pipe(usemin({
//       js: [uglify],
//       css: [autoprefixer]
//     }))
//     .pipe(gulp.dest('dist'));
// });

// gulp.watch('src/js/**/*.js').on('change', function(event) {
//     console.log("Linting " + event.path);
//     gulp.src(event.path)
//         .pipe(jshint())
//         .pipe(jshint.reporter(jshintStylish));
// });

// gulp.watch('src/css/**/*.css').on('change', function(event) {
//     console.log("Linting " + event.path);
//     gulp.src(event.path)
//         .pipe(csslint())
//         .pipe(csslint.reporter());
// }); 




// gulp.task('default', ['sass', 'copy'], function() {
//     gulp.start('img', 'usemin');
// });

// gulp.task('copy', ['clean'], function() {
//     return gulp.src('src/**/*')
//         .pipe(gulp.dest('dist'));
// });

// gulp.task('clean', function() {
//     return gulp.src('dist')
//         .pipe(clean());
// });

// gulp.task('img', function() {
//   return gulp.src('dist/img/**/*')
//     .pipe(imagemin())
//     .pipe(gulp.dest('dist/img'));
// });

// gulp.task('sass', function() {
//    return gulp.src('src/sass/**/*.scss')
//       .pipe(sass())
//       .pipe(gulp.dest('dist/css'));
// });

// gulp.task('usemin', function() {
//   return gulp.src('dist/**/*.html')
//     .pipe(usemin({
//       js: [uglify],
//       css: [autoprefixer, cssmin]
//     }))
//     .pipe(gulp.dest('dist'));
// });

// var browserSync = require('browser-sync').create();
// gulp.task('watch', function() {
//     browserSync.init({
//         port: 8080,
//         server: {
//           baseDir: './dist',
//           index: 'views/index.html'
//         },
//         browser: 'google-chrome',
//         notify: true,
//         reloadDelay: 1000
//     });

//     gulp.watch('dist/js/**/*.js').on('change', function(event) {
//         console.log("Linting " + event.path);
//         gulp.src(event.path)
//             .pipe(jshint())
//             .pipe(jshint.reporter(jshintStylish));
//     });

//     gulp.watch('dist/css/**/*.css').on('change', function(event) {
//         console.log("Linting " + event.path);
//         gulp.src(event.path)
//             .pipe(csslint())
//             .pipe(csslint.reporter());
//     }); 

//     gulp.watch('src/sass/**/*.scss').on('change', function(event) {
//        gulp.src('src/sass/**/*.scss')
//           .pipe(sass().on('error', function(erro) {
//               console.log('SASS, erro compilação: ' + erro.filename);
//               console.log(erro.message);
//             }))
//           .pipe(gulp.dest('dist/css'));
//     });

//     gulp.watch("./src/**/*.*").on('change', browserSync.reload);
// });

