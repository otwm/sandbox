import * as debug from 'debug'

/**
 * 기본 로그
 */
const log = debug('app:log');
/**
 * 에러
 */
const error = debug('app:error');
/**
 * 기타 정보
 */
const info = debug('app:info');

export default log;

export {
    error,
    info
};
