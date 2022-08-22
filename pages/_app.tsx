import type { AppProps } from 'next/app'
import { ThemeProvider } from '@mui/material/styles';
import { appWithTranslation } from 'next-i18next';
import { Provider } from 'react-redux';

import PageWrapper from './page_wrapper';
import { light } from 'utils/theme'
import Form from 'components/Form'
import { store } from 'store'
import 'styles/globals.css'

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <ThemeProvider theme={light}>
      <Provider store={store}>
        <Form.Provider>
          <PageWrapper>
            <Component {...pageProps} />
          </PageWrapper>
        </Form.Provider>
      </Provider>
    </ThemeProvider>
  )
}

export default appWithTranslation(MyApp)
