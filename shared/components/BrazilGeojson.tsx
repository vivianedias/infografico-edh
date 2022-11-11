import useSWRImmutable from "swr/immutable";
import { BrazilStatesGeojson } from '../types/geojson'

interface BrazilGeojsonType {
  children(param: {
    data: BrazilStatesGeojson;
    error: string;
  }): React.ReactElement;
}

const BrazilGeojson: React.FunctionComponent<BrazilGeojsonType> = ({
  children,
}) => {
  const { data, error } = useSWRImmutable("/api/brazilstates");

  if (error) return <div>Failed to load</div>;

  if (!data) return <div>Loading...</div>;

  return children({ data, error });
};

export default BrazilGeojson;
