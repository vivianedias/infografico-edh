import { Box, Flex, HStack } from "@chakra-ui/react";
import { useTranslation } from 'next-i18next';
import { IS_IN_MAINTENANCE } from '../utils/constants';

import Logo from "./Logo"

export default function Footer() {
  const { t } = useTranslation('footer');

  if (IS_IN_MAINTENANCE) {
    return null
  }

  return (
    <Box width={"100%"} as="header">
      <Flex
        bg={"black"}
        minH={{ base: "190px", md: "385px" }}
        w={"100%"}
        align={"center"}
        justify={"center"}
      >
        <HStack
          maxW={{ base: "550px", md: "1080px" }}
          w={"90%"}
          align={{ base: "flex-start", md: "center" }}
          justify={{ base: "space-between", md: "start"}}
          spacing={20}
          paddingRight={{ base: "15px", md: "0" }}
        >
          <Logo t={t} w={{ base: "300px", md: 225 }} />
        </HStack>
      </Flex>
    </Box>
  )
}