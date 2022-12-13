import { HStack, VStack } from "@chakra-ui/react";
import {
  DocumentTextIcon,
  UsersIcon,
  BriefcaseIcon,
} from "@heroicons/react/24/outline";

import IconWithEmoji from "./IconWithEmoji";
import SecretaryContent from "./SecretaryContent";

import { OrgaosFields, StatesFields, StatesResponse } from "../types/airtable";
import { useTranslation } from "next-i18next";
import { INFO_ACCESS } from "../utils/buildCaseFilters";

type IconItemsReturn = {
  label: string;
  status: string;
  MainIcon: React.FC;
};

const ICON_ITEMS = (
  t: (param: string) => string,
  stateInfo: StatesFields
): IconItemsReturn[] => [
  {
    label: t("category.document"),
    status: stateInfo.estado_basico__documento_orientador,
    MainIcon: BriefcaseIcon,
  },
  {
    label: t("category.collegiate"),
    status: stateInfo.estado_basico__orgao_colegiado,
    MainIcon: UsersIcon,
  },
  {
    label: t("category.govern"),
    status: stateInfo.estado_basico__orgao_publico,
    MainIcon: DocumentTextIcon,
  },
];

export default function StateInfo({
  stateInfo,
  activeIndex,
  setActiveIndex,
  gradient,
}: {
  stateInfo: StatesResponse;
  activeIndex: number | null;
  setActiveIndex: React.Dispatch<React.SetStateAction<number | null>>;
  gradient: string;
}) {
  const { t } = useTranslation("home");
  const hasStateSecretaries = stateInfo.orgaos && stateInfo.orgaos.length > 0;

  return (
    <VStack
      spacing={8}
      overflowX={"hidden"}
      overflowY={hasStateSecretaries ? "auto" : "hidden"}
    >
      <HStack justify={"space-around"} color={"brand.primary"} spacing={16}>
        {ICON_ITEMS(t, stateInfo).map(({ label, ...rest }) => (
          <IconWithEmoji
            key={`icon-with-emoji-${label}`}
            category={label}
            gradient={gradient}
            {...rest}
          />
        ))}
      </HStack>
      {hasStateSecretaries ? (
        <SecretaryContent
          stateSecretaries={stateInfo.orgaos as OrgaosFields[]}
          activeIndex={activeIndex}
          gradient={gradient}
          setActiveIndex={setActiveIndex}
        />
      ) : null}
    </VStack>
  );
}
