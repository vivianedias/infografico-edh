export default function buildCaseFilters() {
  const filters: Array<any> = [];
  const colors = ["#fed976", "#feb24c", "#fd8d3c", "#fc4e2a", "#e31a1c"];
  const INFO_ACCESS = {
    NO_ACCESS: "NÃO ACESSÍVEL",
    LOW_ACCESS: "POUCO ACESSÍVEL",
    SOME_ACCESS: "RAZOAVELMENTE ACESSÍVEL",
    GOOD_ACCESS: "MUITO ACESSÍVEL",
  };

  Object.values(INFO_ACCESS).map((access, i) => {
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