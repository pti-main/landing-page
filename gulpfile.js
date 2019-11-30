const gulp = require('gulp'),
    sass = require('gulp-sass'),
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

gulp.task('sass', function(){
    if(multiPath){
        var returns = [];
        for(let i = 0;i<src.length;i++){
            returns[i] = gulp.src(`${path}/scss/**/*.scss`)
            .pipe(sourcemaps.init())
            .pipe(sass())
            .pipe(postcss([autoprefixer()]))
            .pipe(cleanCSS({ compatibility: 'ie8' }))
            .pipe(sourcemaps.write('./'))
            .pipe(gulp.dest(`${path}/css`))
            .on('error', function(err) {console.log("error mordo")});
        }
        return merge(returns);
    }
    else{
        return gulp.src(`${path}/scss/**/*.scss`)
            .pipe(sourcemaps.init())
            .pipe(sass())
            .pipe(postcss([autoprefixer()]))
            .pipe(cleanCSS({ compatibility: 'ie8' }))
            .pipe(sourcemaps.write('./'))
            .pipe(gulp.dest(`${path}/${src}/css`))
            .on('error', function(err) {console.log("error mordo")});
    }
});

gulp.task('watch', function(){
        try {
            if(multiPath){
                let returns = [];
                returns[0] = gulp.watch(config.getDirectory(),gulp.parallel('sass'));
                returns[1] = gulp.watch(`${path}/scss/**/*.scss`, gulp.parallel('sass'));

                returns[0].on('error', function(err) {console.log("error mordo")});
                returns[1].on('error', function(err) {console.log("error mordo")});

                return returns;
            }else{
                gulp.watch(`${path}/scss/**/*.scss`,gulp.parallel('sass')).on('error', function(err) {console.log("error mordo")});;
            }
        }catch(err){}
});

gulp.task('default', gulp.series('sass','watch'));