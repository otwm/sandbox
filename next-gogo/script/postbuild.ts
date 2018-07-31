import log from '../src/core/log';
import * as gulp from 'gulp';
import * as zip from 'gulp-zip';
import * as moment from 'moment';

const archive = () => {
    return gulp.src(['./build/**'], { dot: true })
        .pipe(zip(`dev-next-gogo-${moment().format('YYYY-MM-DD-hh:mm:ss')}.zip`))
        .pipe(gulp.dest('./build'));
};

archive();
log('postbuild work done!!!');

gulp.task('archive', archive);