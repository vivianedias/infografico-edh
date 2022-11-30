import { ComponentType } from "react";

import { Circle, Box, Icon, VStack, Text } from "@chakra-ui/react";
import StatusIcon from "./StatusIcons";

export default function IconWithEmoji({
  MainIcon,
  status,
  gradient,
  category,
}: {
  MainIcon: ComponentType;
  gradient: string;
  category: string;
  status: string;
}) {
  return (
    <VStack justify={"center"} align={"center"}>
      <Box position="relative">
        <Icon as={MainIcon} boxSize={10} backgroundColor={"transparent"} />
        <Circle
          position="absolute"
          bottom={0}
          left={"30px"}
          size={5}
          bgColor={`brand.gradient.${gradient}.primary`}
        >
          <StatusIcon
            gradient={gradient}
            status={status}
            category={category.toLowerCase()}
          />
        </Circle>
      </Box>
      <Text
        lineHeight={"none"}
        fontWeight={700}
        textAlign={"center"}
        fontSize={"sm"}
      >
        {category}
      </Text>
    </VStack>
  );
}
