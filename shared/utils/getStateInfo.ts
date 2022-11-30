import { StatesResponse } from "../types/airtable";
import { Feature } from "../types/geojson";

export default function getStateInfo({
  tableData,
  feature,
  selectedPeriod,
}: {
  tableData: StatesResponse[];
  feature: Feature;
  selectedPeriod: string;
}): StatesResponse {
  const stateInfo = tableData.find(
    (state) => state.estado__sigla === feature.properties.sigla
  );
  const stateWithOrgaosWithinPeriod = {
    ...stateInfo,
    orgaos: (stateInfo?.orgaos || []).filter(
      (o) => o.periodo === selectedPeriod
    ),
  };

  return stateWithOrgaosWithinPeriod as StatesResponse;
}
