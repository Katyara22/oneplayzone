const gulp = require('gulp');
const browserSync = require('browser-sync');
const sass = require('gulp-sass')(require('sass'));
const rename = require("gulp-rename");
const autoprefix = require('gulp-autoprefixer');
const cleanCSS = require('gulp-clean-css');

// Static server
gulp.task('server', function () {
   browserSync.init({
       server: {
           baseDir: "src"
       }
   });
});

// completed sass file
gulp.task('styles', function () {
    return gulp.src("src/assets/scss/*.+(scss|sass)")
        .pipe(sass({ autputStyle: 'compressed' }).on('error', sass.logError))
        .pipe(rename({
            prefix: "",
            suffix: "",
        }))
        .pipe(autoprefix({
            browsers: ['last 2 versions'],
            cascade: false
        }))
        .pipe(cleanCSS({ compatibility: 'ie8' }))
        .pipe(gulp.dest("src/assets/css"))
        .pipe(browserSync.stream());
});

gulp.task('admin', function () {
    return gulp.src("src/assets/admin/assets/scss/*.+(scss|sass)")
        .pipe(sass({ autputStyle: 'compressed' }).on('error', sass.logError))
        .pipe(rename({
            prefix: "",
            suffix: "",
        }))
        .pipe(autoprefix({
            browsers: ['last 2 versions'],
            cascade: false
        }))
        .pipe(cleanCSS({ compatibility: 'ie8' }))
        .pipe(gulp.dest("src/assets/admin/assets/css"))
        .pipe(browserSync.stream());
});

gulp.task('watch_styles', function () {
    gulp.watch("src/assets/scss/*.+(scss|sass)", gulp.parallel("styles"));
    gulp.watch("src/*.html").on("change", browserSync.reload);
})

gulp.task('watch_admin', function () {
    gulp.watch("src/assets/admin/assets/scss/*.+(scss|sass)", gulp.parallel("admin"));
    gulp.watch("src/assets/admin/*.html").on("change", browserSync.reload);
})

gulp.task('default', gulp.parallel('watch_styles', 'watch_admin', 'server', 'admin'));