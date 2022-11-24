import { StatesResponse } from "../types/airtable";

export const INFO_ACCESS: Record<string, string> = {
  ALTO: "high",
  MÉDIO: "medium",
  BAIXO: "low",
  NENHUM: "none",
  "NÃO FOI POSSÍVEL CONSTATAR": "no_info",
};

export const INFO_COLORS_PRIMARY = [
  "#EC683A",
  "#62426E",
  "#AB397C",
  "#BC9AC8",
  "#EFC6DF",
];

export default function buildCaseFilters(tableData: StatesResponse[]) {
  const filters: Array<any> = [];

  tableData.forEach(
    ({ estado__sigla, estado_basico__grau_institucionalizacao }, i) => {
      const filter = ["==", ["get", "sigla"], estado__sigla];
      const colorGradingIndex = Object.keys(INFO_ACCESS).findIndex(
        (value) => value === estado_basico__grau_institucionalizacao
      );
      filters.push(filter);
      filters.push(INFO_COLORS_PRIMARY[colorGradingIndex]);
    }
  );

  return filters;
}
