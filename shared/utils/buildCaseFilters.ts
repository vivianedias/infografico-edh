export const INFO_ACCESS = {
  HIGH: "ALTO",
  MEDIUM: "MÉDIO",
  LOW: "BAIXO",
  NONE: "NENHUM",
  NO_INFO: "NÃO FOI POSSÍVEL CONSTATAR",
};

export const INFO_COLORS_PRIMARY = [
  "#EC683A",
  "#62426E",
  "#AB397C",
  "#BC9AC8",
  "#EFC6DF",
];

export const INFO_COLORS_SECONDARY = [
  "#f6a589",
  "#9970a8",
  "#d378ae",
  "#e0cce7",
  "#fde9f6",
];

export function getColorByInfo(info: string) {
  const infoAccessIndex = Object.values(INFO_ACCESS).findIndex(
    (i) => i === info
  );
  if (infoAccessIndex === -1) return ["#dad6d5", 'brand.primary'];
  const text = infoAccessIndex <= 2 ? 'white' : "brand.primary"
  return [
    INFO_COLORS_PRIMARY[infoAccessIndex],
    text
  ];
}

export default function buildCaseFilters() {
  const filters: Array<any> = [];

  Object.values(INFO_ACCESS).forEach((access, i) => {
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
