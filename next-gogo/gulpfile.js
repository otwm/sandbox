const gulp = require('gulp');
const zip = require('gulp-zip');
const moment = require('moment');
const del = require('del');
const shell = require('gulp-shell');

const clean = () => del(['./build ', './.next']);

const mv = () => gulp.src(['./.next', 'package.json', 'package-lock.json'])
    .pipe(gulp.dest('./build'));

const archive = () => gulp.src(['./build/**'])
    .pipe(zip(`dev-next-gogo-${moment().format('YYYY-MM-DD-hh_mm_ss')}.zip`))
    .pipe(gulp.dest('./build'));

gulp.task('mv', mv);
gulp.task('archive', archive);

gulp.task('clean', clean);
gulp.task('prebuild', shell.task('mkdir build'));
gulp.task('postbuild', ['mv', 'archive']);
