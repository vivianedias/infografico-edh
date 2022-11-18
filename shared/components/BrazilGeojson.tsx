import useSWRImmutable from "swr/immutable";
import { Response } from "../types/airtable";
import { BrazilStatesGeojson, Feature } from "../types/geojson";

interface BrazilGeojsonType {
  children(param: {
    data: BrazilStatesGeojson;
    error: string;
  }): React.ReactElement;
  tableData: Response[];
}

function addInfoAccessPropertyToShape(
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

const BrazilGeojson: React.FunctionComponent<BrazilGeojsonType> = ({
  children,
  tableData,
}) => {
  const { data, error } = useSWRImmutable("/api/brazilstates");

  if (error) return <div>Failed to load</div>;

  if (!data) return <div>Loading...</div>;

  const shapeWithTableProperties = addInfoAccessPropertyToShape(
    data.features,
    tableData
  );

  return children({
    data: {
      ...data,
      features: shapeWithTableProperties,
    },
    error,
  });
};

export default BrazilGeojson;
