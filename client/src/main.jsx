import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'

import App from './App.jsx'
import { Provider } from 'react-redux'


import { ThemeProvider, createTheme } from '@mui/material/styles'
import store from './redux/store.js'
import { GoogleOAuthProvider } from '@react-oauth/google'


// import styles from './styles.js'

// import { ThemeProvider } from '@mui/styles';
// import { CssBaseline } from '@mui/material';

const theme = createTheme()
createRoot(document.getElementById('root')).render(
  <GoogleOAuthProvider
    clientId='858686220479-k04n60cot6rnrs34j7rk0sr1ph6f7pko.apps.googleusercontent.com'
  >

    <StrictMode>
      <Provider store={store}>
        <ThemeProvider theme={theme}>
          <App />
        </ThemeProvider>
      </Provider>
    </StrictMode>,
  </GoogleOAuthProvider>
)