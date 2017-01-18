var gulp = require('gulp');
var sass = require('gulp-sass');
var prefix = require('gulp-autoprefixer');

//**********************************************************************
// sass compile 
//**********************************************************************

gulp.task('sass', function () {
  gulp.src('./sass/style.sass')
    .pipe(sass().on('error', sass.logError))
    .pipe(prefix())
    .pipe(gulp.dest('./css'));
});

//**********************************************************************
// gulp watch
//**********************************************************************

gulp.task('watch', function () {
	gulp.watch('./sass/**/*.sass', ['sass']);
});


gulp.task('default', ['watch', 'sass']);