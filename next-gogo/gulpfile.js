const gulp = require('gulp');
const zip = require('gulp-zip');
const moment = require('moment');
const del = require('del');
const runSequence = require('run-sequence');
const shelljs = require('shelljs');

const { ls, mkdir } = shelljs;
const { log } = console;

const clean = () => del(['./build ', './.next']);

const mvNext = () => gulp.src('./.next/**/*')
    .pipe(gulp.dest('./build/.next'));
const mvConfig = () => gulp.src(['package.json', 'package-lock.json'])
    .pipe(gulp.dest('./build'));

const archive = () => gulp.src(['./build/**'], {dot: true})
    .pipe(zip(`dev-next-gogo-${moment().format('YYYY-MM-DD-hh_mm_ss')}.zip`))
    .pipe(gulp.dest('./build'));

gulp.task('mvNext', mvNext);
gulp.task('mvConfig', mvConfig);
gulp.task('mv', ['mvNext', 'mvConfig']);
gulp.task('archive', archive);
gulp.task('ls', done => {
    log(ls('./build'));
    done();
});
gulp.task('wait', done => {
    log('wait');
    setTimeout(() => {
        done();
    }, 3000);
});

gulp.task('clean', clean);

gulp.task('prebuild', done=>{
    mkdir('build');
    done();
});

gulp.task('build', done => {
    shelljs.exec('next build && tsc --project tsconfig.server.json', function (code, stdout, stderr) {
        if (code !== 0) {
            console.log('Program stderr:', stderr);
            done(stderr);
            return;
        }
        done();
    });
});

gulp.task('default', function (callback) {
    runSequence('clean',
        'prebuild',
        'build',
        'mv',
        'archive',
        callback);
});