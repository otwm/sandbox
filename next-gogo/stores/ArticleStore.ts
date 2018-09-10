import {observable, action, toJS} from 'mobx';
import { path, map, toPairs, pipe } from 'ramda';

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
    storeName = 'ArticleQueryStore';
    @observable title: string;
    @observable content: string;
    @observable writer: string;

    initialize(data) {
    }
}

enum SyncState {
    Created,
    Synched,
    UnSynched,
}

interface IRecord {
    synchronized: SyncState;
    data: any;
}

class ArticleStore {
    storeName = 'ArticleStore';
    transportLayer;
    count = 0;
    @observable articles:Array<IRecord> = [];
    deleteArticles: Array<IRecord> = [];

    constructor(initValue) {
        const query = path('query', initValue);
        const transportLayer = path('transportLayer', initValue) || defTransportLayer;
        this.transportLayer = transportLayer;
        this.transportLayer.onReceiveArticleUpdate(articles => this.updateArticleFromServer(articles));

        if ( query != null ) {
            this.search(query);
        }
    }

    initialize(data) {
        const that = this;
        const bbb = toJS(data)
        debugger
        Object.entries(toJS(data)).map(item => ({ key: item[0], value: item[1] })).forEach(item => {
            console.log('item: ');
            console.log(item);
            if( that.hasOwnProperty(item.key) ) {
                that[item.key] = item.value;
            }
        })
        console.log('============');
        console.log(that);
        debugger
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
