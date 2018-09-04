import React from 'react';
import { filter } from 'ramda';

const filterStore = props => filter( item => item.storeName, props );

const filterNotStore = props => filter( item => !item.storeName, props );

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
            return (
                <App { ...this.props } stores={stores} />
            );
        }
    }
};
