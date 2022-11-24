import { type TimelineResponse } from "../types/airtable";
import { type MonthWithAggregatedDescription } from "../types/timeline";

export default function aggregateMonthDescriptions(
  months: TimelineResponse[],
  month: string
) {
  return months.reduce(
    (previousMonth, currentMonth) => {
      const isSameMonth = currentMonth.acontecimento__mes === month;

      if (!isSameMonth) return previousMonth;

      return {
        ...currentMonth,
        description: [
          ...previousMonth.description,
          currentMonth.acontecimento__descricao,
        ],
      };
    },
    {
      description: [""],
      acontecimento__mes: "",
      acontecimento__ano: 0,
    } as MonthWithAggregatedDescription
  );
}
