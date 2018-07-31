import log, { oops } from '../src/core/log';
import * as mkdirp from 'mkdirp';

mkdirp('./build', error => {
    if( error ){
        oops('prepare failed');
        return;
    }
    log('prepare work done!!!');
});
