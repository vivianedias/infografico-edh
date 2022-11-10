import useSWR from "swr";

interface BrazilGeojsonType {
  children(param: { data: Array<{}>; error: string }): React.ReactElement;
}

const BrazilGeojson: React.FunctionComponent<BrazilGeojsonType> = ({
  children,
}) => {
  const { data, error } = useSWR("/api/brazilstates");

  if (error) return <div>Failed to load</div>;

  if (!data) return <div>Loading...</div>;

  return children({ data, error });
}

export default BrazilGeojson
