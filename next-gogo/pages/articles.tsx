import {Component} from 'react';
import {observer} from 'mobx-react';

//import ArticleList from '../components/article/ArticleList';

interface IArticle {
    id: number,
    title: string,
    content: string,
    writer: string,
    modifier?: string,
    regDate: Date,
    modDate?: Date,
}

interface IArticlesProps {
    articles: Array<IArticle>,
}

const getArticles = () => ([
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
    }
]);

@observer
class Articles extends Component<IArticlesProps> {
    static async getInitialProps(): Promise<IArticlesProps> {
        const result = {
            articles: getArticles(),
        };
        return result;
    }

    render() {
        const {articles} = this.props;
        return (
            <div>
                <table>
                    <thead>
                    <tr>
                        <th>no</th>
                        <th>title</th>
                        <th>write date</th>
                        <th>moifier</th>
                    </tr>
                    </thead>
                    <tbody>
                    {articles.map(article => {
                        return (
                            <tr>
                                <td>{article.id}</td>
                                <td>{article.title}</td>
                                <td>{article.modDate}</td>
                                <td>{article.modifier}</td>
                            </tr>
                        );
                    })}
                    </tbody>
                </table>
            </div>
        );
    }
}

export default Articles;