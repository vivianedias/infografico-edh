import '../styles/globals.css'
import "@fontsource/montserrat/400.css"
import "@fontsource/montserrat/700.css"
import "@fontsource/montserrat/300.css"
import 'mapbox-gl/dist/mapbox-gl.css';

import type { AppProps } from 'next/app'
import { ChakraProvider, extendTheme, VStack } from '@chakra-ui/react'
import { SWRConfig } from "swr";
import { appWithTranslation } from 'next-i18next';
export { reportWebVitals } from 'next-axiom';

import customTheme from '../shared/theme'
import { Header, Footer, Analytics } from '../shared/components'
import fetcher from '../shared/utils/fetcher'
import { IS_IN_MAINTENANCE } from '@/shared/utils/constants';

const theme = extendTheme(customTheme)

function App({ Component, pageProps }: AppProps) {
  return (
    <>
      <ChakraProvider theme={theme}>
        <SWRConfig value={{ fetcher }}>
          <Header />
          <VStack
            maxWidth="100vw"
            minHeight="calc(100vh - 120px)"
            justifyContent="center"
            alignItems="center"
            as="main"
            py={IS_IN_MAINTENANCE ? 0 : [8, 16]}
          >
            <Component {...pageProps} />
          </VStack>
          <Footer />
        </SWRConfig>
      </ChakraProvider>
      <Analytics />
    </>
  )
}

export default appWithTranslation(App)
