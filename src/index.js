import 'react-app-polyfill/ie11';
import 'react-app-polyfill/stable';
import ReactDOM from 'react-dom';
import App from './components/App';
import { CookiesProvider } from 'react-cookie';

import 'semantic-ui-css/semantic.min.css';
import 'semantic-ui-css/semantic.min.js';

ReactDOM.render(<CookiesProvider><App /></CookiesProvider>, document.querySelector('#root'));