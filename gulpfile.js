var gulp = require('gulp');
//var watch = require('gulp-watch');
var uglify = require('gulp-uglify');
var cleanCSS = require('gulp-clean-css');
var minHTML = require('gulp-htmlmin');
var browserSync = require('browser-sync').create();

gulp.task('default', ['server', 'markup', 'scripts', 'styles'], function(){
    gulp.watch('./src/**/*.html', ['markup']);
    gulp.watch('./src/**/*.js', ['scripts']);
    gulp.watch('./src/**/*.css', ['styles']);
});

gulp.task('copy-assets', function(){
    gulp.src('./src/**/*.*')
        .pipe(gulp.dest('./dist'));
});

gulp.task('markup', function() {
    gulp.src('./src/**/*.html')
        .pipe(minHTML({collapseWhitespace: true}))
        .pipe(gulp.dest('./dist'))

        browserSync.reload();
});

gulp.task('styles', function() {
    gulp.src('./src/**/*.css')
        .pipe(cleanCSS())
        .pipe(gulp.dest('./dist'))
        
        browserSync.reload();
});

gulp.task('scripts', function(){
    gulp.src('./src/**/*.js')
        .pipe(uglify())
        .pipe(gulp.dest('./dist'))
        
        browserSync.reload()
})

gulp.task('server', function() {
    browserSync.init({
        server: {
            baseDir: "./dist"
        }
    });
});