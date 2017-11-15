var gulp        = require('gulp');
var sass        = require('gulp-sass');
var prefix      = require('gulp-autoprefixer');
var minifyCSS   = require('gulp-minify-css');
var rename      = require('gulp-rename');
var browserSync = require('browser-sync').create();

// Static server
gulp.task('browser-sync', function() {
    browserSync.init({
        server: {
            baseDir: './'
        }
    });
});

// Build css files
gulp.task('compressCSS', function() {
    gulp.src('src/css/*.scss')
        .pipe(sass())
        .pipe(prefix(['last 15 versions', '> 1%', 'ie 8', 'ie 7'], { cascade: true }))
        .pipe(minifyCSS())
        .pipe(rename({
            suffix: '.min'
        }))
        .pipe(gulp.dest('dist/css'))
        .pipe(browserSync.stream());
});

// Watch files for changes & recompile
gulp.task('watch', function () {
    gulp.watch(['src/css/*.scss'], ['compressCSS']);
});

// Default task, running just `gulp` will move font, compress js and scss, start server, watch files.
gulp.task('default', ['compressCSS', 'browser-sync', 'watch']);