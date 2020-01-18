const gulp = require('gulp'),
    sass = require('gulp-sass'),
    handleError = require('gulp-error-handle'),
    autoprefixer = require('autoprefixer'),
    cleanCSS = require('gulp-clean-css'),
    postcss = require('gulp-postcss'),
    sourcemaps = require('gulp-sourcemaps'),
    merge = require('merge-stream');
require('colors');

var Config = require('./config.js');
const config = new Config();
var src = config.src;
var path = config.path;
const multiPath = typeof src === "object" ? true : false;

multiPath ? console.log("Watching:".red.bold,config.src) : console.log("Watching:".red.bold,`[ ${config.src.green} ]`);

gulp.task('sass', function(done){
    if(multiPath){
        var returns = [];
        for(let i = 0;i<src.length;i++){
            returns[i] = gulp.src(`${path}/scss/**/*.scss`)
            .pipe(handleError())
            .pipe(sourcemaps.init())
            .pipe(sass())
            .pipe(postcss([autoprefixer()]))
            .pipe(cleanCSS({ compatibility: 'ie8' }))
            .pipe(sourcemaps.write('./'))
            .pipe(gulp.dest(`${path}/css`));
        }
        return merge(returns);
    }
    else{
        return gulp.src(`${path}/scss/**/*.scss`)
            .pipe(handleError())
            .pipe(sourcemaps.init())
            .pipe(sass())
            .pipe(postcss([autoprefixer()]))
            .pipe(cleanCSS({ compatibility: 'ie8' }))
            .pipe(sourcemaps.write('./'))
            .pipe(gulp.dest(`${path}/${src}/css`))
            .on('error', done);
    }
});

gulp.task('watch', function(done){
        try {
            if(multiPath){
                let returns = [];
                returns[0] = gulp.watch(config.getDirectory(),gulp.parallel('sass'));
                returns[1] = gulp.watch(`${path}/scss/**/*.scss`, gulp.parallel('sass'));

                return returns;
            }else{
                gulp.watch(`${path}/scss/**/*.scss`, gulp.parallel('sass'));
            }
        }catch(err){}
});

gulp.task('default', gulp.series('sass','watch'));