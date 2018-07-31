import log, { oops } from '../src/core/log';
import * as rimraf from 'rimraf';

rimraf('./.next ./build', error => {
    if (error) {
        oops('clean failed!');
        oops(error);
        return;
    }
    log('clean work success!');
});
