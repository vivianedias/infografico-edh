import { HStack, Text } from "@chakra-ui/react";
import Link from "next/link";

export default function Home() {
  return (
    <HStack>
      <Link href={"/"} locale="pt-BR">
        <Text as="b" color={"brand.primary"} fontSize={"sm"}>
          {"PT-BR"}
        </Text>
      </Link>
      <Text as="b" color={"brand.primary"} fontSize={"sm"}>
        {"|"}
      </Text>
      <Link color={"brand.primary"} href={"/en"} locale={false}>
        <Text as="b" color={"brand.primary"} fontSize={"sm"}>
          {"EN"}
        </Text>
      </Link>
    </HStack>
  );
}
