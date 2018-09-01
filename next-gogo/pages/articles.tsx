import {Component} from 'react';
import {observer, Provider} from 'mobx-react';
import ArticleStore, { Article } from '../stores/ArticleStore';

//import ArticleList from '../components/article/ArticleList';

interface IArticlesProps {
    articleStore: ArticleStore;
}

const articleStore = new ArticleStore({});

const getArticlesData = () => ([
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

//init
articleStore.addAll(getArticlesData().map(item => new Article(item)));

@observer
class Articles extends Component<IArticlesProps> {
    static async getInitialProps(): Promise<IArticlesProps> {
        const result = { articleStore };
        return result;
    }

    render() {
        const { articleStore } = this.props;
        return (
            <Provider articleStore={articleStore} >
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
                        {articleStore.articles.map(article => {
                            return (
                                <tr key={article.data.id}>
                                    <td>{article.data.id}</td>
                                    <td>{article.data.title}</td>
                                    <td>{article.data.modDate}</td>
                                    <td>{article.data.modifier}</td>
                                </tr>
                            );
                        })}
                        </tbody>
                    </table>
                </div>
            </Provider>
        );
    }
}

export default Articles;