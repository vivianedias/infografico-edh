export type Fields = {
  estado__nome: string;
  estado__regiao: string;
  estado__sigla: string;
  estado_basico__documento_orientador: string;
  estado_basico__orgao_colegiado: string;
  estado_basico__orgao_publico: string;
  periodo: string;
}

export type Records = {
  createdTime: string;
  id: string;
  fields: Fields;
}

export type Response = {
  createdAt: string;
  id: string;
} & Fields;
