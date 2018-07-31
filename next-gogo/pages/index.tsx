import Head from 'next/head';
import Link from 'next/link';

export default () => <div>
  <Head>
    <title>KDO!</title>
    <meta name="viewport" content="initial-scale=1.0, width=device-width" />
  </Head>
  <p>Welcom!</p>
  <img src="/static/kdo.jpg" alt="my image" style={{width: 100}}/>
  <Link href="/about">
      <a>About</a>
  </Link>
</div>