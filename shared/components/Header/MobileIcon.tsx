import { Icon, IconButton } from "@chakra-ui/react";
import { Bars3Icon } from "@heroicons/react/20/solid";


const MobileIcon = ({ t, onToggle }: MobileIconType) => {
  return (
    <IconButton
      display={{base: "inline", md: "none"}}
      onClick={onToggle}
      icon={<Icon as={Bars3Icon} boxSize={"1.5em"} color={"header.button"} />}
      variant={"ghost"}
      aria-label={t("navigation")}
      colorScheme={"header.menuBackground"}
    />
  );
};

type TranslationType = (param: string) => string;

type MobileIconType = {
  t: TranslationType;
  onToggle: () => void;
}

export default MobileIcon;
