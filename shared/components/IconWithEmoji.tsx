import { Circle, Box, Icon, VStack, Text, calc } from "@chakra-ui/react";
import { ComponentType } from "react";
import { CheckIcon, XMarkIcon } from "@heroicons/react/24/solid";

function renderStatusIcon({
  gradient,
  status,
}: {
  gradient: string;
  status: string;
}) {
  switch (status) {
    case "SIM":
      return (
        <Icon
          as={CheckIcon}
          boxSize={4}
          color={`brand.gradient.${gradient}.text`}
        />
      );
    case "NÃO":
      return (
        <Icon
          as={XMarkIcon}
          boxSize={4}
          color={`brand.gradient.${gradient}.text`}
        />
      );
    case "PARCIALMENTE":
      return (
        <Box
          h={"1.125rem"}
          w={"0.563rem"}
          display={"inline-block"}
          bgColor={`brand.gradient.${gradient}.text`}
          borderBottomRightRadius={"1.125rem"}
          borderTopRightRadius={"1.125rem"}
          position={"absolute"}
          right={"2px"}
        />
      );
    case "NÃO FOI POSSÍVEL CONSTATAR":
      return (
        <Box
          boxSize={"1.125rem"}
          display={"inline-block"}
          bgColor={"brand.light"}
          borderRadius={"full"}
        />
      );
  }
}

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
        <Icon
          as={MainIcon}
          boxSize={"2.5rem"}
          backgroundColor={"transparent"}
        />
        <Circle
          position="absolute"
          bottom={0}
          left={"30px"}
          size={5}
          bgColor={`brand.gradient.${gradient}.primary`}
        >
          {renderStatusIcon({
            gradient,
            status,
          })}
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
