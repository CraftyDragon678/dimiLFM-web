import React from 'react';
import ReactDOM from 'react-dom';
import 'codemirror/lib/codemirror.css';
import '@toast-ui/editor/dist/toastui-editor.css';
import dayjs from 'dayjs';

import * as serviceWorker from './serviceWorker';
import App from './App';

import 'dayjs/locale/ko';
import './socket';
import './styles/reset.css';
import './styles/index.css';
import './styles/Calendar.css';

dayjs.locale('ko');

ReactDOM.render(<App />, document.getElementById('root'));

serviceWorker.unregister();
