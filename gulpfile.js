/**
 * Created by Evandro Lira de Souza on 21/02/17.
 */

var gulp = require('gulp')
    ,runSequence = require('run-sequence').use(gulp)
    ,imagemin = require('gulp-imagemin')
    ,clean = require('gulp-clean')
    ,uglify = require('gulp-uglify')
    ,usemin = require('gulp-usemin')
    ,cssmin = require('gulp-cssmin')
    ,autoprefixer = require('gulp-autoprefixer');

gulp.task('default', ['copy'], function() {
    runSequence('build-img', 'usemin', 'minify', 'clean-src');
});

gulp.task('copy', ['clean'], function() {
    gulp.src('routes/**/*')
        .pipe(gulp.dest('src/routes'));
    gulp.src('server.js')
        .pipe(gulp.dest('src'));
    return gulp.src('app/**/*').pipe(gulp.dest('src'));
});

gulp.task('clean', function(){
    return gulp.src(['src', 'dist']).pipe(clean());
});

gulp.task('copy-resources', function(){
    gulp.src(['src/app/assets/fonts/**', 'src/public/lib/bootstrap/dist/fonts/**'])
        .pipe(gulp.dest('dist/app/fonts'));

    gulp.src(['src/app/assets/production/env.js'])
        .pipe(gulp.dest('dist/app'));

    gulp.src(['src/server.js'])
        .pipe(gulp.dest('dist'));

    gulp.src(['src/routes/*.js'])
        .pipe(uglify())
        .pipe(gulp.dest('dist/routes'));

    return gulp.src(['src/app/assets/production/env.js'])
        .pipe(gulp.dest('src'));
});

gulp.task('clean-src', function(){
    return gulp.src(['src','dist/app/public']).pipe(clean());
});

gulp.task('minify', function(){
    gulp.src('dist/app/js/page-script.min.js')
        .pipe(uglify({mangle: false}))
        .pipe(gulp.dest('dist/app/js'));
    return gulp.src(['dist/app/js/angular-script.min.js', 'dist/app/js/component-script.min.js'])
        .pipe(uglify())
        .pipe(gulp.dest('dist/app/js'));
});

gulp.task('build-img', function() {
    return gulp.src('src/images/**/*')
        .pipe(imagemin())
        .pipe(gulp.dest('dist/app/images'));
});

gulp.task('usemin', ['copy-resources'], function() {
    return gulp.src('src/**/**/*.html')
        .pipe(usemin({
            js: ['concat'],
            css: [autoprefixer, cssmin]
        }))
        .pipe(gulp.dest('dist/app'));
});