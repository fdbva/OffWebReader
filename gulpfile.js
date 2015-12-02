var gulp = require('gulp'),
    ts = require('gulp-typescript');

gulp.task('default', ['ts', 'watch']);

gulp.task('ts', function() {  
    gulp.src(['src/**/*.ts'])
        .pipe(ts({module: 'commonjs', target: 'ES5'}))
        .js
        .pipe(gulp.dest('./assets/javascript'));
});

gulp.task('watch', function() {  
    gulp.watch('./src/**/*.ts', ['ts']);
});
