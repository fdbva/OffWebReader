const gulp = require('gulp');
const babel = require('gulp-babel');
const concat = require('gulp-concat');
const sourcemaps = require('gulp-sourcemaps')

gulp.task('default', ['ts', 'watch']);

gulp.task('build', ()=> {
    return gulp.src('src/**/*.js')
        .pipe(sourcemaps.init())
        .pipe(babel({
            presets: ['es2015']
        }))
        .pipe(concat('all.js'))
        .pipe(sourcemaps.write('.'))
        .pipe(gulp.dest('assets/javascript'));
});

gulp.task('watch', function() {
    gulp.watch('./src/**/*.ts', ['build']);
});
