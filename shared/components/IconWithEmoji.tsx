import { Circle, Box, Icon, VStack, Text } from "@chakra-ui/react";
import { ComponentType } from "react";

export default function IconWithEmoji({
  MainIcon,
  EmojiIcon,
  emojiBgColor,
  category,
}: {
  MainIcon: ComponentType;
  EmojiIcon: ComponentType;
  emojiBgColor: string;
  category: string;
}) {
  return (
    <VStack justify={"center"} align={"center"}>
      <Box position="relative">
        <Icon as={MainIcon} boxSize={"50px"} backgroundColor={"transparent"} />
        <Circle
          position="absolute"
          bottom={0}
          left={"30px"}
          size={6}
          bgColor={emojiBgColor}
        >
          <Icon as={EmojiIcon} boxSize={5} color={"brand.primary"} />
        </Circle>
      </Box>
      <Text
        lineHeight={6}
        textAlign={"center"}
        fontSize={"xl"}
        color={"brand.primary"}
      >
        {category}
      </Text>
    </VStack>
  );
}
