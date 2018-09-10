import {Component} from 'react';
import {inject, observer, Provider} from 'mobx-react';
import DevTools from 'mobx-react-devtools';
import autobind from 'autobind-decorator';
import { path } from 'ramda';
import ArticleStore, { Article, ArticleQueryStore } from '../../stores/ArticleStore';
import {Link} from "../../src/routes";

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
@inject('articleStore', 'articleQueryStore')
class ArticleList extends Component<IArticlesProps> {
    constructor(props: IArticlesProps){
        super(props);
    }

    static async getInitialProps(): Promise<IArticlesProps> {
        const result = { articleStore , articleQueryStore };
        return result;
    }

    @autobind
    search() {
        const { articleStore, articleQueryStore: query } = this.props;
        articleStore.search(query);
    }

    render() {
        const { articleStore, articleQueryStore = { title: 0, content: '', writer: ''} } = this.props;
        const articles = path('articles', articleStore) ||[{data:{}}];
        return (
            <Provider articleStore={articleStore} >
                <div>
                    <div>
                        제목: <input type="text" value={articleQueryStore.title}
                                   onChange={({target: {value}})=> articleQueryStore.title = value}/>
                        내용: <input type="text" value={articleQueryStore.content}
                                   onChange={({target: {value}})=> articleQueryStore.content = value}/>
                        글쓴이: <input type="text" value={articleQueryStore.writer}
                                    onChange={({target: {value}})=> articleQueryStore.writer = value}/>
                        <button onClick={this.search} >검색</button>
                    </div>
                    <div>
                        <button>추가</button>
                        <button>삭제</button>
                    </div>
                    <table>
                        <thead>
                        <tr>
                            <th>check<input type="checkbox" /></th>
                            <th>no</th>
                            <th>title</th>
                            <th>write date</th>
                            <th>moifier</th>
                        </tr>
                        </thead>
                        <tbody>
                        {articles.map((article, index) => {
                            return (
                                <tr key={index}>
                                    <td><input type="checkbox" /></td>
                                    <td>{article.data.id}</td>
                                    <td><Link route={`/articles/${article.data.id}`}><a>{article.data.title}</a></Link></td>
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