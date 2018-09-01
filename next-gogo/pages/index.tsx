import Head from 'next/head';
import { Link } from '../src/routes';
import './index.scss';

export default () => <div>
    <Head>
        <title>KDO!</title>
        <meta name="viewport" content="initial-scale=1.0, width=device-width"/>
    </Head>
    <p>Welcom!</p>
    <img src="/static/kdo.jpg" alt="my image" style={{width: 100}}/>

    <div className='example'>
        <Link href="/articles">
            <a>게시판</a>
        </Link>{' '}
    </div>
</div>