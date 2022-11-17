import '../styles/globals.css'
import 'mapbox-gl/dist/mapbox-gl.css';
import { Montserrat } from '@next/font/google'
import { ChakraProvider, extendTheme, VStack } from '@chakra-ui/react'
import { SWRConfig } from "swr";
import { appWithTranslation } from 'next-i18next';
export { reportWebVitals } from 'next-axiom';
import type { AppProps } from 'next/app'

import customTheme from '../shared/theme'
import { Header, Footer, Analytics } from '../shared/components'
import fetcher from '../shared/utils/fetcher'
import { IS_IN_MAINTENANCE } from '@/shared/utils/constants';

const theme = extendTheme(customTheme)
const montserrat = Montserrat({ subsets: ['latin'] })

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
            className={montserrat.className}
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
