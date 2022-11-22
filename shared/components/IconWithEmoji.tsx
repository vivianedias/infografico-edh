import { Circle, Box, Icon, VStack, Text } from "@chakra-ui/react";
import { ComponentType } from "react";

export default function IconWithEmoji({
  MainIcon,
  EmojiIcon,
  gradient,
  category,
}: {
  MainIcon: ComponentType;
  EmojiIcon: ComponentType;
  gradient: string;
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
          bgColor={`brand.gradient.${gradient}.primary`}
        >
          <Icon
            as={EmojiIcon}
            boxSize={5}
            color={`brand.gradient.${gradient}.text`}
          />
        </Circle>
      </Box>
      <Text
        lineHeight={"base"}
        fontWeight={500}
        textAlign={"center"}
        fontSize={"xl"}
      >
        {category}
      </Text>
    </VStack>
  );
}
