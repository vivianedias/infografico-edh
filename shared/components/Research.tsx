import {
  ModalBody,
  Modal,
  Text,
  useDisclosure,
  Heading,
  Link,
  Button,
  Flex,
  ModalOverlay,
  ModalContent,
  ModalCloseButton,
  ModalHeader,
  Divider,
} from "@chakra-ui/react";
import { useTranslation } from "next-i18next";

function CustomModal({
  isOpen,
  onClose,
}: {
  isOpen: boolean;
  onClose: () => void;
}) {
  const { t } = useTranslation("home");
  console.log({ isOpen });
  return (
    <Modal onClose={onClose} isOpen={isOpen} isCentered size={"2xl"}>
      <ModalOverlay />
      <ModalContent py={12} px={20} bgColor={"brand.light"}>
        <ModalCloseButton
          color={"brand.primary"}
          border={"2px solid"}
          borderColor={"brand.primary"}
          borderRadius={"full"}
          p={2.5}
          _hover={{
            bgColor: "brand.light",
            opacity: 0.5,
          }}
        />
        <ModalHeader p={0}>
          <Heading color={"brand.primary"} size={"xl"} pb={4}>
            {t("methodologyPopup.title")}
          </Heading>
          <Divider borderColor={"brand.pink"} borderWidth={"2px"} w={"200px"} />
        </ModalHeader>
        <ModalBody p={0} mt={5}>
          <Text fontSize={"md"} lineHeight={"151.5%"} color={"brand.primary"}>
            {t("methodologyPopup.description")}{" "}
            <Link href={"#"} textDecor={"underline"}>
              {t("methodologyPopup.link")}
            </Link>
          </Text>
        </ModalBody>
      </ModalContent>
    </Modal>
  );
}

export default function Research() {
  const { t } = useTranslation("home");
  const modal = useDisclosure();

  return (
    <>
      <Flex align={"center"} mt={10}>
        <Text color={"brand.primary"}>{t("research")} </Text>
        <Button
          fontWeight={700}
          textDecor={"underline"}
          onClick={modal.onOpen}
          variant={"link"}
          color={"brand.primary"}
          fontSize={"md"}
          minW={"110px"}
          minH={"20px"}
        >
          {t("clickLink")}
        </Button>
      </Flex>
      <Text color={"brand.primary"}>
        {t("resources")}{" "}
        <Link href={"#"} fontWeight={700} textDecor={"underline"}>
          {t("accessLink")}
        </Link>
      </Text>
      <CustomModal {...modal} />
    </>
  );
}
