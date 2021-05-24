import React from 'react'
import { AppProps } from 'next/app'
import { ThemeProvider } from 'styled-components'
import { StylesProvider } from '@material-ui/core'

import GlobalStyle from '../styles/global'
import theme from '../styles/theme'

const MyApp: React.FC<AppProps> = ({ Component, pageProps }) => {
  return (
    <StylesProvider injectFirst>
      <ThemeProvider theme={theme.dark}>
        <Component {...pageProps} />
        <GlobalStyle />
      </ThemeProvider>
    </StylesProvider>
  )
}

export default MyApp
