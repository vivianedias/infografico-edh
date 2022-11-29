import "../styles/globals.css";
import "mapbox-gl/dist/mapbox-gl.css";
import { ChakraProvider, extendTheme, VStack } from "@chakra-ui/react";
import { SWRConfig } from "swr";
import { appWithTranslation } from "next-i18next";
export { reportWebVitals } from "next-axiom";
import type { AppProps } from "next/app";

import customTheme from "../shared/theme";
import { Header, Footer, Analytics } from "../shared/components";
import fetcher from "../shared/utils/fetcher";
import { IS_IN_MAINTENANCE } from "@/shared/utils/constants";

import "@fontsource/montserrat/300.css";
import "@fontsource/montserrat/400.css";
import "@fontsource/montserrat/500.css";
import "@fontsource/montserrat/700.css";

const theme = extendTheme(customTheme);

function App({ Component, pageProps }: AppProps) {
  return (
    <>
      <ChakraProvider theme={theme}>
        <SWRConfig value={{ fetcher }}>
          <Header />
          <VStack
            maxWidth="100vw"
            minHeight="calc(100vh - 7.5rem - 25rem)"
            justifyContent="flex-start"
            alignItems="center"
            as="main"
            py={IS_IN_MAINTENANCE ? 0 : { base: 8, md: 16 }}
            px={IS_IN_MAINTENANCE ? 0 : { base: 10, md: 24 }}
            backgroundColor={"white"}
          >
            <Component {...pageProps} />
          </VStack>
          <Footer />
        </SWRConfig>
      </ChakraProvider>
      <Analytics />
    </>
  );
}

export default appWithTranslation(App);
