import ReactDOM from 'react-dom/client';
import { Provider } from 'react-redux';
import './styles/global.css';
import { store } from './store/store';
import { AppRouter } from './routes/AppRouter';

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
  <Provider store={store}>
    <AppRouter />
  </Provider>,
);
