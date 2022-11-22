import {
  Box,
  Divider,
  HStack,
  ListItem,
  Text,
  List,
  VStack,
} from "@chakra-ui/react";
import { useTranslation } from "next-i18next";
import { INFO_ACCESS } from "../utils/buildCaseFilters";

export default function Legend() {
  const { t } = useTranslation("home");

  return (
    <Box
      position="absolute"
      width={"180px"}
      height={"fit-content"}
      bottom={"40px"}
      left={"50px"}
      backgroundColor={"brand.light"}
      rounded={"md"}
      boxShadow="md"
      px={6}
      py={3}
    >
      <VStack spacing={4}>
        <Text
          fontWeight={600}
          fontSize={"sm"}
          color={"brand.primary"}
          lineHeight={4}
        >
          {t("legend.title")}
        </Text>
        <Divider borderColor={"brand.pink"} borderWidth={"0.5px"} />
        <List spacing={3}>
          {Object.values(INFO_ACCESS).map((label, i) => {
            return (
              <ListItem key={`${label}-${i}`}>
                <HStack spacing={2}>
                  <Box
                    minWidth={"20px"}
                    height={"12px"}
                    backgroundColor={`brand.gradient.${label}.primary`}
                  />
                  <Text
                    fontSize={"xs"}
                    color={"brand.primary"}
                    fontWeight={500}
                    lineHeight={4}
                  >
                    {t(`legend.${label.toLowerCase()}`)}
                  </Text>
                </HStack>
              </ListItem>
            );
          })}
        </List>
      </VStack>
    </Box>
  );
}
