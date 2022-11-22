import { Response } from "../types/airtable";
import { Feature } from "../types/geojson";

export default function addInfoAccessPropertyToShape(
  shapeFeatures: Feature[],
  table: Response[]
) {
  let tableData = table;

  return shapeFeatures.map((feature) => {
    const stateId = feature.properties.sigla;
    let stateInfoAccess;

    tableData = tableData.filter((state) => {
      if (state.estado__sigla === stateId) {
        stateInfoAccess = state.estado_basico__grau_institucionalizacao;
        return false;
      }
      return true;
    });

    return {
      ...feature,
      properties: {
        ...feature.properties,
        estado_basico__grau_institucionalizacao: stateInfoAccess || "",
      },
    };
  });
}
