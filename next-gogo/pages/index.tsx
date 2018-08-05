import Head from 'next/head';
import Link from 'next/link';
import './index.scss';

export default () => <div>
    <Head>
        <title>KDO!</title>
        <meta name="viewport" content="initial-scale=1.0, width=device-width"/>
    </Head>
    <p>Welcom!</p>
    <img src="/static/kdo.jpg" alt="my image" style={{width: 100}}/>

    <div className='example'>
        <Link href="/about">
            <a>About</a>
        </Link>
        <Link href="/a">
            <a>a</a>
        </Link>
        <Link href="/b">
            <a>b</a>
        </Link>
    </div>
</div>