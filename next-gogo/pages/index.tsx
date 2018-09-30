import React from 'react';
import Link from 'next/link';
import { style } from 'typestyle';

const className = style({color: 'red'});
export default () => (
    <div>
        <div className={className}>ok test</div>
      <ul>
        <li><Link href='/a' as='/a'><a>a</a></Link></li>
        <li><Link href='/b' as='/b'><a>b</a></Link></li>
      </ul>
    </div>
);
