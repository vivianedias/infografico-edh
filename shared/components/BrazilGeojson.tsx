import { Text } from "@chakra-ui/react";
import { useTranslation } from "next-i18next";
import useSWRImmutable from "swr/immutable";
import { BrazilStatesGeojson } from "../types/geojson";

interface BrazilGeojsonType {
  children(param: { data: BrazilStatesGeojson }): React.ReactElement;
}

const BrazilGeojson: React.FunctionComponent<BrazilGeojsonType> = ({
  children,
}) => {
  const { data, error } = useSWRImmutable("/api/brazilstates");
  const { t } = useTranslation("home");

  if (error) return <Text>{t("errorMsg.loadingMapShape")}</Text>;

  if (!data) return <Text>{t("loading")}</Text>;

  return children({
    data,
  });
};

export default BrazilGeojson;
