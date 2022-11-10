import type { NextApiRequest, NextApiResponse } from "next";
import fetcher from "../../shared/utils/fetcher";
import { Records, Response } from "../../shared/types/airtable";
import { log } from "next-axiom";

const parse = ({ records }: { records: Records[] }) => {
  return records.map((record: Records) => {
    return {
      id: record.id,
      createdAt: record.createdTime,
      ...record.fields,
    };
  });
};

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<Response[] | string>
) {
  try {
    const { query } = req
    const endpoint = `https://api.airtable.com/v0/app828vzD9bQ4PNrN/estados__${query.lng}?maxRecords=100&view=Grid%20view`;

    const token = process.env.AIRTABLE_API_KEY;
    const opts = {
      headers: {
        Authorization: `Bearer ${token}`,
      },
      isExternal: true,
    };

    const data = await fetcher(endpoint, opts);

    res.status(200).json(parse(data));
  } catch (e) {
    log.error(`Request to airtable API failed`, e);

    res.status(400).send(`Request to airtable API failed ${e}`);
  }
}
