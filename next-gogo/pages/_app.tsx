import App, { AppComponentProps , Container} from 'next/app';
import React from 'react';
import withMobx from "../src/core/withMobx";
import {Provider} from "mobx-react";

interface ExtendsAppProps extends AppComponentProps {
    stores: any;
}

class ExtendsApp extends App<ExtendsAppProps> {
    render () {
        const {Component, pageProps, stores } = this.props;
        return (
            <Container>
                <Provider { ...stores}>
                    <Component {...pageProps} />
                </Provider>
            </Container>
        );
    }
}

export default withMobx(ExtendsApp);