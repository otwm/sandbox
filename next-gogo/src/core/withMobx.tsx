import React from 'react';
import { filter, map } from 'ramda';
import ArticleStore, {ArticleQueryStore} from "../../stores/ArticleStore";

const filterStore = props => filter( item => item.storeName, props );
const filterNotStore = props => filter( item => !item.storeName, props );

const allStores = {
    ArticleStore, ArticleQueryStore,
};

const storesInitialize = (stores) => {
    const findStore = (storeData) => {
        return new (allStores[storeData.storeName])();
    };
    const storeInitialize = (storeData) => {
        const store = findStore(storeData);
        store.initialize(store);
        return store;
    }
    return map(storeInitialize, stores);
};

interface IAppWithMobxProps {
    stores: any;
}

export default (App) => {
    return class AppWithMobx extends React.Component<IAppWithMobxProps> {
        static async getInitialProps (appContext) {
            let appProps: { pageProps?: object } = {};
            if (typeof App.getInitialProps === 'function') {
                appProps = await App.getInitialProps.call(App, appContext)
            }

            const stores = filterStore( appProps.pageProps );
            const pureProps = filterNotStore( appProps.pageProps );
            const newProps = Object.assign({}, appProps, { pageProps: pureProps })

            return {
                ...newProps,
                stores,
            }
        }

        constructor(props) {
            super(props);
        }

        render() {
            const { stores } = this.props;
            const v = storesInitialize(stores);
            console.log(v);
            return (
                <App { ...this.props } stores={v} />
            );
        }
    }
};
