export type BrazilStatesGeojson = Array<{
  type: string;
  features: Array<Record<string, any>>;
}>;

export type Feature = {
  id: number;
  properties: {
    cartodb_id: number;
    codigo_ibg: string;
    created_at: string;
    id: number;
    name: string;
    regiao_id: string;
    sigla: string;
    updated_at: string;
  }
}