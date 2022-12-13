import { useCallback } from "react";
import { useTranslation } from "next-i18next";
import { Flex, HStack, IconButton, Text } from "@chakra-ui/react";
import { ChevronLeftIcon, ChevronRightIcon } from "@heroicons/react/24/outline";

export default function Pagination({
  page,
  setPage,
  gradient,
}: {
  page: number;
  setPage: (param: number) => void;
  gradient: string;
}) {
  const { t } = useTranslation("home");

  const goToFirstPage = useCallback(() => {
    setPage(0);
  }, [setPage]);

  const goToLastPage = useCallback(() => {
    setPage(1);
  }, [setPage]);

  return (
    <HStack color={"brand.primary"}>
      <IconButton
        icon={<ChevronLeftIcon />}
        aria-label={t("popup.pagination.left")}
        onClick={goToFirstPage}
        variant={"link"}
        disabled={page === 1}
        size={"xs"}
        color={"brand.primary"}
      />
      <Flex>
        <Text fontWeight={page === 1 ? 700 : 400}>1</Text>
        <Text as={"span"}>/</Text>
        <Text fontWeight={page === 2 ? 700 : 400}>2</Text>
      </Flex>
      <IconButton
        icon={<ChevronRightIcon />}
        aria-label={t("popup.pagination.right")}
        onClick={goToLastPage}
        variant={"link"}
        disabled={page === 2}
        size={"xs"}
        color={"brand.primary"}
      />
    </HStack>
  );
}
