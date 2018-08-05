import { Component } from 'react';

interface IArticle {
    id: number,
    title: string,
    content: string,
    writer: string,
    modifier?: string,
    regDate: Date,
    modDate?: Date,
}

interface IArticleListProps {
    article: IArticle,
}

const getArticle = () => ({
    id: 1,
    title: 'title',
    content: 'content',
    writer: 'kdo',
    regDate: new Date(),
});

class ArticleList extends Component<IArticleListProps>{
    static async getInitialProps(): Promise<IArticleListProps>  {
        const result = {
            article: getArticle(),
        };
        return result;
    }

    render() {
        const { article } = this.props;
        return (
            <div>
                <table>
                    <tbody>
                        <tr>
                            <td>{article.id}</td>
                            <td>{article.title}</td>
                            <td>{article.modDate}</td>
                            <td>{article.modifier}</td>
                        </tr>
                    </tbody>
                </table>
            </div>
        );
    }
}

export default ArticleList;