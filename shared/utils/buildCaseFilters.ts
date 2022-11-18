export const INFO_ACCESS = {
  HIGH: "ALTO",
  MEDIUM: "MÉDIO",
  LOW: "BAIXO",
  NONE: "NENHUM",
  NO_INFO: "NÃO FOI POSSÍVEL CONSTATAR",
};

export const INFO_COLORS = [
  "#EC683A",
  "#62426E",
  "#AB397C",
  "#BC9AC8",
  "#EFC6DF",
];

export default function buildCaseFilters() {
  const filters: Array<any> = [];

  Object.values(INFO_ACCESS).forEach((access, i) => {
    const filter = [
      "==",
      ["get", "estado_basico__grau_institucionalizacao"],
      access,
    ];

    filters.push(filter);
    filters.push(INFO_COLORS[i]);
  });

  return filters;
}
