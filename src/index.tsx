import React from 'react';
import ReactDOM from 'react-dom';
import 'codemirror/lib/codemirror.css';
import '@toast-ui/editor/dist/toastui-editor.css';

import * as serviceWorker from './serviceWorker';
import App from './App';

import './socket';
import './styles/reset.css';
import './styles/index.css';
import './styles/Calendar.css';

ReactDOM.render(<App />, document.getElementById('root'));

serviceWorker.unregister();
