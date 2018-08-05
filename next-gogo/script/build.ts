import { info } from '../src/core/log';
import * as rimraf from 'rimraf';
info('test');
//clean
console.log(rimraf)

//
rimraf('./.next', error => {
    if (error) {
        console.log(error);
        return;
    }
    console.log('clear');
});

//준비
//빌드
//패키지
//디플로이