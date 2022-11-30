import type { NextApiRequest, NextApiResponse } from "next";
import fetcher from "../../shared/utils/fetcher";
import {
  OrgaosResponse,
  Records,
  Response,
  StatesResponse,
  TimelineResponse,
} from "../../shared/types/airtable";
import { log } from "next-axiom";
import {
  AIRTABLE_PROD_VIEW_ID,
  AIRTABLE_STG_VIEW_ID,
  env,
} from "../../shared/utils/constants";

const parse = ({ records }: { records: Records[] }) => {
  return records.map((record: Records) => {
    return {
      id: record.id,
      createdAt: record.createdTime,
      ...record.fields,
    };
  });
};

function addOrgaosToStatesData(
  states: StatesResponse[],
  orgaos: OrgaosResponse[]
) {
  return states.map((s) => {
    const orgaosByState = orgaos.filter(
      (o) => o.estado__sigla === s.estado__sigla
    );
    return {
      ...s,
      orgaos: orgaosByState,
    };
  });
}

async function fetchTable(endpoint: string) {
  const token = process.env.AIRTABLE_API_KEY;
  const opts = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
    isExternal: true,
  };

  const data = await fetcher(endpoint, opts);

  return parse(data);
}

function getEndpoint(tableName: string, lng: string | string[]) {
  const tableId =
    env !== "production" ? AIRTABLE_STG_VIEW_ID : AIRTABLE_PROD_VIEW_ID;

  return `https://api.airtable.com/v0/${tableId}/${tableName}__${lng}?maxRecords=100&view=Grid%20view`;
}

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<Response | string>
) {
  try {
    const { query } = req;
    const lng = query.lng || "pt-BR";

    const stateEndpoint = getEndpoint("estados", lng);
    const timelineEndpoint = getEndpoint("timeline", lng);
    const orgaosEndpoint = getEndpoint("orgaos", lng);

    const states = (await fetchTable(stateEndpoint)) as StatesResponse[];
    const timeline = (await fetchTable(timelineEndpoint)) as TimelineResponse[];
    const orgaos = (await fetchTable(orgaosEndpoint)) as OrgaosResponse[];

    res.status(200).json({
      timeline,
      tableData: addOrgaosToStatesData(states, orgaos),
    });
  } catch (e) {
    log.error(`Request to airtable API failed`, e);

    res.status(400).send(`Request to airtable API failed ${e}`);
  }
}
