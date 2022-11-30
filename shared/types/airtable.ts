export type StatesFields = {
  estado__nome: string;
  estado__regiao: string;
  estado__sigla: string;
  estado_basico__acesso_informacao: string;
  estado_basico__documento_orientador: string;
  estado_basico__grau_institucionalizacao: string;
  estado_basico__orgao_colegiado: string;
  estado_basico__orgao_publico: string;
  periodo: string;
  orgaos?: OrgaosFields[];
};

export type TimelineFields = {
  acontecimento__descricao: string;
  acontecimento__mes: string;
  acontecimento__ano: number;
};

export type OrgaosFields = {
  createdAt: string;
  id: string;
  orgao__estado: string;
  orgao__nome: string;
  orgao__orcamento: string;
  orgao__conceito_edh: string;
  orgao__temas_principais: Array<string>;
  orgao__atividades_principais: string;
  orgao__edh_plano_educacao: string;
  orgao__equipe_edh: number;
};

export type Records = {
  id: string;
  createdTime: string;
  fields: Record<string, any>;
};

export type StatesResponse = {
  createdAt: string;
  id: string;
} & StatesFields;

export type TimelineResponse = {
  id: string;
  createdAt: string;
} & TimelineFields;

export type OrgaosResponse = {
  id: string;
  createdAt: string;
} & OrgaosFields;

export type Response = {
  timeline: TimelineResponse[];
  tableData: StatesResponse[];
};
