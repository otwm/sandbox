import * as React from 'react';
import {shallow} from 'enzyme';
import Articles from '../articles';

const articles = [
    {
        id: 1,
        title: '새글',
        content: 'content',
        writer: 'kdo',
        regDate: new Date(),
    },
    {
        id: 2,
        title: '부드러운 여행용 티슈',
        content: 'content',
        writer: 'kdo',
        regDate: new Date(),
    },
    {
        id: 3,
        title: 'aaabc',
        content: 'content',
        writer: 'kdo',
        regDate: new Date(),
        modifier: 'kdo',
        modDate: new Date(),
    },
];

describe('aricles test', () => {
    it('aricles count', () => {
        const articlesPage = shallow(<Articles articles={articles}/>);
        expect(articlesPage.find('table tbody tr').length).toEqual(3);
    });
});
