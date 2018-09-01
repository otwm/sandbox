import {observable, action} from 'mobx';

const getId = () => {
    const { random, floor } = Math;
    return floor(random() * 1000);
};

const defTransportLayer = {
    onReceiveArticleUpdate(values){
        console.log(values);
    }
};

export class ArticleQueryStore {
    @observable title: string;
    @observable content: string;
    @observable writer: string;
}

enum SyncState {
    Created,
    Synched,
    UnSynched,
}

interface IRecord{
    synchronized: SyncState;
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
            this.search(query);
        }
    }

    updateArticleFromServer(articles){
        console.log(articles);
    }

    @action
    search(query){
        console.log(query);
    }

    @action
    add(article){
        this.articles.push(article);
        return article;
    }

    @action
    addAll(articles){
        this.articles = this.articles.concat(articles.map(item => ({ synchronized : SyncState.Created, data:item })));
    }

    @action
    flush(){
        this.transportLayer.batchUpdate(
            this.articles.filter(article => !article.synchronized)
                .map(article => article.data)
        );
        this.deleteArticles.push(this.transportLayer.removeAll(this.deleteArticles));
    }

    @action
    removeArticle(id){
        const index = this.articles.findIndex(article => article.data.id === id);
        const deletedArticle = this.articles.splice(index, 1)[0];
        deletedArticle.synchronized = SyncState.UnSynched;
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
        this.id = getId();
        this.title = title;
        this.content = content;
        this.writer = writer;
        this.regDate = regDate;
    }

    @action
    update(article){
        console.log(article);
    }

    @action
    remove(){

    }
}

export default ArticleStore;
