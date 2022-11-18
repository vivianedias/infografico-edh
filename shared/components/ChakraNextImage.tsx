import NextImage from "next/image";
import { Box } from "@chakra-ui/layout";

const ChakraNextImage = (props: any) => {
  const { src, alt, ...rest } = props;
  return (
    <Box position="relative" {...rest}>
      <NextImage objectFit="cover" src={src} alt={alt} />
    </Box>
  );
};

export default ChakraNextImage;


