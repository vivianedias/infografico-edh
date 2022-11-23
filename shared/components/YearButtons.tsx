import { HStack, Button } from "@chakra-ui/react";
import { css } from "@emotion/react";
import { type Dispatch, type SetStateAction } from "react";

type YearButtonsProp = {
  years: string[];
  selectedPeriod: string;
  selectPeriod: Dispatch<SetStateAction<string>>;
};

export default function YearButtons({
  years,
  selectedPeriod,
  selectPeriod,
}: YearButtonsProp) {
  return years.length > 0 ? (
    <HStack
      boxShadow={"lg"}
      css={
        years.length > 1 &&
        css`
          & > button:first-child {
            border-top-right-radius: 0;
            border-bottom-right-radius: 0;
          }
          & > button:last-child {
            border-top-left-radius: 0;
            border-bottom-left-radius: 0;
          }
        `
      }
    >
      {years.map((label, i) => (
        <Button
          key={`years-button-${i}`}
          onClick={() => selectPeriod(label)}
          variant={"custom"}
          colorScheme={label === selectedPeriod ? "selected" : "disabled"}
        >
          {label}
        </Button>
      ))}
    </HStack>
  ) : null;
}
