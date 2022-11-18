import { Button, ButtonGroup, Icon, Link } from "@chakra-ui/react";;
import { ChevronRightIcon } from "@heroicons/react/24/outline";

type TranslationType = (param: string) => string;

const DonateButton = ({ t }: { t: TranslationType }) => {
  const donateHref = "https://app.doare.org/br/doacao/229743/instituto-aurora/por-um-mundo-onde-nenhuma-vida-vale-menos-do-que-outra"

  return (
    <Link
      href={donateHref}
      isExternal
      _hover={{textDecoration: "solid"}}
    >
      <ButtonGroup size="sm" isAttached variant="outline">
        <Button
          maxW={"75px"}
          fontSize={"sm"}
          fontWeight={700}
          color={"white"}
          bg={"header.button"}
          borderRadius={0}
          textTransform={"uppercase"}
          rightIcon={<RightArrowIcon />}
          _groupHover={{ bg: "header.button" }}
        >
          {t("donateButton")}
        </Button>
      </ButtonGroup>
    </Link>
  );
};

const RightArrowIcon = () => {
  return (
    <Icon
      className="icon"
      as={ChevronRightIcon}
      display={"none"}
      _groupHover={{ display: "inline" }}
    />
  );
};

export default DonateButton;
