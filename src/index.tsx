import ReactDOM from 'react-dom/client';
import { Provider } from 'react-redux';
import { ThemeProvider } from '@mui/material';
import { ToastContainer } from 'react-toastify';
import { store } from 'redux/store';
import { theme } from 'theme';
import App from 'components/App';
import 'styles/index.scss';
import 'react-toastify/dist/ReactToastify.css';

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement,
);

root.render(
  <Provider store={store}>
    <ThemeProvider theme={theme}>
      <App />
      <ToastContainer
        position='bottom-right'
        autoClose={3000}
        hideProgressBar={false}
        newestOnTop
        pauseOnHover={false}
        draggable
        closeOnClick
        className='toaster'
      />
    </ThemeProvider>
  </Provider>,
);
