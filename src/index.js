import React from 'react'
import ReactDOM from 'react-dom'
import { Provider } from 'react-redux'
import { BrowserRouter } from 'react-router-dom'

import 'bootstrap/dist/css/bootstrap.min.css'
import './index.scss'
import '@devexpress/dx-react-grid-bootstrap4/dist/dx-react-grid-bootstrap4.css'
import 'swiper/css/bundle'
import store from 'store'
import App from 'components/App'
import { StylesProvider, ThemeProvider } from '@material-ui/core'
import { theme } from './material-ui/theme'

ReactDOM.render(
  <BrowserRouter>
    <ThemeProvider theme={theme}>
      <StylesProvider injectFirst>
        <Provider store={store}>
          <App />
        </Provider>
      </StylesProvider>
    </ThemeProvider>
  </BrowserRouter>,
  document.getElementById('root')
)
///
