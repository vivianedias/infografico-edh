import { useTranslation } from "next-i18next";

import { Box, Icon, Tooltip } from "@chakra-ui/react";
import { CheckIcon, XMarkIcon } from "@heroicons/react/24/solid";
import { MinusCircleIcon } from "@heroicons/react/24/outline";

export default function StatusIcon({
  gradient,
  status,
  category,
}: {
  gradient: string;
  status: string;
  category: string;
}) {
  const { t } = useTranslation("home");
  const iconStatusText = t(`popup.icons.${status}`);

  switch (status) {
    case "SIM":
      return (
        <Tooltip
          hasArrow
          label={`${iconStatusText} ${category}`}
          bg="brand.light"
          color="brand.primary"
        >
          <Icon
            as={CheckIcon}
            boxSize={4}
            color={`brand.gradient.${gradient}.text`}
          />
        </Tooltip>
      );
    case "NÃO":
      return (
        <Tooltip
          hasArrow
          label={`${iconStatusText} ${category}`}
          bg="brand.light"
          color="brand.primary"
        >
          <Icon
            as={XMarkIcon}
            boxSize={4}
            color={`brand.gradient.${gradient}.text`}
          />
        </Tooltip>
      );
    case "PARCIALMENTE":
      return (
        <Tooltip
          hasArrow
          label={`${iconStatusText} ${category}`}
          bg="brand.light"
          color="brand.primary"
        >
          <Box
            h={4}
            w={2}
            display={"inline-block"}
            bgColor={`brand.gradient.${gradient}.text`}
            borderBottomRightRadius={4}
            borderTopRightRadius={4}
            position={"absolute"}
            right={"2px"}
          />
        </Tooltip>
      );
    case "NÃO FOI POSSÍVEL CONSTATAR":
      return (
        <Tooltip
          hasArrow
          label={`${iconStatusText} ${category}`}
          bg="brand.light"
          color="brand.primary"
        >
          <Icon
            as={MinusCircleIcon}
            boxSize={4}
            color={`brand.gradient.${gradient}.text`}
          />
        </Tooltip>
      );
    default:
      return <></>;
  }
}
