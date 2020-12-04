import loadable from '@loadable/component';

export const Root = loadable(() => import('./Root'));
export const Login = loadable(() => import('./Login'));
export const Chat = loadable(() => import('./Chat'));
export const Search = loadable(() => import('./Search'));
export const NotFound = loadable(() => import('./NotFound'));

/* write */
export const WriteFound = loadable(() => import('./write/Found'));
export const WriteLost = loadable(() => import('./write/Lost'));
export const WriteMarket = loadable(() => import('./write/Market'));
export const WriteBook = loadable(() => import('./write/Book'));

/* board */
export const BoardFound = loadable(() => import('./board/found'));
export const BoardLost = loadable(() => import('./board/lost'));
export const BoardMarket = loadable(() => import('./board/market'));

/* article */
export const ArticleFound = loadable(() => import('./article/found'));
export const ArticleLost = loadable(() => import('./article/lost'));
export const ArticleMarket = loadable(() => import('./article/market'));
export const ArticleBook = loadable(() => import('./article/book'));
