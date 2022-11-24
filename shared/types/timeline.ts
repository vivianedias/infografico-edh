import { type TimelineFields } from "./airtable";

export type MonthWithAggregatedDescription = {
  description: string[];
} & TimelineFields;
