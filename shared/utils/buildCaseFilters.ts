export default function buildCaseFilters() {
  const filters: Array<any> = [];
  const colors = ["#EFC6DF", "#BC9AC8", "#AB397C", "#62426E", "#EC683A"];
  const INFO_ACCESS = {
    NO_INFO: "NÃO FOI POSSÍVEL CONSTATAR",
    NO_ACCESS: "NENHUM",
    LOW_ACCESS: "BAIXO",
    SOME_ACCESS: "MÉDIO",
    GOOD_ACCESS: "ALTO",
  };

  Object.values(INFO_ACCESS).forEach((access, i) => {
    const filter = [
      "==",
      ["get", "estado_basico__grau_institucionalizacao"],
      access,
    ];

    filters.push(filter);
    filters.push(colors[i]);
  });

  return filters;
}