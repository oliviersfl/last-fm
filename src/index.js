import 'react-app-polyfill/ie11';
import 'react-app-polyfill/stable';
import ReactDOM from 'react-dom';
import App from './components/App';

import 'semantic-ui-css/semantic.min.css';

ReactDOM.render(<App />, document.querySelector('#root'));