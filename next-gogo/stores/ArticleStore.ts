import {observable} from 'mobx';

const defTransportLayer = {
    onReceiveArticleUpdate(values){
        console.log(values);
    }
};

interface IRecord{
    synchronized: boolean;
    data: any;
}

class ArticleStore {
    transportLayer;
    count = 0;
    @observable articles:Array<IRecord> = [];
    deleteArticles: Array<IRecord> = [];

    constructor({ query = null, transportLayer = defTransportLayer}) {
        this.transportLayer = transportLayer;
        this.transportLayer.onReceiveArticleUpdate(articles => this.updateArticleFromServer(articles));

        if ( query != null ) {
            this.loadArticle(query);
        }
    }

    updateArticleFromServer(articles){
        console.log(articles);
    }

    loadArticle(query){
        console.log(query);
    }

    add(article){
        this.articles.push(article);
        return article;
    }

    addAll(articles){
        this.articles = this.articles.concat(articles.map(item => ({ synchronized : false, data:item })));
    }

    flush(){
        this.transportLayer.batchUpdate(
            this.articles.filter(article => !article.synchronized)
                .map(article => article.data)
        );
        this.deleteArticles.push(this.transportLayer.removeAll(this.deleteArticles));
    }

    removeArticle(id){
        const index = this.articles.findIndex(article => article.data.id === id);
        const deletedArticle = this.articles.splice(index, 1)[0];
        deletedArticle.synchronized = false;
        this.deleteArticles.push(deletedArticle);
    }
}

export class Article {
    id: number;
    @observable title: string;
    @observable content: string;
    @observable writer: string;
    @observable modifier: string;
    @observable regDate: Date;
    @observable modDate: Date;

    constructor({title, content, writer, regDate}) {
        this.title = title;
        this.content = content;
        this.writer = writer;
        this.regDate = regDate;
    }

    update(article){
        console.log(article);
    }

    remove(){

    }
}

export default ArticleStore;
