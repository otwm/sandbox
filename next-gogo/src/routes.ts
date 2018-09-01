const Routes = require('next-routes');

interface Route {
  name: string;
  pattern: string;
  page: string;
};

const routesDef: Array<Route> = [
    { name: 'root', pattern: '/', page: 'index' },
    { name: 'articleList', pattern: '/articles', page: 'articles/articleList' },
    { name: 'articleDetail', pattern: '/articles/:id', page: 'articles/articleDetail' },
];

const getRoutes = () => {
    const result = Routes();
    routesDef.forEach(route => result.add(route));
    return result;
};

const routes = getRoutes();
const { Link } = routes;
export default routes;
export {
    Link,
};