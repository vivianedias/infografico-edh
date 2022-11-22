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

export default function buildCaseFilters() {
  const filters: Array<any> = [];

  Object.keys(INFO_ACCESS).forEach((access, i) => {
    const filter = [
      "==",
      ["get", "estado_basico__grau_institucionalizacao"],
      access,
    ];

    filters.push(filter);
    filters.push(INFO_COLORS_PRIMARY[i]);
  });

  return filters;
}
