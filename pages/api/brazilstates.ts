import type { NextApiRequest, NextApiResponse } from "next";
import { Response } from "../../shared/types/airtable";
import path from 'path';
import { promises as fs } from 'fs';

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<Response[] | string>
) {
  const geojsonDirectory = path.join(process.cwd(), 'geojson');
  const fileContents = await fs.readFile(geojsonDirectory + '/brazil_states.geojson', 'utf8');
  res.status(200).json(JSON.parse(fileContents));
}
