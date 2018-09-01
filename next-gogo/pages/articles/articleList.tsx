import {Component} from 'react';
import {observer, Provider} from 'mobx-react';
import DevTools from 'mobx-react-devtools';
import ArticleStore, { Article, ArticleQueryStore } from '../../stores/ArticleStore';

interface IArticlesProps {
    articleStore: ArticleStore;
    articleQueryStore: ArticleQueryStore,
}

const articleStore = new ArticleStore({});
const articleQueryStore = new ArticleQueryStore();

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
class ArticleList extends Component<IArticlesProps> {
    static async getInitialProps(): Promise<IArticlesProps> {
        const result = { articleStore , articleQueryStore};
        return result;
    }

    render() {
        const { articleStore,  } = this.props;
        return (
            <Provider articleStore={articleStore} >
                <div>
                    <div>
                        제목: <input type="text" value={articleQueryStore.title}/>
                        내용: <input type="text" value={articleQueryStore.content}/>
                        글쓴이: <input type="text" value={articleQueryStore.writer}/>
                        <button onClick={()=>articleStore.search({})} >검색</button>
                    </div>
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
                        {articleStore.articles.map((article) => {
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
                    <DevTools />
                </div>
            </Provider>
        );
    }
}

export default ArticleList;