import { useTranslation } from "next-i18next";

import { Box, Icon, Tooltip } from "@chakra-ui/react";
import { CheckIcon, XMarkIcon } from "@heroicons/react/24/solid";
import { MinusCircleIcon } from "@heroicons/react/24/outline";

export default function StatusIcon({
  gradient,
  status,
  documentName,
  collegiateName,
  category,
  size,
}: {
  gradient: string;
  status: string;
  documentName?: any;
  collegiateName?: any;
  category: string;
  size: string;
}) {
  const { t } = useTranslation("home");
  const iconStatusText = t(`popup.icons.${status}`);
  const outerSize = size === "sm" ? 3 : 4;
  const innerSize = size === "sm" ? 1.5 : 2;

  const tootipLabel =
    documentName ?? collegiateName ?? `${iconStatusText} ${category}`;

  switch (status) {
    case "SIM":
      return (
        <Tooltip
          hasArrow
          label={tootipLabel}
          bg="brand.light"
          color="brand.primary"
        >
          <Icon
            as={CheckIcon}
            boxSize={outerSize}
            color={`brand.gradient.${gradient}.text`}
          />
        </Tooltip>
      );
    case "NÃO":
      return (
        <Tooltip
          hasArrow
          label={tootipLabel}
          bg="brand.light"
          color="brand.primary"
        >
          <Icon
            as={XMarkIcon}
            boxSize={outerSize}
            color={`brand.gradient.${gradient}.text`}
          />
        </Tooltip>
      );
    case "PARCIALMENTE":
      return (
        <Tooltip
          hasArrow
          label={tootipLabel}
          bg="brand.light"
          color="brand.primary"
        >
          <Box
            h={outerSize}
            w={innerSize}
            display={"inline-block"}
            bgColor={`brand.gradient.${gradient}.text`}
            borderBottomRightRadius={"lg"}
            borderTopRightRadius={"lg"}
            position={"absolute"}
            right={"2px"}
          />
        </Tooltip>
      );
    case "NÃO FOI POSSÍVEL CONSTATAR":
      return (
        <Tooltip
          hasArrow
          label={tootipLabel}
          bg="brand.light"
          color="brand.primary"
        >
          <Icon
            as={MinusCircleIcon}
            boxSize={outerSize}
            color={`brand.gradient.${gradient}.text`}
          />
        </Tooltip>
      );
    default:
      return <></>;
  }
}

StatusIcon.defaultProps = {
  size: "md",
};
